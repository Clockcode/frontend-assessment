'use client';

import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { formatPokemonName } from '@/lib/pokemon-utils';

interface PokemonStatsProps {
  isLoading: boolean;
  stats?: Array<{
    stat: { name: string };
    base_stat: number;
  }>;
}

export function PokemonStats({ isLoading, stats }: PokemonStatsProps) {
  if (isLoading) {
    return (
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Base Stats</h3>
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats || stats.length === 0) {
    return (
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Base Stats</h3>
        <div className="text-center text-gray-500 py-8">
          No stats available for this Pokémon.
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Base Stats</h3>
      <div className="space-y-4">
        {stats.map((stat, index) => {
          const statName = formatPokemonName(stat.stat.name);
          const progressValue = (stat.base_stat / 255) * 100;

          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700 capitalize">
                  {statName}
                </span>
                <span className="font-bold text-gray-800">
                  {stat.base_stat}
                </span>
              </div>
              <Progress
                value={progressValue}
                className="h-4 bg-gray-200"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
