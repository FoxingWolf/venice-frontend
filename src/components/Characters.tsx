import React, { useState, useEffect } from "react";
import { getClient, hasApiKey } from "../utils/apiClient";
import type { Character } from "../types/api";

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    traits: "",
    system_prompt: "",
  });

  useEffect(() => {
    if (hasApiKey()) {
      loadCharacters();
    }
  }, []);

  const loadCharacters = async () => {
    setLoading(true);
    try {
      const client = getClient();
      const data = await client.listCharacters();
      setCharacters(data);
    } catch (error) {
      console.error("Error loading characters:", error);
      // If endpoint doesn't exist, set empty array
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasApiKey()) return;

    setLoading(true);
    try {
      const client = getClient();
      const characterData = {
        name: formData.name,
        description: formData.description,
        traits: formData.traits.split(",").map((t) => t.trim()).filter(Boolean),
        system_prompt: formData.system_prompt,
      };

      if (editingId) {
        await client.updateCharacter(editingId, characterData);
      } else {
        await client.createCharacter(characterData);
      }

      await loadCharacters();
      setShowForm(false);
      setEditingId(null);
      setFormData({ name: "", description: "", traits: "", system_prompt: "" });
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (character: Character) => {
    setEditingId(character.id);
    setFormData({
      name: character.name,
      description: character.description,
      traits: character.traits?.join(", ") || "",
      system_prompt: character.system_prompt || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this character?")) return;

    setLoading(true);
    try {
      const client = getClient();
      await client.deleteCharacter(id);
      await loadCharacters();
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
      <div className="module-header">
        <h2>Characters</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ name: "", description: "", traits: "", system_prompt: "" });
          }}
          className="btn-primary"
        >
          {showForm ? "Cancel" : "Create Character"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="form character-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Character name"
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the character..."
              rows={3}
              required
            />
          </div>

          <div className="form-group">
            <label>Traits (comma-separated):</label>
            <input
              type="text"
              value={formData.traits}
              onChange={(e) => setFormData({ ...formData, traits: e.target.value })}
              placeholder="helpful, friendly, expert"
            />
          </div>

          <div className="form-group">
            <label>System Prompt:</label>
            <textarea
              value={formData.system_prompt}
              onChange={(e) => setFormData({ ...formData, system_prompt: e.target.value })}
              placeholder="You are a..."
              rows={4}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : editingId ? "Update Character" : "Create Character"}
          </button>
        </form>
      )}

      <div className="characters-list">
        {loading && characters.length === 0 ? (
          <p>Loading...</p>
        ) : characters.length === 0 ? (
          <p className="empty-state">No characters yet. Create your first character!</p>
        ) : (
          characters.map((character) => (
            <div key={character.id} className="character-card">
              <h3>{character.name}</h3>
              <p className="character-description">{character.description}</p>
              {character.traits && character.traits.length > 0 && (
                <div className="traits">
                  {character.traits.map((trait, idx) => (
                    <span key={idx} className="trait-tag">
                      {trait}
                    </span>
                  ))}
                </div>
              )}
              {character.system_prompt && (
                <details className="system-prompt">
                  <summary>System Prompt</summary>
                  <p>{character.system_prompt}</p>
                </details>
              )}
              <div className="character-actions">
                <button onClick={() => handleEdit(character)} className="btn-secondary">
                  Edit
                </button>
                <button onClick={() => handleDelete(character.id)} className="btn-danger">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Characters;
