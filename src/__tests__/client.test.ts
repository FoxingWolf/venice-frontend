import { describe, it, expect, beforeEach, vi } from "vitest";
import VeniceAPIClient from "../api/client";

// Mock fetch globally
global.fetch = vi.fn();

const mockHeaders = {
  get: () => null,
};

describe("VeniceAPIClient", () => {
  let client: VeniceAPIClient;
  const mockApiKey = "test-api-key";

  beforeEach(() => {
    client = new VeniceAPIClient(mockApiKey);
    vi.clearAllMocks();
  });

  describe("Chat Completions", () => {
    it("should create a chat completion", async () => {
      const mockResponse = {
        id: "test-id",
        object: "chat.completion",
        created: 1234567890,
        model: "llama-3.3-70b",
        choices: [
          {
            index: 0,
            message: {
              role: "assistant" as const,
              content: "Hello! How can I help you?",
            },
            finish_reason: "stop",
          },
        ],
        usage: {
          prompt_tokens: 10,
          completion_tokens: 20,
          total_tokens: 30,
        },
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
        headers: mockHeaders,
      });

      const response = await client.createChatCompletion({
        model: "llama-3.3-70b",
        messages: [{ role: "user", content: "Hello" }],
      });

      expect(response).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.venice.ai/api/v1/chat/completions",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            Authorization: `Bearer ${mockApiKey}`,
          }),
        })
      );
    });

    it("should track token usage", async () => {
      const mockResponse = {
        id: "test-id",
        object: "chat.completion",
        created: 1234567890,
        model: "llama-3.3-70b",
        choices: [
          {
            index: 0,
            message: {
              role: "assistant" as const,
              content: "Test response",
            },
            finish_reason: "stop",
          },
        ],
        usage: {
          prompt_tokens: 10,
          completion_tokens: 20,
          total_tokens: 30,
        },
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
        headers: mockHeaders,
      });

      await client.createChatCompletion({
        model: "llama-3.3-70b",
        messages: [{ role: "user", content: "Hello" }],
      });

      const stats = client.getStats();
      expect(stats.tokens.prompt_tokens).toBe(10);
      expect(stats.tokens.completion_tokens).toBe(20);
      expect(stats.tokens.total_tokens).toBe(30);
    });
  });

  describe("Image Generation", () => {
    it("should generate an image", async () => {
      const mockResponse = {
        created: 1234567890,
        data: [
          {
            url: "https://example.com/image.png",
          },
        ],
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
        headers: mockHeaders,
      });

      const response = await client.generateImage({
        prompt: "A beautiful sunset",
        model: "dall-e-3",
      });

      expect(response).toEqual(mockResponse);
    });
  });

  describe("Embeddings", () => {
    it("should create embeddings", async () => {
      const mockResponse = {
        object: "list",
        data: [
          {
            object: "embedding",
            embedding: [0.1, 0.2, 0.3],
            index: 0,
          },
        ],
        model: "text-embedding-ada-002",
        usage: {
          prompt_tokens: 5,
          total_tokens: 5,
        },
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
        headers: mockHeaders,
      });

      const response = await client.createEmbedding({
        input: "Test text",
        model: "text-embedding-ada-002",
      });

      expect(response).toEqual(mockResponse);
      expect(client.getStats().tokens.prompt_tokens).toBe(5);
    });
  });

  describe("Models", () => {
    it("should list models", async () => {
      const mockResponse = {
        data: [
          {
            id: "llama-3.3-70b",
            object: "model",
            created: 1234567890,
            owned_by: "venice",
          },
        ],
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
        headers: mockHeaders,
      });

      const models = await client.listModels();

      expect(models).toEqual(mockResponse.data);
    });
  });

  describe("Error Handling", () => {
    it("should handle API errors", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ error: "Invalid API key" }),
        headers: mockHeaders,
      });

      await expect(
        client.createChatCompletion({
          model: "llama-3.3-70b",
          messages: [{ role: "user", content: "Hello" }],
        })
      ).rejects.toThrow("Invalid API key");
    });
  });

  describe("Stats", () => {
    it("should reset stats", () => {
      const stats = client.getStats();
      stats.tokens.total_tokens = 100;
      
      client.resetStats();
      
      const newStats = client.getStats();
      expect(newStats.tokens.total_tokens).toBe(0);
    });
  });
});
