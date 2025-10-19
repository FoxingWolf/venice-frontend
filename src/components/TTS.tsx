import React, { useState } from 'react';
import { useAppStore } from '@/stores/appStore';

const VOICES = [
  'af_sky', 'af_bella', 'af_sarah', 'af_nicole',
  'am_adam', 'am_michael', 'bf_emma', 'bf_isabella',
  'bm_george', 'bm_lewis'
];

export const TTS: React.FC = () => {
  const { provider, addStats } = useAppStore();
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('af_sky');
  const [speed, setSpeed] = useState(1.0);
  const [format, setFormat] = useState<'mp3' | 'opus' | 'aac' | 'flac' | 'wav' | 'pcm'>('mp3');
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!text.trim() || !provider || isLoading) return;

    setIsLoading(true);
    setError(null);
    setAudioUrl(null);

    try {
      const { data, headers } = await provider.generateSpeech({
        input: text,
        model: 'tts-kokoro',
        voice,
        response_format: format,
        speed,
      });

      const url = URL.createObjectURL(data);
      setAudioUrl(url);

      addStats({
        requestId: headers?.cfRay,
        modelId: 'tts-kokoro',
        deprecationWarning: headers?.veniceModelDeprecationWarning,
        deprecationDate: headers?.veniceModelDeprecationDate,
        headers,
        timestamp: Date.now(),
      });
    } catch (err) {
      console.error('TTS error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate speech');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4">
      <h2 className="text-2xl font-bold text-white mb-4">Text-to-Speech</h2>

      <div className="space-y-4 max-w-2xl">
        {/* Text Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Text to Speak
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to convert to speech..."
            rows={6}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Voice Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Voice
          </label>
          <select
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {VOICES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Speed
            </label>
            <input
              type="number"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              min={0.5}
              max={2.0}
              step={0.1}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as typeof format)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="mp3">MP3</option>
              <option value="opus">Opus</option>
              <option value="aac">AAC</option>
              <option value="flac">FLAC</option>
              <option value="wav">WAV</option>
              <option value="pcm">PCM</option>
            </select>
          </div>
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
          {isLoading ? 'Generating...' : 'Generate Speech'}
        </button>

        {!provider && (
          <p className="text-red-400 text-sm">
            Please configure your API key in Settings
          </p>
        )}

        {/* Audio Player */}
        {audioUrl && (
          <div className="mt-6 border border-gray-700 rounded-lg p-4 space-y-3">
            <h3 className="text-white font-semibold">Generated Audio</h3>
            <audio controls src={audioUrl} className="w-full" />
            <a
              href={audioUrl}
              download={`venice-tts.${format}`}
              className="block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-center"
            >
              Download
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
