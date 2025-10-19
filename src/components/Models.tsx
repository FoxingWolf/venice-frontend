import React, { useState, useEffect } from "react";
import { getClient, hasApiKey } from "../utils/apiClient";
import type { Model } from "../types/api";

const Models: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [showDeprecated, setShowDeprecated] = useState(false);

  useEffect(() => {
    if (hasApiKey()) {
      loadModels();
    }
  }, []);

  const loadModels = async () => {
    setLoading(true);
    try {
      const client = getClient();
      const data = await client.listModels();
      setModels(data);
    } catch (error) {
      console.error("Error loading models:", error);
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredModels = models.filter((model) => {
    const matchesFilter = model.id.toLowerCase().includes(filter.toLowerCase());
    const matchesDeprecated = showDeprecated || !model.deprecated;
    return matchesFilter && matchesDeprecated;
  });

  if (!hasApiKey()) {
    return (
      <div className="module-container">
        <p className="error">Please set your API key in the settings.</p>
      </div>
    );
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Models</h2>
        <button onClick={loadModels} disabled={loading} className="btn-secondary">
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      <div className="filters">
        <div className="form-group">
          <label>Search:</label>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter models..."
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={showDeprecated}
              onChange={(e) => setShowDeprecated(e.target.checked)}
            />
            Show deprecated models
          </label>
        </div>
      </div>

      {loading && models.length === 0 ? (
        <p>Loading models...</p>
      ) : filteredModels.length === 0 ? (
        <p className="empty-state">No models found matching your criteria.</p>
      ) : (
        <div className="models-list">
          <table className="models-table">
            <thead>
              <tr>
                <th>Model ID</th>
                <th>Owner</th>
                <th>Created</th>
                <th>Capabilities</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredModels.map((model) => (
                <tr key={model.id} className={model.deprecated ? "deprecated" : ""}>
                  <td className="model-id">{model.id}</td>
                  <td>{model.owned_by}</td>
                  <td>{new Date(model.created * 1000).toLocaleDateString()}</td>
                  <td>
                    {model.capabilities && model.capabilities.length > 0 ? (
                      <div className="capabilities">
                        {model.capabilities.map((cap, idx) => (
                          <span key={idx} className="capability-tag">
                            {cap}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted">N/A</span>
                    )}
                  </td>
                  <td>
                    {model.deprecated ? (
                      <span className="status-badge deprecated">Deprecated</span>
                    ) : (
                      <span className="status-badge active">Active</span>
                    )}
                    {model.deprecation_message && (
                      <div className="deprecation-message">
                        {model.deprecation_message}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="models-summary">
        <p>
          Showing {filteredModels.length} of {models.length} models
        </p>
      </div>
    </div>
  );
};

export default Models;
