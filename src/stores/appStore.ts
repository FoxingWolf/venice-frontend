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
  setModels: (models: ModelSpec[]) => void;
  setSelectedModel: (model: string) => void;

  // Venice Parameters
  veniceParameters: VeniceParameters;
  setVeniceParameters: (params: Partial<VeniceParameters>) => void;

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

export const useAppStore = create<AppState>((set) => ({
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
  setModels: (models) => set({ models }),
  setSelectedModel: (model) => set({ selectedModel: model }),

  // Venice Parameters
  veniceParameters: {
    enable_web_search: 'auto',
    include_venice_system_prompt: true,
  },
  setVeniceParameters: (params) =>
    set((state) => ({
      veniceParameters: { ...state.veniceParameters, ...params },
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
