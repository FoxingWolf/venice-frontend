import React, { useState } from "react";
import { getClient, hasApiKey } from "../utils/apiClient";

const TTS: React.FC = () => {
  const [input, setInput] = useState("");
  const [model, setModel] = useState("tts-1");
  const [voice, setVoice] = useState("alloy");
  const [speed, setSpeed] = useState(1.0);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasApiKey() || !input.trim()) return;

    setLoading(true);
    try {
      const client = getClient();
      const audioBlob = await client.createSpeech({
        input,
        model,
        voice,
        speed,
      });

      // Create a URL for the audio blob
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!audioUrl) return;
    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = "venice-tts-audio.mp3";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!hasApiKey()) {
    return (
      <div className="module-container">
        <p className="error">Please set your API key in the settings.</p>
      </div>
    );
  }

  return (
    <div className="module-container">
      <h2>Text-to-Speech</h2>
      <p className="description">
        Convert text to natural-sounding speech using AI-powered voice models.
      </p>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Model:</label>
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="tts-1">TTS-1 (Standard)</option>
            <option value="tts-1-hd">TTS-1-HD (High Quality)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Voice:</label>
          <select value={voice} onChange={(e) => setVoice(e.target.value)}>
            <option value="alloy">Alloy</option>
            <option value="echo">Echo</option>
            <option value="fable">Fable</option>
            <option value="onyx">Onyx</option>
            <option value="nova">Nova</option>
            <option value="shimmer">Shimmer</option>
          </select>
        </div>

        <div className="form-group">
          <label>Speed: {speed.toFixed(1)}x</label>
          <input
            type="range"
            min="0.25"
            max="4.0"
            step="0.25"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label>Text:</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter the text you want to convert to speech..."
            rows={6}
          />
        </div>

        <button type="submit" disabled={loading || !input.trim()}>
          {loading ? "Generating..." : "Generate Speech"}
        </button>
      </form>

      {audioUrl && (
        <div className="audio-player">
          <h3>Generated Audio:</h3>
          <audio controls src={audioUrl} className="audio-element">
            Your browser does not support the audio element.
          </audio>
          <button onClick={handleDownload} className="btn-secondary">
            Download Audio
          </button>
        </div>
      )}
    </div>
  );
};

export default TTS;
