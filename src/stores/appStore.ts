import { create } from 'zustand';
import type { ModelSpec, RequestStats, VeniceParameters, Character } from '@/types/venice';
import { VeniceProvider } from '@/providers/VeniceProvider';

interface AppState {
  // API Key
  apiKey: string;
  setApiKey: (key: string) => void;

  // Provider
  provider: VeniceProvider | null;
  initializeProvider: (key: string) => void;

  // Models
  models: ModelSpec[];
  selectedModel: string;
  selectedImageModel: string;
  selectedTTSModel: string;
  selectedEmbeddingModel: string;
  setModels: (models: ModelSpec[]) => void;
  setSelectedModel: (model: string) => void;
  setSelectedImageModel: (model: string) => void;
  setSelectedTTSModel: (model: string) => void;
  setSelectedEmbeddingModel: (model: string) => void;
  getChatModels: () => ModelSpec[];
  getImageModels: () => ModelSpec[];
  getTTSModels: () => ModelSpec[];
  getEmbeddingModels: () => ModelSpec[];

  // Venice Parameters
  veniceParameters: VeniceParameters;
  setVeniceParameters: (params: Partial<VeniceParameters>) => void;

  // Chat Parameters
  chatParameters: {
    temperature: number;
    max_tokens?: number;
    top_p: number;
    frequency_penalty: number;
    presence_penalty: number;
  };
  setChatParameters: (params: Partial<AppState['chatParameters']>) => void;

  // Stats
  stats: RequestStats[];
  addStats: (stats: RequestStats) => void;
  clearStats: () => void;

  // Characters
  characters: Character[];
  selectedCharacter: string | null;
  setCharacters: (characters: Character[]) => void;
  setSelectedCharacter: (slug: string | null) => void;

  // UI State
  activeMode: 'chat' | 'image' | 'upscale' | 'edit' | 'tts' | 'embeddings' | 'characters';
  setActiveMode: (mode: AppState['activeMode']) => void;

  // Settings
  showAdvanced: boolean;
  setShowAdvanced: (show: boolean) => void;

  // Deprecation warnings
  deprecationWarnings: Array<{ model: string; warning: string; date?: string }>;
  addDeprecationWarning: (warning: { model: string; warning: string; date?: string }) => void;
  dismissDeprecationWarning: (model: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // API Key
  apiKey: '',
  setApiKey: (key) => set({ apiKey: key }),

  // Provider
  provider: null,
  initializeProvider: (key) => {
    const provider = new VeniceProvider(key);
    set({ provider, apiKey: key });
  },

  // Models
  models: [],
  selectedModel: 'llama-3.3-70b',
  selectedImageModel: 'flux-1.1-pro',
  selectedTTSModel: 'tts-kokoro',
  selectedEmbeddingModel: 'text-embedding-bge-m3',
  setModels: (models) => set({ models }),
  setSelectedModel: (model) => set({ selectedModel: model }),
  setSelectedImageModel: (model) => set({ selectedImageModel: model }),
  setSelectedTTSModel: (model) => set({ selectedTTSModel: model }),
  setSelectedEmbeddingModel: (model) => set({ selectedEmbeddingModel: model }),
  getChatModels: () => {
    const state = get();
    return state.models.filter(
      (m: ModelSpec) => m.traits?.includes('chat') || m.traits?.includes('text')
    );
  },
  getImageModels: () => {
    const state = get();
    return state.models.filter((m: ModelSpec) => m.traits?.includes('image'));
  },
  getTTSModels: () => {
    const state = get();
    return state.models.filter((m: ModelSpec) => m.traits?.includes('audio') || m.traits?.includes('tts'));
  },
  getEmbeddingModels: () => {
    const state = get();
    return state.models.filter((m: ModelSpec) => m.traits?.includes('embedding'));
  },

  // Venice Parameters
  veniceParameters: {
    enable_web_search: 'auto',
    include_venice_system_prompt: true,
  },
  setVeniceParameters: (params) =>
    set((state) => ({
      veniceParameters: { ...state.veniceParameters, ...params },
    })),

  // Chat Parameters
  chatParameters: {
    temperature: 0.7,
    max_tokens: undefined,
    top_p: 0.9,
    frequency_penalty: 0,
    presence_penalty: 0,
  },
  setChatParameters: (params) =>
    set((state) => ({
      chatParameters: { ...state.chatParameters, ...params },
    })),

  // Stats
  stats: [],
  addStats: (stats) =>
    set((state) => ({
      stats: [...state.stats, stats].slice(-50), // Keep last 50 stats
    })),
  clearStats: () => set({ stats: [] }),

  // Characters
  characters: [],
  selectedCharacter: null,
  setCharacters: (characters) => set({ characters }),
  setSelectedCharacter: (slug) => set({ selectedCharacter: slug }),

  // UI State
  activeMode: 'chat',
  setActiveMode: (mode) => set({ activeMode: mode }),

  // Settings
  showAdvanced: false,
  setShowAdvanced: (show) => set({ showAdvanced: show }),

  // Deprecation warnings
  deprecationWarnings: [],
  addDeprecationWarning: (warning) =>
    set((state) => {
      const exists = state.deprecationWarnings.some((w) => w.model === warning.model);
      if (exists) return state;
      return {
        deprecationWarnings: [...state.deprecationWarnings, warning],
      };
    }),
  dismissDeprecationWarning: (model) =>
    set((state) => ({
      deprecationWarnings: state.deprecationWarnings.filter((w) => w.model !== model),
    })),
}));
