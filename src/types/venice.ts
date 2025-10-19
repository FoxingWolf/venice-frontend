// Venice API Types

export interface VeniceParameters {
  enable_web_search?: 'auto' | 'always' | 'never';
  enable_web_scraping?: boolean;
  enable_web_citations?: boolean;
  character_slug?: string;
  strip_thinking_response?: boolean;
  disable_thinking?: boolean;
  include_venice_system_prompt?: boolean;
  include_search_results_in_stream?: boolean;
}

export interface ModelSpec {
  id: string;
  type?: 'text' | 'image' | 'audio' | 'embedding' | 'upscaler';
  name?: string;
  description?: string;
  context_length?: number;
  availableContextTokens?: number;
  capabilities?: {
    supportsFunctionCalling?: boolean;
    supportsVision?: boolean;
    supportsWebSearch?: boolean;
    supportsResponseSchema?: boolean;
    supportsLogProbs?: boolean;
    supportsReasoning?: boolean;
    optimizedForCode?: boolean;
    quantization?: string;
  };
  constraints?: {
    maxWidth?: number;
    maxHeight?: number;
    maxScale?: number;
    temperature?: {
      default?: number;
    };
    top_p?: {
      default?: number;
    };
  };
  traits?: string[];
  compatibility?: string[];
  model_spec?: {
    name?: string;
    availableContextTokens?: number;
    capabilities?: {
      supportsFunctionCalling?: boolean;
      supportsVision?: boolean;
      supportsWebSearch?: boolean;
      supportsResponseSchema?: boolean;
      supportsLogProbs?: boolean;
      supportsReasoning?: boolean;
      optimizedForCode?: boolean;
      quantization?: string;
    };
    constraints?: {
      temperature?: { default?: number };
      top_p?: { default?: number };
    };
    traits?: string[];
    pricing?: {
      input?: { usd?: number; diem?: number };
      output?: { usd?: number; diem?: number };
    };
    modelSource?: string;
    offline?: boolean;
  };
  created?: number;
  owned_by?: string;
  object?: string;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'function';
  content: string;
  name?: string;
}

export interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  venice_parameters?: VeniceParameters;
  stream?: boolean;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  response_format?: {
    type: 'json_schema';
    json_schema: {
      name: string;
      strict: boolean;
      schema: Record<string, unknown>;
    };
  };
  stream_options?: {
    include_usage?: boolean;
  };
  tools?: Array<{
    type: 'function';
    function: {
      name: string;
      description?: string;
      parameters?: Record<string, unknown>;
    };
  }>;
}

export interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: ChatMessage;
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ImageGenerateRequest {
  model: string;
  prompt: string;
  negative_prompt?: string;
  width?: number;
  height?: number;
  steps?: number;
  cfg_scale?: number;
  seed?: number;
  style_preset?: string;
  return_binary?: boolean;
  n?: number;
}

export interface ImageUpscaleRequest {
  image: string;
  scale?: number;
  enhance?: boolean;
  enhancePrompt?: string;
  replication?: number;
}

export interface ImageEditRequest {
  image: string;
  prompt: string;
  mask?: string;
}

export interface AudioSpeechRequest {
  input: string;
  model: string;
  voice: string;
  response_format?: 'mp3' | 'opus' | 'aac' | 'flac' | 'wav' | 'pcm';
  speed?: number;
}

export interface EmbeddingsRequest {
  model: string;
  input: string | string[];
  encoding_format?: 'float' | 'base64';
}

export interface Character {
  slug: string;
  name: string;
  description?: string;
  avatar_url?: string;
}

export interface RateLimits {
  tier?: string;
  limits?: {
    requests_per_minute?: number;
    tokens_per_minute?: number;
  };
  balances?: {
    usd?: number;
    diem?: number;
  };
}

export interface VeniceHeaders {
  cfRay?: string;
  rateLimitRemainingRequests?: number;
  rateLimitRemainingTokens?: number;
  rateLimitResetRequests?: string;
  rateLimitResetTokens?: string;
  veniceBalanceUsd?: number;
  veniceBalanceDiem?: number;
  veniceModelDeprecationWarning?: string;
  veniceModelDeprecationDate?: string;
}

export interface RequestStats {
  requestId?: string;
  modelId?: string;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  contextLimit?: number;
  deprecationWarning?: string;
  deprecationDate?: string;
  headers?: VeniceHeaders;
  timestamp: number;
}
