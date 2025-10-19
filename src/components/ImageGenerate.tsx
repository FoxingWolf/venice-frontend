import React, { useState } from 'react';
import { useAppStore } from '@/stores/appStore';

export const ImageGenerate: React.FC = () => {
  const { provider, showAdvanced, addStats } = useAppStore();
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [model, setModel] = useState('qwen-image');
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(1024);
  const [steps, setSteps] = useState(30);
  const [cfgScale, setCfgScale] = useState(7.5);
  const [seed, setSeed] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || !provider || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const { data, headers } = await provider.generateImage({
        model,
        prompt,
        negative_prompt: negativePrompt || undefined,
        width,
        height,
        steps,
        cfg_scale: cfgScale,
        seed: seed || undefined,
        return_binary: false,
      });

      if (data.url) {
        setGeneratedImage(data.url);
      } else if (data.b64_json) {
        setGeneratedImage(`data:image/png;base64,${data.b64_json}`);
      }

      addStats({
        requestId: headers?.cfRay,
        modelId: model,
        deprecationWarning: headers?.veniceModelDeprecationWarning,
        deprecationDate: headers?.veniceModelDeprecationDate,
        headers,
        timestamp: Date.now(),
      });
    } catch (err) {
      console.error('Image generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4">
      <h2 className="text-2xl font-bold text-white mb-4">Image Generation</h2>

      <div className="space-y-4 max-w-2xl">
        {/* Prompt */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            rows={4}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
            placeholder="Things to avoid in the image..."
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Advanced Settings */}
        {showAdvanced && (
          <div className="space-y-4 border-t border-gray-700 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Model
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="qwen-image">Qwen Image</option>
                  <option value="venice-sd35">Venice SD 3.5</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Steps
                </label>
                <input
                  type="number"
                  value={steps}
                  onChange={(e) => setSteps(parseInt(e.target.value))}
                  min={1}
                  max={100}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Width
                </label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(parseInt(e.target.value))}
                  min={256}
                  max={2048}
                  step={64}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Height
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  min={256}
                  max={2048}
                  step={64}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  CFG Scale
                </label>
                <input
                  type="number"
                  value={cfgScale}
                  onChange={(e) => setCfgScale(parseFloat(e.target.value))}
                  min={1}
                  max={20}
                  step={0.5}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Seed (Optional)
                </label>
                <input
                  type="number"
                  value={seed || ''}
                  onChange={(e) => setSeed(e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="Random"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isLoading || !provider || !prompt.trim()}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isLoading ? 'Generating...' : 'Generate Image'}
        </button>

        {!provider && (
          <p className="text-red-400 text-sm">
            Please configure your API key in Settings
          </p>
        )}

        {/* Generated Image */}
        {generatedImage && (
          <div className="mt-6 border border-gray-700 rounded-lg overflow-hidden">
            <img
              src={generatedImage}
              alt="Generated"
              className="w-full"
            />
            <div className="bg-gray-800 p-3 flex gap-2">
              <a
                href={generatedImage}
                download="venice-generated.png"
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-center"
              >
                Download
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
