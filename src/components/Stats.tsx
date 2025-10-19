import React, { useState, useEffect } from "react";
import {
  getClient,
  hasApiKey,
  loadApiKey,
  saveApiKey,
  clearApiKey,
  initializeClient,
} from "../utils/apiClient";
import type { Stats as StatsType } from "../types/api";

const Stats: React.FC = () => {
  const [stats, setStats] = useState<StatsType | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Try to load API key on mount
    const savedKey = loadApiKey();
    if (savedKey) {
      initializeClient(savedKey);
      setIsInitialized(true);
      setApiKey(savedKey);
    }

    // Update stats periodically
    const interval = setInterval(() => {
      if (hasApiKey()) {
        try {
          const client = getClient();
          setStats(client.getStats());
        } catch (e) {
          // Client not initialized yet
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      alert("Please enter an API key");
      return;
    }

    try {
      initializeClient(apiKey);
      saveApiKey(apiKey);
      setIsInitialized(true);
      setShowSettings(false);
      alert("API key saved successfully!");
    } catch (error) {
      console.error("Error saving API key:", error);
      alert("Error saving API key");
    }
  };

  const handleClearApiKey = () => {
    if (!confirm("Are you sure you want to clear your API key?")) return;
    
    clearApiKey();
    setIsInitialized(false);
    setApiKey("");
    setStats(null);
  };

  const handleResetStats = () => {
    if (!hasApiKey()) return;
    
    try {
      const client = getClient();
      client.resetStats();
      setStats(client.getStats());
    } catch (e) {
      console.error("Error resetting stats:", e);
    }
  };

  return (
    <footer className="stats-footer">
      <div className="stats-content">
        {!isInitialized ? (
          <div className="api-key-warning">
            <span>⚠️ API Key not set</span>
            <button onClick={() => setShowSettings(!showSettings)} className="btn-link">
              {showSettings ? "Hide" : "Configure"}
            </button>
          </div>
        ) : (
          <>
            <div className="stat-item">
              <span className="stat-label">Tokens:</span>
              <span className="stat-value">
                {stats?.tokens.total_tokens.toLocaleString() || 0}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Requests:</span>
              <span className="stat-value">
                {stats?.rate_limits.remaining_requests ?? "N/A"}
              </span>
            </div>
            <div className="stat-item">
              <button onClick={handleResetStats} className="btn-link">
                Reset Stats
              </button>
            </div>
            <div className="stat-item">
              <button onClick={() => setShowSettings(!showSettings)} className="btn-link">
                Settings
              </button>
            </div>
          </>
        )}
      </div>

      {showSettings && (
        <div className="settings-panel">
          <h3>Settings</h3>
          <div className="form-group">
            <label>Venice API Key:</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key..."
            />
          </div>
          <div className="settings-actions">
            <button onClick={handleSaveApiKey} className="btn-primary">
              Save API Key
            </button>
            {isInitialized && (
              <button onClick={handleClearApiKey} className="btn-danger">
                Clear API Key
              </button>
            )}
            <button onClick={() => setShowSettings(false)} className="btn-secondary">
              Close
            </button>
          </div>
          <p className="help-text">
            Get your API key from{" "}
            <a href="https://venice.ai" target="_blank" rel="noopener noreferrer">
              venice.ai
            </a>
          </p>
        </div>
      )}
    </footer>
  );
};

export default Stats;
