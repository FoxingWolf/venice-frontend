# Venice Models Support

This document describes the Venice models now supported in Venice Studio.

## Implementation Summary

The model filtering system has been updated to correctly parse and display all Venice API models by using the `type` field from the API response instead of relying solely on traits.

### Changes Made

1. **Updated `ModelSpec` interface** (`src/types/venice.ts`)
   - Added `type` field: `'text' | 'image' | 'audio' | 'embedding' | 'upscaler'`
   - Added nested `model_spec` object to match API response structure
   - Added additional capability fields (reasoning, optimized for code, etc.)

2. **Updated `VeniceProvider.getModels()`** (`src/providers/VeniceProvider.ts`)
   - Now normalizes API response by flattening `model_spec` data to top level
   - Ensures `name`, `availableContextTokens`, `capabilities`, `constraints`, and `traits` are accessible

3. **Updated model filtering** (`src/stores/appStore.ts`)
   - `getChatModels()`: Filters by `type === 'text'` (with fallback to traits)
   - `getImageModels()`: Filters by `type === 'image'` (with fallback to traits)
   - `getTTSModels()`: Filters by `type === 'audio'` (with fallback to traits)
   - `getEmbeddingModels()`: Filters by `type === 'embedding'` (with fallback to traits)

4. **Updated Chat component** (`src/components/Chat.tsx`)
   - Changed from `context_length` to `availableContextTokens` for displaying context window size

## Supported Models

Based on Venice API documentation, the following models are now properly displayed:

### Text/Chat Models

**Stable Models:**
- `llama-3.3-70b` - Llama 3.3 70B (65k context, default)
- `qwen3-235b` - Venice Large 1.1 (131k context, function calling, reasoning)
- `venice-uncensored` - Venice Uncensored 1.1 (32k context, most uncensored)
- `mistral-31-24b` - Venice Medium 3.1 (131k context, vision, function calling)
- `qwen3-4b` - Venice Small (40k context, fastest, function calling, reasoning)
- `llama-3.2-3b` - Llama 3.2 3B (131k context, fastest, function calling)

**Beta Models:**
- `qwen3-next-80b` - Qwen 3 Next 80B (262k context, function calling)
- `qwen3-coder-480b-a35b-instruct` - Qwen 3 Coder 480B (262k context, function calling)
- `hermes-3-llama-3.1-405b` - Hermes 3 Llama 3.1 405B (131k context)

### Image Models

- `venice-sd35` - Venice SD35 (Stable Diffusion 3.5, default)
- `hidream` - HiDream I1 Dev
- `qwen-image` - Qwen Image
- `flux-dev` - FLUX Standard (D) (highest quality)
- `flux-dev-uncensored` - FLUX Custom (D)
- `lustify-sdxl` - Lustify SDXL
- `wai-Illustrious` - Anime (WAI)

### Audio/TTS Models

- `tts-kokoro` - Kokoro Text to Speech (60+ voices)

### Embedding Models

- `text-embedding-bge-m3` - BGE-M3

### Image Processing Models

- `upscaler` - Image Upscaler (2x, 4x scaling)

## Testing

A manual verification test has been created in `src/__tests__/modelFiltering.test.ts` that demonstrates the filtering logic works correctly for all model types.

Run with:
```bash
npx tsx src/__tests__/modelFiltering.test.ts
```

Expected output:
```
Chat Models (4):
  - Llama 3.3 70B (llama-3.3-70b)
  - Venice Large 1.1 (qwen3-235b)
  - Venice Uncensored 1.1 (venice-uncensored)
  - Venice Medium (3.1) (mistral-31-24b)

Image Models (2):
  - Venice SD35 (venice-sd35)
  - FLUX Standard (D) (flux-dev)

TTS Models (1):
  - Kokoro Text to Speech (tts-kokoro)

Embedding Models (1):
  - BGE-M3 (text-embedding-bge-m3)

✓ All model filtering tests passed!
```

## User Experience

When users configure their Venice API key:

1. The app fetches all available models from `/api/v1/models`
2. Models are normalized and filtered by type
3. Each component (Chat, Image, TTS, Embeddings) shows only relevant models
4. Model dropdowns display:
   - Model name (friendly display name)
   - Context length for text models (e.g., "Llama 3.3 70B (65k)")
   - Model ID as fallback if name not available

## API Compatibility

The implementation follows the Venice API specification:
- Models endpoint: `GET /api/v1/models`
- Response structure includes nested `model_spec` object
- Models are identified by `type` field for filtering
- Traits provide additional categorization
