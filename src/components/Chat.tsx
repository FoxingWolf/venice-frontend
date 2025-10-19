import React, { useState, useRef, useEffect } from "react";
import { getClient, hasApiKey } from "../utils/apiClient";
import type { Message } from "../types/api";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(true);
  const [model, setModel] = useState("llama-3.3-70b");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !hasApiKey()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const client = getClient();
      const request = {
        model,
        messages: [...messages, userMessage],
        venice_parameters: {
          temperature,
          max_tokens: maxTokens,
        },
      };

      if (streaming) {
        const assistantMessage: Message = { role: "assistant", content: "" };
        setMessages((prev) => [...prev, assistantMessage]);

        const stream = client.createChatCompletionStream(request);
        for await (const chunk of stream) {
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1].content += chunk;
            return updated;
          });
        }
      } else {
        const response = await client.createChatCompletion(request);
        const assistantMessage = response.choices[0].message;
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  if (!hasApiKey()) {
    return (
      <div className="module-container">
        <p className="error">Please set your API key in the settings.</p>
      </div>
    );
  }

  return (
    <div className="module-container chat-container">
      <div className="chat-settings">
        <div className="settings-group">
          <label>Model:</label>
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="llama-3.3-70b">Llama 3.3 70B</option>
            <option value="llama-3.1-405b">Llama 3.1 405B</option>
            <option value="mistral-large">Mistral Large</option>
            <option value="gpt-4">GPT-4</option>
          </select>
        </div>
        <div className="settings-group">
          <label>Temperature: {temperature}</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
          />
        </div>
        <div className="settings-group">
          <label>Max Tokens: {maxTokens}</label>
          <input
            type="range"
            min="128"
            max="4096"
            step="128"
            value={maxTokens}
            onChange={(e) => setMaxTokens(parseInt(e.target.value))}
          />
        </div>
        <div className="settings-group">
          <label>
            <input
              type="checkbox"
              checked={streaming}
              onChange={(e) => setStreaming(e.target.checked)}
            />
            Streaming
          </label>
        </div>
        <button onClick={handleClearChat} className="btn-secondary">
          Clear Chat
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message message-${msg.role}`}>
            <div className="message-role">{msg.role}</div>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
          className="chat-input"
        />
        <button type="submit" disabled={loading || !input.trim()}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Chat;
