import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/stores/appStore';
import type { ChatMessage } from '@/types/venice';

export const Chat: React.FC = () => {
  const {
    provider,
    selectedModel,
    setSelectedModel,
    getChatModels,
    veniceParameters,
    chatParameters,
    setChatParameters,
    showAdvanced,
    addStats,
    selectedCharacter,
  } = useAppStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !provider || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const requestMessages = [...messages, userMessage];
      
      // Add system message if not present
      if (!requestMessages.some(m => m.role === 'system')) {
        requestMessages.unshift({
          role: 'system',
          content: 'You are a helpful assistant.',
        });
      }

      // Add character to venice_parameters if selected
      const params = { ...veniceParameters };
      if (selectedCharacter) {
        params.character_slug = selectedCharacter;
      }

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: '',
      };
      setMessages((prev) => [...prev, assistantMessage]);

      let totalContent = '';
      let usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number } | undefined;
      let headers;

      for await (const { chunk, usage: chunkUsage, headers: chunkHeaders } of provider.chatStream({
        model: selectedModel,
        messages: requestMessages,
        venice_parameters: params,
        stream: true,
        stream_options: { include_usage: true },
        temperature: chatParameters.temperature,
        max_tokens: chatParameters.max_tokens,
        top_p: chatParameters.top_p,
        frequency_penalty: chatParameters.frequency_penalty,
        presence_penalty: chatParameters.presence_penalty,
      })) {
        totalContent += chunk;
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            role: 'assistant',
            content: totalContent,
          };
          return newMessages;
        });

        if (chunkUsage) {
          usage = chunkUsage;
        }
        if (chunkHeaders) {
          headers = chunkHeaders;
        }
      }

      // Add stats
      addStats({
        requestId: headers?.cfRay,
        modelId: selectedModel,
        promptTokens: usage?.prompt_tokens,
        completionTokens: usage?.completion_tokens,
        totalTokens: usage?.total_tokens,
        deprecationWarning: headers?.veniceModelDeprecationWarning,
        deprecationDate: headers?.veniceModelDeprecationDate,
        headers,
        timestamp: Date.now(),
      });

    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: 'assistant',
          content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearConversation = () => {
    setMessages([]);
  };

  const chatModels = getChatModels();

  return (
    <div className="flex flex-col h-full">
      {/* Header with Model Selector */}
      <div className="border-b border-gray-700 p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!provider}
            >
              {chatModels.length > 0 ? (
                chatModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name || model.id}
                    {model.context_length ? ` (${(model.context_length / 1000).toFixed(0)}k)` : ''}
                  </option>
                ))
              ) : (
                <option value={selectedModel}>{selectedModel}</option>
              )}
            </select>
          </div>

          {showAdvanced && (
            <>
              <div className="w-32">
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Temperature
                </label>
                <input
                  type="number"
                  value={chatParameters.temperature}
                  onChange={(e) => setChatParameters({ temperature: parseFloat(e.target.value) })}
                  min={0}
                  max={2}
                  step={0.1}
                  className="w-full px-2 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="w-32">
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Max Tokens
                </label>
                <input
                  type="number"
                  value={chatParameters.max_tokens || ''}
                  onChange={(e) => setChatParameters({ max_tokens: e.target.value ? parseInt(e.target.value) : undefined })}
                  placeholder="Auto"
                  className="w-full px-2 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="w-28">
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Top P
                </label>
                <input
                  type="number"
                  value={chatParameters.top_p}
                  onChange={(e) => setChatParameters({ top_p: parseFloat(e.target.value) })}
                  min={0}
                  max={1}
                  step={0.1}
                  className="w-full px-2 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="w-32">
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Freq Penalty
                </label>
                <input
                  type="number"
                  value={chatParameters.frequency_penalty}
                  onChange={(e) => setChatParameters({ frequency_penalty: parseFloat(e.target.value) })}
                  min={-2}
                  max={2}
                  step={0.1}
                  className="w-full px-2 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="w-32">
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Pres Penalty
                </label>
                <input
                  type="number"
                  value={chatParameters.presence_penalty}
                  onChange={(e) => setChatParameters({ presence_penalty: parseFloat(e.target.value) })}
                  min={-2}
                  max={2}
                  step={0.1}
                  className="w-full px-2 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          <div className="ml-auto">
            <button
              onClick={clearConversation}
              disabled={messages.length === 0}
              className="px-3 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed transition-colors text-sm"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            <p className="text-lg">Start a conversation</p>
            <p className="text-sm mt-2">Type a message below to begin</p>
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : message.role === 'system'
                  ? 'bg-gray-700 text-gray-300 text-sm'
                  : 'bg-gray-700 text-white'
              }`}
            >
              <div className="whitespace-pre-wrap break-words">{message.content}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-700 p-4">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isLoading || !provider}
            rows={3}
            className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !provider || !input.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors self-end"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
        {!provider && (
          <p className="text-red-400 text-sm mt-2">
            Please configure your API key in Settings
          </p>
        )}
      </div>
    </div>
  );
};
