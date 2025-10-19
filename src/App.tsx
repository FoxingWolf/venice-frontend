import { useState, useEffect } from 'react';
import { useAppStore } from '@/stores/appStore';
import { Settings } from '@/components/Settings';
import { Chat } from '@/components/Chat';
import { ImageGenerate } from '@/components/ImageGenerate';
import { TTS } from '@/components/TTS';
import { Embeddings } from '@/components/Embeddings';
import { Characters } from '@/components/Characters';
import { StatsPanel } from '@/components/StatsPanel';
import { VeniceParametersPanel } from '@/components/VeniceParametersPanel';

function App() {
  const {
    activeMode,
    setActiveMode,
    showAdvanced,
    setShowAdvanced,
    provider,
    initializeProvider,
    setModels,
    deprecationWarnings,
    dismissDeprecationWarning,
  } = useAppStore();

  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Load API key from localStorage on mount
    const savedKey = localStorage.getItem('venice_api_key');
    if (savedKey && !provider) {
      initializeProvider(savedKey);
    }

    // Show settings if no API key is configured
    if (!savedKey) {
      setShowSettings(true);
    }
  }, [provider, initializeProvider]);

  useEffect(() => {
    // Fetch models when provider is available
    if (provider) {
      provider.getModels().then((models) => {
        setModels(models);
      }).catch((error) => {
        console.error('Failed to fetch models:', error);
      });
    }
  }, [provider, setModels]);

  const modes = [
    { id: 'chat' as const, label: 'Chat', icon: '💬' },
    { id: 'image' as const, label: 'Image', icon: '🖼️' },
    { id: 'upscale' as const, label: 'Upscale', icon: '⬆️' },
    { id: 'edit' as const, label: 'Edit', icon: '✏️' },
    { id: 'tts' as const, label: 'TTS', icon: '🔊' },
    { id: 'embeddings' as const, label: 'Embeddings', icon: '🔢' },
    { id: 'characters' as const, label: 'Characters', icon: '🎭' },
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">Venice Studio</h1>
          <p className="text-xs text-gray-400 mt-1">Private AI Workspace</p>
        </div>

        <nav className="flex-1 p-2">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md mb-1 transition-colors ${
                activeMode === mode.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="text-xl">{mode.icon}</span>
              <span>{mode.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-gray-700 space-y-2">
          <VeniceParametersPanel />
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded-md transition-colors text-sm"
          >
            {showAdvanced ? '✓' : ' '} Advanced Options
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="w-full px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded-md transition-colors text-sm"
          >
            ⚙️ Settings
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Deprecation Warnings */}
        {deprecationWarnings.map((warning) => (
          <div
            key={warning.model}
            className="bg-yellow-900/30 border-b border-yellow-600 px-4 py-3 flex items-center justify-between"
          >
            <div className="flex-1">
              <div className="text-yellow-400 font-semibold">⚠️ Model Deprecation Warning</div>
              <div className="text-yellow-300 text-sm">{warning.warning}</div>
              {warning.date && (
                <div className="text-yellow-400 text-xs mt-1">Deprecation Date: {warning.date}</div>
              )}
            </div>
            <button
              onClick={() => dismissDeprecationWarning(warning.model)}
              className="ml-4 px-3 py-1 bg-yellow-700 hover:bg-yellow-600 rounded text-sm"
            >
              Dismiss
            </button>
          </div>
        ))}

        <div className="flex-1 flex overflow-hidden">
          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            {activeMode === 'chat' && <Chat />}
            {activeMode === 'image' && <ImageGenerate />}
            {activeMode === 'upscale' && (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">Image Upscale - Coming Soon</p>
              </div>
            )}
            {activeMode === 'edit' && (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">Image Edit - Coming Soon</p>
              </div>
            )}
            {activeMode === 'tts' && <TTS />}
            {activeMode === 'embeddings' && <Embeddings />}
            {activeMode === 'characters' && <Characters />}
          </div>

          {/* Stats Panel */}
          <div className="w-80 border-l border-gray-700 p-4 overflow-y-auto">
            <StatsPanel />
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  );
}

export default App;
