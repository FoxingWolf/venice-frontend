import React, { useState } from 'react';
import { useAppStore } from '@/stores/appStore';

export const Embeddings: React.FC = () => {
  const { provider, addStats } = useAppStore();
  const [text, setText] = useState('');
  const [format, setFormat] = useState<'float' | 'base64'>('float');
  const [isLoading, setIsLoading] = useState(false);
  const [embeddings, setEmbeddings] = useState<number[][] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!text.trim() || !provider || isLoading) return;

    setIsLoading(true);
    setError(null);
    setEmbeddings(null);

    try {
      const { data, headers } = await provider.createEmbeddings({
        model: 'text-embedding-bge-m3',
        input: text,
        encoding_format: format,
      });

      setEmbeddings(data.embeddings);

      addStats({
        requestId: headers?.cfRay,
        modelId: 'text-embedding-bge-m3',
        deprecationWarning: headers?.veniceModelDeprecationWarning,
        deprecationDate: headers?.veniceModelDeprecationDate,
        headers,
        timestamp: Date.now(),
      });
    } catch (err) {
      console.error('Embeddings error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate embeddings');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadEmbeddings = () => {
    if (!embeddings) return;

    const data = JSON.stringify(embeddings, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'embeddings.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full overflow-y-auto p-4">
      <h2 className="text-2xl font-bold text-white mb-4">Embeddings</h2>

      <div className="space-y-4 max-w-2xl">
        {/* Text Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Text to Embed
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to convert to embeddings..."
            rows={6}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Format Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Encoding Format
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as typeof format)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="float">Float</option>
            <option value="base64">Base64</option>
          </select>
        </div>

        {/* Model Info */}
        <div className="bg-blue-900/20 border border-blue-600 rounded p-3 text-blue-300 text-sm">
          <strong>Model:</strong> text-embedding-bge-m3
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-900/30 border border-red-600 rounded p-3 text-red-400">
            {error}
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isLoading || !provider || !text.trim()}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isLoading ? 'Generating...' : 'Generate Embeddings'}
        </button>

        {!provider && (
          <p className="text-red-400 text-sm">
            Please configure your API key in Settings
          </p>
        )}

        {/* Embeddings Result */}
        {embeddings && (
          <div className="mt-6 border border-gray-700 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold">Generated Embeddings</h3>
              <button
                onClick={downloadEmbeddings}
                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
              >
                Download JSON
              </button>
            </div>
            <div className="bg-gray-800 rounded p-3 text-sm">
              <p className="text-gray-400">
                Dimensions: <span className="text-white">{embeddings[0]?.length || 0}</span>
              </p>
              <p className="text-gray-400">
                Vectors: <span className="text-white">{embeddings.length}</span>
              </p>
            </div>
            <div className="bg-gray-800 rounded p-3 overflow-x-auto max-h-64 overflow-y-auto">
              <pre className="text-xs text-gray-300">
                {JSON.stringify(embeddings, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
