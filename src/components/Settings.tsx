import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/stores/appStore';

export const Settings: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { apiKey, initializeProvider, provider } = useAppStore();
  const [localKey, setLocalKey] = useState(apiKey);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load API key from localStorage on mount
    const savedKey = localStorage.getItem('venice_api_key');
    if (savedKey) {
      setLocalKey(savedKey);
      if (!provider) {
        initializeProvider(savedKey);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    if (!localKey.trim()) {
      setMessage('Please enter an API key');
      return;
    }

    setIsSaving(true);
    setMessage('');

    try {
      // Save to localStorage
      localStorage.setItem('venice_api_key', localKey);
      
      // Initialize provider
      initializeProvider(localKey);
      
      // Test the API key by fetching models
      const testProvider = useAppStore.getState().provider;
      if (testProvider) {
        await testProvider.getModels();
        setMessage('✓ API key saved and verified');
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (error) {
      console.error('Failed to verify API key:', error);
      setMessage('⚠️ API key saved but could not be verified. Please check your key.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-white mb-4">Settings</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Venice API Key
            </label>
            <input
              type="password"
              value={localKey}
              onChange={(e) => setLocalKey(e.target.value)}
              placeholder="Enter your Venice API key"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-2 text-xs text-gray-400">
              Your API key is stored locally and only used to communicate with Venice AI.
              Get your key from <a href="https://venice.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">venice.ai</a>
            </p>
          </div>

          {message && (
            <div className={`text-sm p-2 rounded ${
              message.startsWith('✓') ? 'bg-green-900/30 text-green-400' : 
              message.startsWith('⚠️') ? 'bg-yellow-900/30 text-yellow-400' :
              'bg-red-900/30 text-red-400'
            }`}>
              {message}
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
