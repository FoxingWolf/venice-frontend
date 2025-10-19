import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/stores/appStore';
import type { Character } from '@/types/venice';

export const Characters: React.FC = () => {
  const { provider, characters, setCharacters, selectedCharacter, setSelectedCharacter } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCharacterDetails, setSelectedCharacterDetails] = useState<Character | null>(null);

  useEffect(() => {
    if (provider && characters.length === 0) {
      loadCharacters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  const loadCharacters = async () => {
    if (!provider || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const chars = await provider.getCharacters();
      setCharacters(chars);
    } catch (err) {
      console.error('Failed to load characters:', err);
      setError(err instanceof Error ? err.message : 'Failed to load characters');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCharacter = async (slug: string) => {
    if (!provider) return;

    setSelectedCharacter(slug);

    try {
      const char = await provider.getCharacter(slug);
      setSelectedCharacterDetails(char);
    } catch (err) {
      console.error('Failed to load character details:', err);
    }
  };

  const handleDeselectCharacter = () => {
    setSelectedCharacter(null);
    setSelectedCharacterDetails(null);
  };

  return (
    <div className="h-full overflow-y-auto p-4">
      <h2 className="text-2xl font-bold text-white mb-4">Characters</h2>

      {!provider && (
        <div className="text-red-400">
          Please configure your API key in Settings
        </div>
      )}

      {error && (
        <div className="bg-red-900/30 border border-red-600 rounded p-3 text-red-400 mb-4">
          {error}
        </div>
      )}

      {selectedCharacter && selectedCharacterDetails && (
        <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              {selectedCharacterDetails.avatar_url && (
                <img
                  src={selectedCharacterDetails.avatar_url}
                  alt={selectedCharacterDetails.name}
                  className="w-16 h-16 rounded-full"
                />
              )}
              <div>
                <h3 className="text-white font-semibold text-lg">
                  {selectedCharacterDetails.name}
                </h3>
                <p className="text-blue-300 text-sm mt-1">
                  {selectedCharacterDetails.description}
                </p>
                <p className="text-blue-400 text-xs mt-2">
                  Slug: {selectedCharacterDetails.slug}
                </p>
              </div>
            </div>
            <button
              onClick={handleDeselectCharacter}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
            >
              Deselect
            </button>
          </div>
          <div className="mt-3 text-blue-300 text-sm">
            This character is now active. Use the Chat mode to talk with them.
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-center text-gray-400 mt-8">Loading characters...</div>
      ) : characters.length === 0 ? (
        <div className="text-center text-gray-400 mt-8">
          <p>No characters available</p>
          <button
            onClick={loadCharacters}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {characters.map((char) => (
            <div
              key={char.slug}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedCharacter === char.slug
                  ? 'border-blue-500 bg-blue-900/20'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-600'
              }`}
              onClick={() => handleSelectCharacter(char.slug)}
            >
              {char.avatar_url && (
                <img
                  src={char.avatar_url}
                  alt={char.name}
                  className="w-full h-32 object-cover rounded mb-3"
                />
              )}
              <h3 className="text-white font-semibold">{char.name}</h3>
              {char.description && (
                <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                  {char.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
