import type {
  ChatCompletionRequest,
  ChatCompletionResponse,
  ModelSpec,
  ImageGenerateRequest,
  ImageUpscaleRequest,
  ImageEditRequest,
  AudioSpeechRequest,
  EmbeddingsRequest,
  Character,
  RateLimits,
  VeniceHeaders,
} from '@/types/venice';

const VENICE_BASE_URL = 'https://api.venice.ai/api/v1';

export class VeniceProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private extractHeaders(headers: Headers): VeniceHeaders {
    return {
      cfRay: headers.get('CF-RAY') || undefined,
      rateLimitRemainingRequests: this.parseNumber(headers.get('x-ratelimit-remaining-requests')),
      rateLimitRemainingTokens: this.parseNumber(headers.get('x-ratelimit-remaining-tokens')),
      rateLimitResetRequests: headers.get('x-ratelimit-reset-requests') || undefined,
      rateLimitResetTokens: headers.get('x-ratelimit-reset-tokens') || undefined,
      veniceBalanceUsd: this.parseNumber(headers.get('x-venice-balance-usd')),
      veniceBalanceDiem: this.parseNumber(headers.get('x-venice-balance-diem')),
      veniceModelDeprecationWarning: headers.get('x-venice-model-deprecation-warning') || undefined,
      veniceModelDeprecationDate: headers.get('x-venice-model-deprecation-date') || undefined,
    };
  }

  private parseNumber(value: string | null): number | undefined {
    if (!value) return undefined;
    const num = parseFloat(value);
    return isNaN(num) ? undefined : num;
  }

  async chat(request: ChatCompletionRequest): Promise<{ data: ChatCompletionResponse; headers: VeniceHeaders }> {
    const response = await fetch(`${VENICE_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: response.statusText } }));
      throw new Error(error.error?.message || 'Chat completion failed');
    }

    const data = await response.json();
    const headers = this.extractHeaders(response.headers);

    return { data, headers };
  }

  async *chatStream(request: ChatCompletionRequest): AsyncGenerator<{
    chunk: string;
    usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
    headers?: VeniceHeaders;
  }> {
    const response = await fetch(`${VENICE_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...request, stream: true }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: response.statusText } }));
      throw new Error(error.error?.message || 'Chat completion failed');
    }

    const headers = this.extractHeaders(response.headers);
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) throw new Error('No response body');

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        const lines = text.split('\n').filter(line => line.trim() !== '');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content || '';
              const usage = parsed.usage;

              yield { chunk: content, usage, headers };
            } catch (e) {
              console.error('Failed to parse SSE data:', e);
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  async getModels(): Promise<ModelSpec[]> {
    const response = await fetch(`${VENICE_BASE_URL}/models`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch models');
    }

    const data = await response.json();
    const models = data.data || [];
    
    // Normalize the model data structure by flattening model_spec into the top level
    return models.map((model: ModelSpec) => {
      const normalized: ModelSpec = {
        ...model,
        name: model.model_spec?.name || model.name || model.id,
        availableContextTokens: model.model_spec?.availableContextTokens || model.availableContextTokens,
        capabilities: model.model_spec?.capabilities || model.capabilities,
        constraints: model.model_spec?.constraints || model.constraints,
        traits: model.model_spec?.traits || model.traits,
      };
      return normalized;
    });
  }

  async getModelTraits(): Promise<Record<string, string[]>> {
    const response = await fetch(`${VENICE_BASE_URL}/models/traits`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch model traits');
    }

    return response.json();
  }

  async getCompatibilityMapping(): Promise<Record<string, string>> {
    const response = await fetch(`${VENICE_BASE_URL}/models/compatibility_mapping`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch compatibility mapping');
    }

    return response.json();
  }

  async generateImage(request: ImageGenerateRequest): Promise<{ data: { url?: string; b64_json?: string }; headers: VeniceHeaders }> {
    const response = await fetch(`${VENICE_BASE_URL}/image/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: response.statusText } }));
      throw new Error(error.error?.message || 'Image generation failed');
    }

    const data = await response.json();
    const headers = this.extractHeaders(response.headers);

    return { data, headers };
  }

  async upscaleImage(request: ImageUpscaleRequest): Promise<{ data: Blob; headers: VeniceHeaders }> {
    const response = await fetch(`${VENICE_BASE_URL}/image/upscale`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: response.statusText } }));
      throw new Error(error.error?.message || 'Image upscale failed');
    }

    const data = await response.blob();
    const headers = this.extractHeaders(response.headers);

    return { data, headers };
  }

  async editImage(request: ImageEditRequest): Promise<{ data: { url?: string; b64_json?: string }; headers: VeniceHeaders }> {
    const response = await fetch(`${VENICE_BASE_URL}/image/edit`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: response.statusText } }));
      throw new Error(error.error?.message || 'Image edit failed');
    }

    const data = await response.json();
    const headers = this.extractHeaders(response.headers);

    return { data, headers };
  }

  async getImageStyles(): Promise<string[]> {
    const response = await fetch(`${VENICE_BASE_URL}/image/styles`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch image styles');
    }

    const data = await response.json();
    return data.styles || [];
  }

  async generateSpeech(request: AudioSpeechRequest): Promise<{ data: Blob; headers: VeniceHeaders }> {
    const response = await fetch(`${VENICE_BASE_URL}/audio/speech`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: response.statusText } }));
      throw new Error(error.error?.message || 'Speech generation failed');
    }

    const data = await response.blob();
    const headers = this.extractHeaders(response.headers);

    return { data, headers };
  }

  async createEmbeddings(request: EmbeddingsRequest): Promise<{ data: { embeddings: number[][] }; headers: VeniceHeaders }> {
    const response = await fetch(`${VENICE_BASE_URL}/embeddings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: response.statusText } }));
      throw new Error(error.error?.message || 'Embeddings creation failed');
    }

    const data = await response.json();
    const headers = this.extractHeaders(response.headers);

    return { data, headers };
  }

  async getCharacters(): Promise<Character[]> {
    const response = await fetch(`${VENICE_BASE_URL}/characters`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch characters');
    }

    const data = await response.json();
    return data.characters || [];
  }

  async getCharacter(slug: string): Promise<Character> {
    const response = await fetch(`${VENICE_BASE_URL}/characters/${slug}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch character');
    }

    return response.json();
  }

  async getRateLimits(): Promise<RateLimits> {
    const response = await fetch(`${VENICE_BASE_URL}/api_keys/rate_limits`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch rate limits');
    }

    return response.json();
  }

  async getBillingUsage(): Promise<unknown> {
    const response = await fetch(`${VENICE_BASE_URL}/billing/usage`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch billing usage');
    }

    return response.json();
  }
}
