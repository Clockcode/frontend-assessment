'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { formatPokemonHeight, formatPokemonWeight } from '@/lib/pokemon-utils';

interface PokemonPhysicalStatsProps {
  isLoading: boolean;
  height?: number;
  weight?: number;
}

export function PokemonPhysicalStats({ isLoading, height, weight }: PokemonPhysicalStatsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-8 my-16">
      <div className="text-center flex-1">
        <div className="text-sm text-muted-foreground mb-1">Height</div>
        {isLoading ? (
          <Skeleton className="h-8 w-20 mx-auto" />
        ) : (
          <div className="text-2xl font-bold text-gray-800">
            {formatPokemonHeight(height)}
          </div>
        )}
      </div>
      <div className="text-center flex-1">
        <div className="text-sm text-muted-foreground mb-1">Weight</div>
        {isLoading ? (
          <Skeleton className="h-8 w-20 mx-auto" />
        ) : (
          <div className="text-2xl font-bold text-gray-800">
            {formatPokemonWeight(weight)}
          </div>
        )}
      </div>
    </div>
  );
}
