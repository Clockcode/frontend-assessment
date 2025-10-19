'use client';

import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

interface PokemonImageProps {
  isLoading: boolean;
  name?: string;
  imageUrl?: string;
}

export function PokemonImage({ isLoading, name, imageUrl }: PokemonImageProps) {
  return (
    <div className="text-center mb-8">
      {isLoading ? (
        <Skeleton className="h-48 w-48 sm:h-64 sm:w-64 mx-auto rounded-full" />
      ) : (
        <div className="relative mx-auto w-48 h-48 sm:w-64 sm:h-64 mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full" />
          <Image
            src={imageUrl || '/placeholder-pokemon.png'}
            alt={`${name || 'Pokemon'} official artwork`}
            fill
            className="object-contain relative z-10"
            priority
            sizes="(max-width: 320px) 192px, (max-width: 768px) 256px, (max-width: 1200px) 256px, 256px"
          />
        </div>
      )}
    </div>
  );
}
