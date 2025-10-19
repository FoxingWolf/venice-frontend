import React from 'react';
import { useAppStore } from '@/stores/appStore';

export const VeniceParametersPanel: React.FC = () => {
  const { veniceParameters, setVeniceParameters, showAdvanced } = useAppStore();

  if (!showAdvanced) return null;

  return (
    <div className="p-2 border-t border-gray-700 space-y-2">
      <div className="text-xs font-semibold text-gray-400 mb-2">Venice Parameters</div>

      {/* Web Search */}
      <div>
        <label className="flex items-center justify-between text-sm text-gray-300 cursor-pointer">
          <span>Web Search</span>
          <select
            value={veniceParameters.enable_web_search || 'auto'}
            onChange={(e) =>
              setVeniceParameters({
                enable_web_search: e.target.value as 'auto' | 'always' | 'never',
              })
            }
            className="ml-2 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-xs text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <option value="auto">Auto</option>
            <option value="always">Always</option>
            <option value="never">Never</option>
          </select>
        </label>
      </div>

      {/* Web Citations */}
      <div>
        <label className="flex items-center text-sm text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={veniceParameters.enable_web_citations || false}
            onChange={(e) =>
              setVeniceParameters({ enable_web_citations: e.target.checked })
            }
            className="mr-2"
          />
          <span>Web Citations</span>
        </label>
      </div>

      {/* Web Scraping */}
      <div>
        <label className="flex items-center text-sm text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={veniceParameters.enable_web_scraping || false}
            onChange={(e) =>
              setVeniceParameters({ enable_web_scraping: e.target.checked })
            }
            className="mr-2"
          />
          <span>Web Scraping</span>
        </label>
      </div>

      {/* Venice System Prompt */}
      <div>
        <label className="flex items-center text-sm text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={veniceParameters.include_venice_system_prompt !== false}
            onChange={(e) =>
              setVeniceParameters({
                include_venice_system_prompt: e.target.checked,
              })
            }
            className="mr-2"
          />
          <span>Venice System Prompt</span>
        </label>
      </div>

      {/* Disable Thinking */}
      <div>
        <label className="flex items-center text-sm text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={veniceParameters.disable_thinking || false}
            onChange={(e) =>
              setVeniceParameters({ disable_thinking: e.target.checked })
            }
            className="mr-2"
          />
          <span>Disable Thinking</span>
        </label>
      </div>

      {/* Strip Thinking Response */}
      <div>
        <label className="flex items-center text-sm text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={veniceParameters.strip_thinking_response || false}
            onChange={(e) =>
              setVeniceParameters({ strip_thinking_response: e.target.checked })
            }
            className="mr-2"
          />
          <span>Strip Thinking Response</span>
        </label>
      </div>
    </div>
  );
};
