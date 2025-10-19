import {
  ChatCompletionRequest,
  ChatCompletionResponse,
  ImageGenerationRequest,
  ImageGenerationResponse,
  ImageEditRequest,
  ImageUpscaleRequest,
  EmbeddingRequest,
  EmbeddingResponse,
  TTSRequest,
  Character,
  Model,
  Stats,
} from "../types/api";

const BASE_URL = "https://api.venice.ai/api/v1";

class VeniceAPIClient {
  private apiKey: string;
  private stats: Stats;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.stats = {
      tokens: {
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0,
      },
      rate_limits: {},
      balances: {},
    };
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
        ...options.headers,
      },
    });

    // Handle deprecation headers
    const deprecationHeader = response.headers.get("x-venice-deprecation");
    if (deprecationHeader) {
      console.warn(`Deprecation warning: ${deprecationHeader}`);
    }

    // Update rate limit stats
    const remaining = response.headers.get("x-ratelimit-remaining-requests");
    const tokensRemaining = response.headers.get("x-ratelimit-remaining-tokens");
    if (remaining) {
      this.stats.rate_limits.remaining_requests = parseInt(remaining, 10);
    }
    if (tokensRemaining) {
      this.stats.rate_limits.remaining_tokens = parseInt(tokensRemaining, 10);
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  private async makeStreamRequest(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ReadableStream> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.body!;
  }

  // Chat
  async createChatCompletion(
    request: ChatCompletionRequest
  ): Promise<ChatCompletionResponse> {
    const response = await this.makeRequest<ChatCompletionResponse>(
      "/chat/completions",
      {
        method: "POST",
        body: JSON.stringify(request),
      }
    );

    // Update token stats
    if (response.usage) {
      this.stats.tokens.prompt_tokens += response.usage.prompt_tokens;
      this.stats.tokens.completion_tokens += response.usage.completion_tokens;
      this.stats.tokens.total_tokens += response.usage.total_tokens;
    }

    return response;
  }

  async *createChatCompletionStream(
    request: ChatCompletionRequest
  ): AsyncGenerator<string, void, unknown> {
    const stream = await this.makeStreamRequest("/chat/completions", {
      method: "POST",
      body: JSON.stringify({ ...request, stream: true }),
    });

    const reader = stream.getReader();
    const decoder = new TextDecoder();

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.substring(6);
            if (data === "[DONE]") {
              return;
            }
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content;
              if (content) {
                yield content;
              }
            } catch (e) {
              console.error("Error parsing SSE data:", e);
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  // Images
  async generateImage(
    request: ImageGenerationRequest
  ): Promise<ImageGenerationResponse> {
    return this.makeRequest<ImageGenerationResponse>("/images/generations", {
      method: "POST",
      body: JSON.stringify(request),
    });
  }

  async editImage(request: ImageEditRequest): Promise<ImageGenerationResponse> {
    const formData = new FormData();
    formData.append("image", request.image);
    formData.append("prompt", request.prompt);
    if (request.mask) formData.append("mask", request.mask);
    if (request.model) formData.append("model", request.model);
    if (request.n) formData.append("n", request.n.toString());
    if (request.size) formData.append("size", request.size);
    if (request.venice_parameters) {
      formData.append(
        "venice_parameters",
        JSON.stringify(request.venice_parameters)
      );
    }

    return this.makeRequest<ImageGenerationResponse>("/images/edits", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  async upscaleImage(request: ImageUpscaleRequest): Promise<ImageGenerationResponse> {
    const formData = new FormData();
    formData.append("image", request.image);
    if (request.model) formData.append("model", request.model);
    if (request.scale) formData.append("scale", request.scale.toString());
    if (request.venice_parameters) {
      formData.append(
        "venice_parameters",
        JSON.stringify(request.venice_parameters)
      );
    }

    return this.makeRequest<ImageGenerationResponse>("/images/upscale", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  // Embeddings
  async createEmbedding(request: EmbeddingRequest): Promise<EmbeddingResponse> {
    const response = await this.makeRequest<EmbeddingResponse>("/embeddings", {
      method: "POST",
      body: JSON.stringify(request),
    });

    // Update token stats
    if (response.usage) {
      this.stats.tokens.prompt_tokens += response.usage.prompt_tokens;
      this.stats.tokens.total_tokens += response.usage.total_tokens;
    }

    return response;
  }

  // TTS
  async createSpeech(request: TTSRequest): Promise<Blob> {
    const response = await fetch(`${BASE_URL}/audio/speech`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.blob();
  }

  // Characters
  async listCharacters(): Promise<Character[]> {
    return this.makeRequest<Character[]>("/characters", {
      method: "GET",
    });
  }

  async getCharacter(id: string): Promise<Character> {
    return this.makeRequest<Character>(`/characters/${id}`, {
      method: "GET",
    });
  }

  async createCharacter(character: Omit<Character, "id">): Promise<Character> {
    return this.makeRequest<Character>("/characters", {
      method: "POST",
      body: JSON.stringify(character),
    });
  }

  async updateCharacter(id: string, character: Partial<Character>): Promise<Character> {
    return this.makeRequest<Character>(`/characters/${id}`, {
      method: "PATCH",
      body: JSON.stringify(character),
    });
  }

  async deleteCharacter(id: string): Promise<void> {
    return this.makeRequest<void>(`/characters/${id}`, {
      method: "DELETE",
    });
  }

  // Models
  async listModels(): Promise<Model[]> {
    const response = await this.makeRequest<{ data: Model[] }>("/models", {
      method: "GET",
    });
    return response.data;
  }

  async getModel(id: string): Promise<Model> {
    return this.makeRequest<Model>(`/models/${id}`, {
      method: "GET",
    });
  }

  // Stats
  getStats(): Stats {
    return { ...this.stats };
  }

  resetStats(): void {
    this.stats = {
      tokens: {
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0,
      },
      rate_limits: {},
      balances: {},
    };
  }
}

export default VeniceAPIClient;
