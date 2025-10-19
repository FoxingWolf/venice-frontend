import React from 'react';
import { useAppStore } from '@/stores/appStore';

export const StatsPanel: React.FC = () => {
  const stats = useAppStore((state) => state.stats);
  const latestStats = stats[stats.length - 1];

  if (!latestStats) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 text-sm">
        <h3 className="text-white font-semibold mb-2">Stats</h3>
        <p className="text-gray-400">No requests yet</p>
      </div>
    );
  }

  const headers = latestStats.headers || {};

  return (
    <div className="bg-gray-800 rounded-lg p-4 text-sm space-y-3">
      <h3 className="text-white font-semibold mb-2">Stats</h3>

      {/* Request Info */}
      <div className="space-y-1">
        <div className="text-gray-400">
          Request ID: <span className="text-white">{headers.cfRay || 'N/A'}</span>
        </div>
        <div className="text-gray-400">
          Model: <span className="text-white">{latestStats.modelId || 'N/A'}</span>
        </div>
      </div>

      {/* Token Usage */}
      {latestStats.totalTokens && (
        <div className="border-t border-gray-700 pt-3 space-y-1">
          <div className="text-gray-400 font-semibold">Token Usage</div>
          <div className="text-gray-400">
            Prompt: <span className="text-white">{latestStats.promptTokens || 0}</span>
          </div>
          <div className="text-gray-400">
            Completion: <span className="text-white">{latestStats.completionTokens || 0}</span>
          </div>
          <div className="text-gray-400">
            Total: <span className="text-white">{latestStats.totalTokens}</span>
          </div>
          {latestStats.contextLimit && (
            <div className="text-gray-400">
              Context Limit: <span className="text-white">{latestStats.contextLimit.toLocaleString()}</span>
            </div>
          )}
        </div>
      )}

      {/* Rate Limits */}
      {(headers.rateLimitRemainingRequests !== undefined || headers.rateLimitRemainingTokens !== undefined) && (
        <div className="border-t border-gray-700 pt-3 space-y-1">
          <div className="text-gray-400 font-semibold">Rate Limits</div>
          {headers.rateLimitRemainingRequests !== undefined && (
            <div className="text-gray-400">
              Remaining Requests: <span className="text-white">{headers.rateLimitRemainingRequests}</span>
            </div>
          )}
          {headers.rateLimitRemainingTokens !== undefined && (
            <div className="text-gray-400">
              Remaining Tokens: <span className="text-white">{headers.rateLimitRemainingTokens.toLocaleString()}</span>
            </div>
          )}
        </div>
      )}

      {/* Balances */}
      {(headers.veniceBalanceUsd !== undefined || headers.veniceBalanceDiem !== undefined) && (
        <div className="border-t border-gray-700 pt-3 space-y-1">
          <div className="text-gray-400 font-semibold">Balances</div>
          {headers.veniceBalanceUsd !== undefined && (
            <div className="text-gray-400">
              USD: <span className="text-green-400">${headers.veniceBalanceUsd.toFixed(2)}</span>
            </div>
          )}
          {headers.veniceBalanceDiem !== undefined && (
            <div className="text-gray-400">
              DIEM: <span className="text-green-400">{headers.veniceBalanceDiem.toFixed(2)}</span>
            </div>
          )}
        </div>
      )}

      {/* Deprecation Warning */}
      {latestStats.deprecationWarning && (
        <div className="border-t border-gray-700 pt-3">
          <div className="bg-yellow-900/30 border border-yellow-600 rounded p-2">
            <div className="text-yellow-400 font-semibold text-xs">⚠️ Deprecation Warning</div>
            <div className="text-yellow-300 text-xs mt-1">{latestStats.deprecationWarning}</div>
            {latestStats.deprecationDate && (
              <div className="text-yellow-400 text-xs mt-1">Date: {latestStats.deprecationDate}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
