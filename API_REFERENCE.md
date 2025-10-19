# API Reference - Venice Studio

Quick reference for using Venice Studio's internal APIs and Venice AI endpoints.

## VeniceProvider API

The `VeniceProvider` class handles all Venice API communication.

### Constructor

```typescript
const provider = new VeniceProvider(apiKey: string);
```

### Methods

#### Chat

```typescript
// Non-streaming chat
async chat(request: ChatCompletionRequest): Promise<{
  data: ChatCompletionResponse;
  headers: VeniceHeaders;
}>

// Streaming chat
async *chatStream(request: ChatCompletionRequest): AsyncGenerator<{
  chunk: string;
  usage?: TokenUsage;
  headers?: VeniceHeaders;
}>
```

Example:
```typescript
const { data, headers } = await provider.chat({
  model: 'llama-3.3-70b',
  messages: [
    { role: 'system', content: 'You are helpful.' },
    { role: 'user', content: 'Hello!' }
  ],
  venice_parameters: {
    enable_web_search: 'auto'
  }
});
```

#### Models

```typescript
// Get all models
async getModels(): Promise<ModelSpec[]>

// Get model traits
async getModelTraits(): Promise<Record<string, string[]>>

// Get OpenAI compatibility mapping
async getCompatibilityMapping(): Promise<Record<string, string>>
```

#### Images

```typescript
// Generate image
async generateImage(request: ImageGenerateRequest): Promise<{
  data: { url?: string; b64_json?: string };
  headers: VeniceHeaders;
}>

// Upscale image
async upscaleImage(request: ImageUpscaleRequest): Promise<{
  data: Blob;
  headers: VeniceHeaders;
}>

// Edit image
async editImage(request: ImageEditRequest): Promise<{
  data: { url?: string; b64_json?: string };
  headers: VeniceHeaders;
}>

// Get available styles
async getImageStyles(): Promise<string[]>
```

Example:
```typescript
const { data } = await provider.generateImage({
  model: 'qwen-image',
  prompt: 'cyberpunk city at night',
  negative_prompt: 'blurry, low quality',
  width: 1024,
  height: 1024,
  steps: 30,
  cfg_scale: 7.5
});
```

#### Audio

```typescript
async generateSpeech(request: AudioSpeechRequest): Promise<{
  data: Blob;
  headers: VeniceHeaders;
}>
```

Example:
```typescript
const { data } = await provider.generateSpeech({
  input: 'Hello world',
  model: 'tts-kokoro',
  voice: 'af_sky',
  response_format: 'mp3',
  speed: 1.0
});
```

#### Embeddings

```typescript
async createEmbeddings(request: EmbeddingsRequest): Promise<{
  data: { embeddings: number[][] };
  headers: VeniceHeaders;
}>
```

Example:
```typescript
const { data } = await provider.createEmbeddings({
  model: 'text-embedding-bge-m3',
  input: 'This is a test',
  encoding_format: 'float'
});
```

#### Characters

```typescript
// Get all characters
async getCharacters(): Promise<Character[]>

// Get specific character
async getCharacter(slug: string): Promise<Character>
```

#### Usage & Limits

```typescript
// Get rate limits and balances
async getRateLimits(): Promise<RateLimits>

// Get billing usage
async getBillingUsage(): Promise<unknown>
```

## App Store API

Zustand store for global state management.

### State

```typescript
interface AppState {
  apiKey: string;
  provider: VeniceProvider | null;
  models: ModelSpec[];
  selectedModel: string;
  veniceParameters: VeniceParameters;
  stats: RequestStats[];
  characters: Character[];
  selectedCharacter: string | null;
  activeMode: Mode;
  showAdvanced: boolean;
  deprecationWarnings: Warning[];
}
```

### Actions

```typescript
// API Key
setApiKey(key: string): void
initializeProvider(key: string): void

// Models
setModels(models: ModelSpec[]): void
setSelectedModel(model: string): void

// Venice Parameters
setVeniceParameters(params: Partial<VeniceParameters>): void

// Stats
addStats(stats: RequestStats): void
clearStats(): void

// Characters
setCharacters(characters: Character[]): void
setSelectedCharacter(slug: string | null): void

// UI
setActiveMode(mode: Mode): void
setShowAdvanced(show: boolean): void

// Warnings
addDeprecationWarning(warning: Warning): void
dismissDeprecationWarning(model: string): void
```

### Usage

```typescript
import { useAppStore } from '@/stores/appStore';

function MyComponent() {
  const provider = useAppStore(state => state.provider);
  const { setApiKey } = useAppStore();
  
  // Use provider, setApiKey, etc.
}
```

## Type Definitions

### VeniceParameters

```typescript
interface VeniceParameters {
  enable_web_search?: 'auto' | 'always' | 'never';
  enable_web_scraping?: boolean;
  enable_web_citations?: boolean;
  character_slug?: string;
  strip_thinking_response?: boolean;
  disable_thinking?: boolean;
  include_venice_system_prompt?: boolean;
  include_search_results_in_stream?: boolean;
}
```

### ChatCompletionRequest

```typescript
interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  venice_parameters?: VeniceParameters;
  stream?: boolean;
  temperature?: number;
  max_tokens?: number;
  response_format?: ResponseFormat;
  stream_options?: { include_usage?: boolean };
  tools?: Tool[];
}
```

### ImageGenerateRequest

```typescript
interface ImageGenerateRequest {
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
}
```

### VeniceHeaders

```typescript
interface VeniceHeaders {
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
```

## Venice API Endpoints

Base URL: `https://api.venice.ai/api/v1`

### Authentication

All requests require Bearer token authentication:

```typescript
headers: {
  'Authorization': `Bearer ${apiKey}`,
  'Content-Type': 'application/json'
}
```

### Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/chat/completions` | POST | Chat with AI |
| `/models` | GET | List models |
| `/models/traits` | GET | Model traits |
| `/models/compatibility_mapping` | GET | OpenAI mapping |
| `/image/generate` | POST | Generate image |
| `/image/upscale` | POST | Upscale image |
| `/image/edit` | POST | Edit image |
| `/image/styles` | GET | Image styles |
| `/audio/speech` | POST | Text-to-speech |
| `/embeddings` | POST | Generate embeddings |
| `/characters` | GET | List characters |
| `/characters/{slug}` | GET | Get character |
| `/api_keys/rate_limits` | GET | Rate limits |
| `/billing/usage` | GET | Usage stats |

## Error Handling

All methods throw errors on failure:

```typescript
try {
  const result = await provider.chat(request);
} catch (error) {
  console.error('Chat failed:', error.message);
  // Handle error
}
```

Common error codes:
- `401` - Unauthorized (invalid API key)
- `429` - Rate limit exceeded
- `500` - Internal server error

## Rate Limits

Check headers for rate limit information:

```typescript
const { headers } = await provider.chat(request);

console.log('Remaining requests:', headers.rateLimitRemainingRequests);
console.log('Remaining tokens:', headers.rateLimitRemainingTokens);
console.log('Reset time:', headers.rateLimitResetRequests);
```

## Best Practices

1. **Always check provider exists** before making calls
2. **Handle errors gracefully** with try-catch
3. **Monitor rate limits** in Stats panel
4. **Use streaming** for long responses
5. **Cache models** to avoid repeated fetches
6. **Track deprecations** and migrate promptly

## Examples

### Complete Chat Flow

```typescript
import { useAppStore } from '@/stores/appStore';

function ChatComponent() {
  const { provider, selectedModel, veniceParameters, addStats } = useAppStore();

  const sendMessage = async (message: string) => {
    if (!provider) return;

    try {
      for await (const { chunk, usage, headers } of provider.chatStream({
        model: selectedModel,
        messages: [{ role: 'user', content: message }],
        venice_parameters: veniceParameters,
        stream: true
      })) {
        // Display chunk
        console.log(chunk);
        
        // Add stats on completion
        if (usage) {
          addStats({
            requestId: headers?.cfRay,
            modelId: selectedModel,
            totalTokens: usage.total_tokens,
            headers,
            timestamp: Date.now()
          });
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
    }
  };
}
```

### Generate and Download Image

```typescript
const generateImage = async () => {
  if (!provider) return;

  try {
    const { data } = await provider.generateImage({
      model: 'qwen-image',
      prompt: 'beautiful landscape',
      width: 1024,
      height: 1024
    });

    // Download image
    const url = data.url || `data:image/png;base64,${data.b64_json}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated.png';
    a.click();
  } catch (error) {
    console.error('Image generation error:', error);
  }
};
```

## Resources

- [Venice AI Documentation](https://api.venice.ai/doc/api/)
- [OpenAI API Compatibility](https://platform.openai.com/docs)
- [Zustand Documentation](https://docs.pmnd.rs/zustand)

---

For implementation details, see `ARCHITECTURE.md`.
For usage examples, see `USER_GUIDE.md`.
