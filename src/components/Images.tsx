import React, { useState } from "react";
import { getClient, hasApiKey } from "../utils/apiClient";

type ImageMode = "generate" | "edit" | "upscale";

const Images: React.FC = () => {
  const [mode, setMode] = useState<ImageMode>("generate");
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("dall-e-3");
  const [size, setSize] = useState("1024x1024");
  const [quality, setQuality] = useState("standard");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [maskFile, setMaskFile] = useState<File | null>(null);
  const [scale, setScale] = useState(2);
  const [loading, setLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasApiKey() || !prompt.trim()) return;

    setLoading(true);
    try {
      const client = getClient();
      const response = await client.generateImage({
        prompt,
        model,
        size,
        quality,
        n: 1,
      });

      const images = response.data.map((img) => img.url || img.b64_json || "");
      setGeneratedImages(images);
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasApiKey() || !imageFile || !prompt.trim()) return;

    setLoading(true);
    try {
      const client = getClient();
      const response = await client.editImage({
        image: imageFile,
        prompt,
        mask: maskFile || undefined,
        model,
        size,
        n: 1,
      });

      const images = response.data.map((img) => img.url || img.b64_json || "");
      setGeneratedImages(images);
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpscale = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasApiKey() || !imageFile) return;

    setLoading(true);
    try {
      const client = getClient();
      const response = await client.upscaleImage({
        image: imageFile,
        model,
        scale,
      });

      const images = response.data.map((img) => img.url || img.b64_json || "");
      setGeneratedImages(images);
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (mode === "generate") return handleGenerate(e);
    if (mode === "edit") return handleEdit(e);
    if (mode === "upscale") return handleUpscale(e);
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
      <div className="mode-selector">
        <button
          className={mode === "generate" ? "active" : ""}
          onClick={() => setMode("generate")}
        >
          Generate
        </button>
        <button
          className={mode === "edit" ? "active" : ""}
          onClick={() => setMode("edit")}
        >
          Edit
        </button>
        <button
          className={mode === "upscale" ? "active" : ""}
          onClick={() => setMode("upscale")}
        >
          Upscale
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form">
        {mode === "generate" && (
          <>
            <div className="form-group">
              <label>Prompt:</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to generate..."
                rows={4}
              />
            </div>
            <div className="form-group">
              <label>Model:</label>
              <select value={model} onChange={(e) => setModel(e.target.value)}>
                <option value="dall-e-3">DALL-E 3</option>
                <option value="dall-e-2">DALL-E 2</option>
                <option value="stable-diffusion">Stable Diffusion</option>
              </select>
            </div>
            <div className="form-group">
              <label>Size:</label>
              <select value={size} onChange={(e) => setSize(e.target.value)}>
                <option value="1024x1024">1024x1024</option>
                <option value="1024x1792">1024x1792</option>
                <option value="1792x1024">1792x1024</option>
              </select>
            </div>
            <div className="form-group">
              <label>Quality:</label>
              <select value={quality} onChange={(e) => setQuality(e.target.value)}>
                <option value="standard">Standard</option>
                <option value="hd">HD</option>
              </select>
            </div>
          </>
        )}

        {mode === "edit" && (
          <>
            <div className="form-group">
              <label>Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
            </div>
            <div className="form-group">
              <label>Mask (optional):</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setMaskFile(e.target.files?.[0] || null)}
              />
            </div>
            <div className="form-group">
              <label>Prompt:</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the edit you want to make..."
                rows={4}
              />
            </div>
          </>
        )}

        {mode === "upscale" && (
          <>
            <div className="form-group">
              <label>Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
            </div>
            <div className="form-group">
              <label>Scale: {scale}x</label>
              <input
                type="range"
                min="2"
                max="4"
                step="1"
                value={scale}
                onChange={(e) => setScale(parseInt(e.target.value))}
              />
            </div>
          </>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>

      {generatedImages.length > 0 && (
        <div className="image-results">
          <h3>Results:</h3>
          <div className="image-grid">
            {generatedImages.map((img, idx) => (
              <img key={idx} src={img} alt={`Generated ${idx}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Images;
