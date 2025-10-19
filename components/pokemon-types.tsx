'use client';

import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { formatPokemonName, getTypeColor } from '@/lib/pokemon-utils';

interface PokemonTypesProps {
  isLoading: boolean;
  types?: Array<{ type: { name: string } }>;
}

export function PokemonTypes({ isLoading, types }: PokemonTypesProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center gap-3 mb-8">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
    );
  }

  if (!types || types.length === 0) {
    return null;
  }

  return (
    <div className="flex justify-center gap-3 mb-8">
      {types.map((type, index) => (
        <Badge
          key={index}
          className="text-base font-medium text-white px-4 py-3 rounded-full"
          style={{
            backgroundColor: getTypeColor(type.type.name),
          }}
        >
          {formatPokemonName(type.type.name)}
        </Badge>
      ))}
    </div>
  );
}
