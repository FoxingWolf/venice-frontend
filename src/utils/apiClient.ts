import VeniceAPIClient from "../api/client";

let apiClient: VeniceAPIClient | null = null;

export const initializeClient = (apiKey: string): VeniceAPIClient => {
  apiClient = new VeniceAPIClient(apiKey);
  return apiClient;
};

export const getClient = (): VeniceAPIClient => {
  if (!apiClient) {
    throw new Error("API client not initialized. Please set your API key.");
  }
  return apiClient;
};

export const hasApiKey = (): boolean => {
  return apiClient !== null;
};

// Try to load API key from environment or storage
export const loadApiKey = (): string | null => {
  // Check localStorage first
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("venice_api_key");
    if (stored) {
      return stored;
    }
  }
  
  // In Tauri, we could also check environment variables
  return null;
};

export const saveApiKey = (apiKey: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("venice_api_key", apiKey);
  }
};

export const clearApiKey = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("venice_api_key");
  }
  apiClient = null;
};
