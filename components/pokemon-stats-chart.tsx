'use client';

import { AbilitySelector } from '@/components/ability-selector';
import { StatsChart } from '@/components/stats-chart';
import { StatsSummaryCards } from '@/components/stats-summary-cards';
import { useAbilityStats } from '@/hooks/use-ability-stats';
import { BarChart3 } from 'lucide-react';

interface PokemonStatsChartProps {
  isLoading: boolean;
  abilities?: Array<{
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  }>;
  stats?: Array<{
    stat: { name: string };
    base_stat: number;
  }>;
}

export function PokemonStatsChart({ isLoading, abilities, stats }: PokemonStatsChartProps) {
  const {
    selectedAbility,
    setSelectedAbility,
    modifiedStats,
    abilities: availableAbilities
  } = useAbilityStats(abilities, stats);


  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-blue-600" />
        Base Stats vs Ability Effects
      </h3>

      <AbilitySelector
        isLoading={isLoading}
        abilities={availableAbilities}
        selectedAbility={selectedAbility}
        onSelectAbility={setSelectedAbility}
      />

      <StatsChart
        isLoading={isLoading}
        data={modifiedStats}
        selectedAbility={selectedAbility}
      />

      <StatsSummaryCards
        isLoading={isLoading}
      />

      <div className="text-sm text-gray-600">
        <p className="font-medium mb-1">Note:</p>
        <p className="mb-2">
          Ability effects shown are theoretical maximums and may depend on battle conditions, status effects, weather, or other factors not represented in this chart.
        </p>
        <p>
          Hover over bars to see detailed stat information and ability effects.
        </p>
      </div>
    </div>
  );
}