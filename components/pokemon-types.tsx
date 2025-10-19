'use client';

import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { formatPokemonName, getTypeColor } from '@/lib/pokemon-utils';

interface PokemonTypesProps {
  isLoading: boolean;
  types?: Array<{ type: { name: string } }>;
  size?: 'sm' | 'lg';
  className?: string;
}

export function PokemonTypes({
  isLoading,
  types,
  size = 'lg',
  className = ''
}: PokemonTypesProps) {
  const sizeClasses = {
    sm: 'text-xs font-medium text-white',
    lg: 'text-base px-4 py-2 text-white font-medium'
  };

  const skeletonClasses = {
    sm: 'h-6 w-16 rounded-full',
    lg: 'h-8 w-20 rounded-full'
  };

  if (isLoading) {
    return (
      <div className="flex justify-center gap-3 flex-wrap">
        <Skeleton className={skeletonClasses[size]} />
        <Skeleton className={skeletonClasses[size]} />
      </div>
    );
  }

  if (!types || types.length === 0) {
    return null;
  }

  return (
    <div className={`flex justify-center gap-3 flex-wrap ${className}`}>
      {types.map((type, index) => (
        <Badge
          key={index}
          className={`${sizeClasses[size]} transition-transform duration-200 hover:scale-105`}
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
