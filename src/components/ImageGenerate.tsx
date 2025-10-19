import React, { useState } from 'react';
import { useAppStore } from '@/stores/appStore';

interface GeneratedImage {
  url: string;
  seed?: number;
  prompt: string;
  timestamp: number;
}

export const ImageGenerate: React.FC = () => {
  const {
    provider,
    showAdvanced,
    addStats,
    getImageModels,
    selectedImageModel,
    setSelectedImageModel,
  } = useAppStore();
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(1024);
  const [steps, setSteps] = useState(30);
  const [cfgScale, setCfgScale] = useState(7.5);
  const [seed, setSeed] = useState<number | undefined>(undefined);
  const [numImages, setNumImages] = useState(1);
  const [stylePreset, setStylePreset] = useState<string>('');
  const [styles, setStyles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>('');

  // Load image styles on mount
  React.useEffect(() => {
    if (provider) {
      provider.getImageStyles().then(setStyles).catch((err) => {
        console.error('Failed to load image styles:', err);
      });
    }
  }, [provider]);

  // Keyboard navigation for image preview modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowLeft' && selectedImageIndex > 0) {
        setSelectedImageIndex(selectedImageIndex - 1);
      } else if (e.key === 'ArrowRight' && selectedImageIndex < generatedImages.length - 1) {
        setSelectedImageIndex(selectedImageIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, generatedImages.length]);

  const handleGenerate = async () => {
    if (!prompt.trim() || !provider || isLoading) return;

    // Validate parameters
    if (width < 256 || width > 2048 || height < 256 || height > 2048) {
      setError('Width and height must be between 256 and 2048');
      return;
    }
    if (steps < 1 || steps > 100) {
      setError('Steps must be between 1 and 100');
      return;
    }
    if (cfgScale < 1 || cfgScale > 20) {
      setError('CFG Scale must be between 1 and 20');
      return;
    }

    setIsLoading(true);
    setError(null);
    setProgress(numImages > 1 ? `Generating ${numImages} images...` : 'Generating image...');

    try {
      const { data, headers } = await provider.generateImage({
        model: selectedImageModel,
        prompt,
        negative_prompt: negativePrompt || undefined,
        width,
        height,
        steps,
        cfg_scale: cfgScale,
        seed: seed || undefined,
        style_preset: stylePreset || undefined,
        return_binary: false,
        n: numImages,
      });

      const newImages: GeneratedImage[] = [];
      
      // Handle multiple images response
      if (data.images && Array.isArray(data.images)) {
        data.images.forEach((img) => {
          const imageUrl = img.url || (img.b64_json ? `data:image/png;base64,${img.b64_json}` : null);
          if (imageUrl) {
            newImages.push({
              url: imageUrl,
              seed: img.seed,
              prompt,
              timestamp: Date.now(),
            });
          }
        });
      } else {
        // Handle single image response
        const imageUrl = data.url || (data.b64_json ? `data:image/png;base64,${data.b64_json}` : null);
        if (imageUrl) {
          newImages.push({
            url: imageUrl,
            seed: seed,
            prompt,
            timestamp: Date.now(),
          });
        }
      }

      if (newImages.length === 0) {
        throw new Error('No images were generated');
      }

      setGeneratedImages((prev) => [...newImages, ...prev]);
      setProgress('');

      addStats({
        requestId: headers?.cfRay,
        modelId: selectedImageModel,
        deprecationWarning: headers?.veniceModelDeprecationWarning,
        deprecationDate: headers?.veniceModelDeprecationDate,
        headers,
        timestamp: Date.now(),
      });
    } catch (err) {
      console.error('Image generation error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate image';
      setError(errorMessage.includes('fetch') 
        ? 'Network error: Unable to connect to Venice AI. Please check your internet connection and API key.'
        : errorMessage
      );
      setProgress('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey && !isLoading && prompt.trim() && provider) {
      handleGenerate();
    }
  };

  const generateRandomSeed = () => {
    setSeed(Math.floor(Math.random() * 1000000000));
  };

  const setAspectRatio = (ratio: 'square' | 'portrait' | 'landscape' | 'widescreen') => {
    switch (ratio) {
      case 'square':
        setWidth(1024);
        setHeight(1024);
        break;
      case 'portrait':
        setWidth(768);
        setHeight(1344);
        break;
      case 'landscape':
        setWidth(1344);
        setHeight(768);
        break;
      case 'widescreen':
        setWidth(1536);
        setHeight(640);
        break;
    }
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
  };

  const downloadImage = (imageUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const seedPart = generatedImages[index]?.seed ? `-seed${generatedImages[index].seed}` : '';
    link.download = `venice-${selectedImageModel}-${timestamp}${seedPart}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearAllImages = () => {
    if (window.confirm(`Clear all ${generatedImages.length} generated images?`)) {
      setGeneratedImages([]);
      setSelectedImageIndex(null);
    }
  };

  const imageModels = getImageModels();

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Image Generation</h2>
        {generatedImages.length > 0 && (
          <button
            onClick={clearAllImages}
            className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
            title="Clear all generated images"
          >
            🗑️ Clear All ({generatedImages.length})
          </button>
        )}
      </div>

      <div className="space-y-4 max-w-2xl">
        {/* Model Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Model
          </label>
          <select
            value={selectedImageModel}
            onChange={(e) => setSelectedImageModel(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!provider || isLoading}
          >
            {imageModels.length > 0 ? (
              imageModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name || model.id}
                  {model.description ? ` - ${model.description.substring(0, 50)}` : ''}
                </option>
              ))
            ) : (
              <option value={selectedImageModel}>{selectedImageModel}</option>
            )}
          </select>
        </div>
        {/* Prompt */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-300">
              Prompt
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{prompt.length} characters</span>
              {prompt && (
                <button
                  onClick={copyPrompt}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  title="Copy prompt to clipboard"
                >
                  📋 Copy
                </button>
              )}
            </div>
          </div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the image you want to generate... Be specific and detailed for best results."
            rows={4}
            disabled={isLoading}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-gray-400">💡 Tip: Press Ctrl+Enter to generate quickly</p>
          </div>
        </div>

        {/* Aspect Ratio Presets */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Aspect Ratio Presets
          </label>
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => setAspectRatio('square')}
              disabled={isLoading}
              className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm disabled:opacity-50"
              title="1024x1024"
            >
              ⬜ Square
            </button>
            <button
              onClick={() => setAspectRatio('portrait')}
              disabled={isLoading}
              className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm disabled:opacity-50"
              title="768x1344"
            >
              📱 Portrait
            </button>
            <button
              onClick={() => setAspectRatio('landscape')}
              disabled={isLoading}
              className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm disabled:opacity-50"
              title="1344x768"
            >
              🖼️ Landscape
            </button>
            <button
              onClick={() => setAspectRatio('widescreen')}
              disabled={isLoading}
              className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm disabled:opacity-50"
              title="1536x640"
            >
              📺 Wide
            </button>
          </div>
        </div>

        {/* Negative Prompt */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Negative Prompt (Optional)
          </label>
          <input
            type="text"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Things to avoid in the image..."
            disabled={isLoading}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
        </div>

        {/* Advanced Settings */}
        {showAdvanced && (
          <div className="space-y-4 border-t border-gray-700 pt-4">
            {/* Style Preset */}
            {styles.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Style Preset (Optional)
                </label>
                <select
                  value={stylePreset}
                  onChange={(e) => setStylePreset(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <option value="">None</option>
                  {styles.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" title="Number of inference steps. Higher values produce better quality but take longer.">
                  Steps (1-100)
                </label>
                <input
                  type="number"
                  value={steps}
                  onChange={(e) => setSteps(parseInt(e.target.value))}
                  disabled={isLoading}
                  min={1}
                  max={100}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" title="Number of images to generate (1-4)">
                  # of Images
                </label>
                <input
                  type="number"
                  value={numImages}
                  onChange={(e) => setNumImages(Math.min(4, Math.max(1, parseInt(e.target.value) || 1)))}
                  disabled={isLoading}
                  min={1}
                  max={4}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Width (256-2048)
                </label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(parseInt(e.target.value))}
                  disabled={isLoading}
                  min={256}
                  max={2048}
                  step={64}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Height (256-2048)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  disabled={isLoading}
                  min={256}
                  max={2048}
                  step={64}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" title="Classifier Free Guidance Scale. Higher values follow prompt more strictly.">
                  CFG Scale (1-20)
                </label>
                <input
                  type="number"
                  value={cfgScale}
                  onChange={(e) => setCfgScale(parseFloat(e.target.value))}
                  disabled={isLoading}
                  min={1}
                  max={20}
                  step={0.5}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Seed (Optional)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={seed || ''}
                    onChange={(e) => setSeed(e.target.value ? parseInt(e.target.value) : undefined)}
                    placeholder="Random"
                    disabled={isLoading}
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  />
                  <button
                    onClick={generateRandomSeed}
                    disabled={isLoading}
                    className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors disabled:opacity-50"
                    title="Generate random seed"
                  >
                    🎲
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-900/30 border border-red-600 rounded p-3 text-red-400">
            {error}
          </div>
        )}

        {/* Progress */}
        {isLoading && progress && (
          <div className="bg-blue-900/30 border border-blue-600 rounded p-3 text-blue-400 flex items-center gap-3">
            <div className="animate-spin h-5 w-5 border-2 border-blue-400 border-t-transparent rounded-full"></div>
            {progress}
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isLoading || !provider || !prompt.trim()}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isLoading ? `Generating ${numImages > 1 ? `${numImages} images` : 'image'}...` : `Generate ${numImages > 1 ? `${numImages} Images` : 'Image'}`}
        </button>

        {!provider && (
          <p className="text-red-400 text-sm">
            Please configure your API key in Settings
          </p>
        )}

        {/* Generated Images Gallery */}
        {generatedImages.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Generated Images ({generatedImages.length})
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {generatedImages.map((image, index) => (
                <div
                  key={`${image.timestamp}-${index}`}
                  className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800 hover:border-blue-500 transition-all hover:shadow-lg cursor-pointer"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <div className="aspect-square bg-gray-900 flex items-center justify-center overflow-hidden relative group">
                    <img
                      src={image.url}
                      alt={`Generated ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                        👁️ View Full Size
                      </span>
                    </div>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="text-gray-400 text-xs truncate" title={image.prompt}>
                      📝 {image.prompt}
                    </div>
                    {image.seed && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Seed: {image.seed}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSeed(image.seed);
                          }}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                          title="Use this seed"
                        >
                          ♻️ Reuse
                        </button>
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadImage(image.url, index);
                      }}
                      className="w-full px-2 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-center text-sm font-medium"
                    >
                      ⬇️ Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Image Preview Modal */}
        {selectedImageIndex !== null && generatedImages[selectedImageIndex] && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImageIndex(null)}
          >
            <div
              className="max-w-6xl max-h-full bg-gray-800 rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-white">Image Preview</h3>
                    <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                      {selectedImageIndex + 1} of {generatedImages.length}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{generatedImages[selectedImageIndex].prompt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {generatedImages[selectedImageIndex].seed && (
                      <span>🎲 Seed: {generatedImages[selectedImageIndex].seed}</span>
                    )}
                    <span>📅 {new Date(generatedImages[selectedImageIndex].timestamp).toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedImageIndex(null)}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                  title="Close preview (Esc)"
                >
                  ✕ Close
                </button>
              </div>
              <div className="overflow-auto max-h-[calc(100vh-200px)] bg-gray-900">
                <img
                  src={generatedImages[selectedImageIndex].url}
                  alt="Preview"
                  className="w-full"
                />
              </div>
              <div className="p-4 border-t border-gray-700 flex gap-2">
                <button
                  onClick={() => downloadImage(generatedImages[selectedImageIndex].url, selectedImageIndex)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-medium"
                >
                  ⬇️ Download Image
                </button>
                {generatedImages[selectedImageIndex].seed && (
                  <button
                    onClick={() => {
                      setSeed(generatedImages[selectedImageIndex].seed);
                      setSelectedImageIndex(null);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    title="Use this seed for next generation"
                  >
                    ♻️ Reuse Seed
                  </button>
                )}
                {selectedImageIndex > 0 && (
                  <button
                    onClick={() => setSelectedImageIndex(selectedImageIndex - 1)}
                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    ← Previous
                  </button>
                )}
                {selectedImageIndex < generatedImages.length - 1 && (
                  <button
                    onClick={() => setSelectedImageIndex(selectedImageIndex + 1)}
                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
