// Manual verification test for model filtering logic
// This demonstrates that the updated filtering logic correctly handles
// the Venice API response format

import type { ModelSpec } from '../types/venice';

// Sample models based on Venice API documentation
const sampleModels: ModelSpec[] = [
  {
    id: 'llama-3.3-70b',
    type: 'text',
    model_spec: {
      name: 'Llama 3.3 70B',
      availableContextTokens: 65536,
      traits: ['default', 'function_calling_default'],
      capabilities: {
        supportsFunctionCalling: true,
      },
    },
  },
  {
    id: 'qwen3-235b',
    type: 'text',
    model_spec: {
      name: 'Venice Large 1.1',
      availableContextTokens: 131072,
      traits: [],
      capabilities: {
        supportsFunctionCalling: true,
        supportsReasoning: true,
      },
    },
  },
  {
    id: 'venice-uncensored',
    type: 'text',
    model_spec: {
      name: 'Venice Uncensored 1.1',
      availableContextTokens: 32768,
      traits: ['most_uncensored'],
    },
  },
  {
    id: 'mistral-31-24b',
    type: 'text',
    model_spec: {
      name: 'Venice Medium (3.1)',
      availableContextTokens: 131072,
      traits: ['default_vision'],
      capabilities: {
        supportsFunctionCalling: true,
        supportsVision: true,
      },
    },
  },
  {
    id: 'venice-sd35',
    type: 'image',
    model_spec: {
      name: 'Venice SD35',
      traits: ['default', 'eliza-default'],
    },
  },
  {
    id: 'flux-dev',
    type: 'image',
    model_spec: {
      name: 'FLUX Standard (D)',
      traits: ['highest_quality'],
    },
  },
  {
    id: 'tts-kokoro',
    type: 'audio',
    model_spec: {
      name: 'Kokoro Text to Speech',
    },
  },
  {
    id: 'text-embedding-bge-m3',
    type: 'embedding',
    model_spec: {
      name: 'BGE-M3',
    },
  },
];

// Simulate the filtering logic from appStore.ts
function getChatModels(models: ModelSpec[]): ModelSpec[] {
  return models.filter(
    (m: ModelSpec) => m.type === 'text' || m.traits?.includes('chat') || m.traits?.includes('text')
  );
}

function getImageModels(models: ModelSpec[]): ModelSpec[] {
  return models.filter((m: ModelSpec) => m.type === 'image' || m.traits?.includes('image'));
}

function getTTSModels(models: ModelSpec[]): ModelSpec[] {
  return models.filter((m: ModelSpec) => m.type === 'audio' || m.traits?.includes('audio') || m.traits?.includes('tts'));
}

function getEmbeddingModels(models: ModelSpec[]): ModelSpec[] {
  return models.filter((m: ModelSpec) => m.type === 'embedding' || m.traits?.includes('embedding'));
}

// Verify filtering works correctly
console.log('=== Model Filtering Verification ===\n');

const chatModels = getChatModels(sampleModels);
console.log(`Chat Models (${chatModels.length}):`);
chatModels.forEach(m => console.log(`  - ${m.model_spec?.name || m.id} (${m.id})`));

const imageModels = getImageModels(sampleModels);
console.log(`\nImage Models (${imageModels.length}):`);
imageModels.forEach(m => console.log(`  - ${m.model_spec?.name || m.id} (${m.id})`));

const ttsModels = getTTSModels(sampleModels);
console.log(`\nTTS Models (${ttsModels.length}):`);
ttsModels.forEach(m => console.log(`  - ${m.model_spec?.name || m.id} (${m.id})`));

const embeddingModels = getEmbeddingModels(sampleModels);
console.log(`\nEmbedding Models (${embeddingModels.length}):`);
embeddingModels.forEach(m => console.log(`  - ${m.model_spec?.name || m.id} (${m.id})`));

// Assertions
const expectedChatCount = 4; // llama-3.3-70b, qwen3-235b, venice-uncensored, mistral-31-24b
const expectedImageCount = 2; // venice-sd35, flux-dev
const expectedTTSCount = 1; // tts-kokoro
const expectedEmbeddingCount = 1; // text-embedding-bge-m3

console.log('\n=== Verification Results ===');
console.log(`Chat models: ${chatModels.length === expectedChatCount ? '✓' : '✗'} (expected ${expectedChatCount}, got ${chatModels.length})`);
console.log(`Image models: ${imageModels.length === expectedImageCount ? '✓' : '✗'} (expected ${expectedImageCount}, got ${imageModels.length})`);
console.log(`TTS models: ${ttsModels.length === expectedTTSCount ? '✓' : '✗'} (expected ${expectedTTSCount}, got ${ttsModels.length})`);
console.log(`Embedding models: ${embeddingModels.length === expectedEmbeddingCount ? '✓' : '✗'} (expected ${expectedEmbeddingCount}, got ${embeddingModels.length})`);

if (chatModels.length === expectedChatCount &&
    imageModels.length === expectedImageCount &&
    ttsModels.length === expectedTTSCount &&
    embeddingModels.length === expectedEmbeddingCount) {
  console.log('\n✓ All model filtering tests passed!');
} else {
  console.log('\n✗ Some model filtering tests failed!');
  process.exit(1);
}
