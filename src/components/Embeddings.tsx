import React, { useState } from "react";
import { getClient, hasApiKey } from "../utils/apiClient";

const Embeddings: React.FC = () => {
  const [input, setInput] = useState("");
  const [model, setModel] = useState("text-embedding-ada-002");
  const [loading, setLoading] = useState(false);
  const [embeddings, setEmbeddings] = useState<number[][] | null>(null);
  const [stats, setStats] = useState<{ tokens: number; dimensions: number } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasApiKey() || !input.trim()) return;

    setLoading(true);
    try {
      const client = getClient();
      const response = await client.createEmbedding({
        input: input.split("\n").filter((line) => line.trim()),
        model,
      });

      const embeddingVectors = response.data.map((item) => item.embedding);
      setEmbeddings(embeddingVectors);
      setStats({
        tokens: response.usage.prompt_tokens,
        dimensions: embeddingVectors[0]?.length || 0,
      });
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
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
      <h2>Embeddings</h2>
      <p className="description">
        Generate vector embeddings for text inputs. Each line will be processed separately.
      </p>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Model:</label>
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="text-embedding-ada-002">text-embedding-ada-002</option>
            <option value="text-embedding-3-small">text-embedding-3-small</option>
            <option value="text-embedding-3-large">text-embedding-3-large</option>
          </select>
        </div>

        <div className="form-group">
          <label>Text (one per line):</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to embed, one line per input..."
            rows={6}
          />
        </div>

        <button type="submit" disabled={loading || !input.trim()}>
          {loading ? "Generating..." : "Generate Embeddings"}
        </button>
      </form>

      {stats && (
        <div className="stats-box">
          <h3>Statistics:</h3>
          <p>Tokens used: {stats.tokens}</p>
          <p>Embedding dimensions: {stats.dimensions}</p>
          <p>Number of embeddings: {embeddings?.length || 0}</p>
        </div>
      )}

      {embeddings && (
        <div className="results">
          <h3>Results:</h3>
          <div className="embeddings-list">
            {embeddings.map((embedding, idx) => (
              <div key={idx} className="embedding-item">
                <h4>Embedding {idx + 1}</h4>
                <div className="embedding-preview">
                  [{embedding.slice(0, 5).map((v) => v.toFixed(6)).join(", ")}
                  , ... ({embedding.length} dimensions)]
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(embedding));
                    alert("Embedding copied to clipboard!");
                  }}
                  className="btn-secondary"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Embeddings;
