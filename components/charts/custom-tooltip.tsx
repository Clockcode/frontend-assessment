'use client';

import { formatPokemonName } from '@/lib/pokemon-utils';
import { Info } from 'lucide-react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    payload: {
      effect: string;
    };
  }>;
  label?: string;
}

export const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const baseValue = payload.find((p) => p.dataKey === 'base')?.value || 0;
    const modifiedValue = payload.find((p) => p.dataKey === 'modified')?.value || 0;
    const effect = payload[0]?.payload?.effect || '';

    // Calculate change amount and percentage
    const changeAmount = modifiedValue - baseValue;
    const changePercentage = baseValue > 0 ? ((changeAmount / baseValue) * 100).toFixed(1) : '0.0';
    const hasChange = changeAmount !== 0;

    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        {/* Stat Name Header */}
        <div className="font-semibold text-gray-800 mb-2">
          {formatPokemonName(label || '')}
        </div>

        {/* Base Value */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-blue-600 text-sm">Base:</span>
          <span className="font-medium text-gray-800">{baseValue}</span>
        </div>

        {/* Modified Value */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-purple-600 text-sm">Modified:</span>
          <span className="font-medium text-gray-800">{modifiedValue}</span>
        </div>

        {/* Change Amount and Percentage */}
        {hasChange && (
          <div className="flex items-center justify-between mb-1">
            <span className="text-gray-600 text-sm">Change:</span>
            <span className={`font-medium ${changeAmount > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {changeAmount > 0 ? '+' : ''}{changeAmount} ({changeAmount > 0 ? '+' : ''}{changePercentage}%)
            </span>
          </div>
        )}

        {/* Ability Effect Description */}
        {effect && effect !== 'No stat modification from this ability' && (
          <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
            <Info className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <p className="text-xs text-gray-600">{effect}</p>
          </div>
        )}
      </div>
    );
  }
  return null;
};
