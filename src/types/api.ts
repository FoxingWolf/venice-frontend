// API types
export interface VeniceParameters {
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  top_k?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  stop?: string[];
  stream?: boolean;
  response_format?: {
    type: "json_object" | "text";
    schema?: object;
  };
}

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatCompletionRequest {
  model: string;
  messages: Message[];
  venice_parameters?: VeniceParameters;
  stream?: boolean;
  response_format?: {
    type: "json_object" | "text";
    schema?: object;
  };
}

export interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: Message;
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ImageGenerationRequest {
  prompt: string;
  model?: string;
  n?: number;
  size?: string;
  quality?: string;
  style?: string;
  venice_parameters?: VeniceParameters;
}

export interface ImageGenerationResponse {
  created: number;
  data: Array<{
    url?: string;
    b64_json?: string;
    revised_prompt?: string;
  }>;
}

export interface ImageEditRequest {
  image: File;
  prompt: string;
  mask?: File;
  model?: string;
  n?: number;
  size?: string;
  venice_parameters?: VeniceParameters;
}

export interface ImageUpscaleRequest {
  image: File;
  model?: string;
  scale?: number;
  venice_parameters?: VeniceParameters;
}

export interface EmbeddingRequest {
  input: string | string[];
  model: string;
  encoding_format?: "float" | "base64";
  venice_parameters?: VeniceParameters;
}

export interface EmbeddingResponse {
  object: string;
  data: Array<{
    object: string;
    embedding: number[];
    index: number;
  }>;
  model: string;
  usage: {
    prompt_tokens: number;
    total_tokens: number;
  };
}

export interface TTSRequest {
  input: string;
  model: string;
  voice?: string;
  response_format?: string;
  speed?: number;
  venice_parameters?: VeniceParameters;
}

export interface Character {
  id: string;
  name: string;
  description: string;
  traits?: string[];
  avatar?: string;
  system_prompt?: string;
}

export interface Model {
  id: string;
  object: string;
  created: number;
  owned_by: string;
  capabilities?: string[];
  deprecated?: boolean;
  deprecation_message?: string;
}

export interface Stats {
  tokens: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  rate_limits: {
    requests_per_minute?: number;
    tokens_per_minute?: number;
    remaining_requests?: number;
    remaining_tokens?: number;
  };
  balances?: {
    credits?: number;
    subscription_tier?: string;
  };
}
