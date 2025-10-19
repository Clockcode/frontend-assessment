'use client';

import { AbilityBadge } from '@/components/ability-badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatPokemonName, getPokemonImageUrl } from '@/lib/pokemon-utils';
import { Pokemon } from '@/types/pokemon';
import Image from 'next/image';
import { useState } from 'react';
import { PokemonTypes } from './pokemon-types';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon) => void;
}

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <Card
      className="group transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 border-0 bg-white/90 backdrop-blur-sm overflow-hidden cursor-pointer"
      onClick={() => onClick(pokemon)}
    >
      <CardContent className="p-6">
        <div className="text-center">
          {/* Pokemon ID */}
          <div className="text-sm font-medium text-muted-foreground mb-2">
            #{pokemon.id.toString().padStart(3, '0')}
          </div>

          {/* Pokemon Image */}
          <div className="relative w-32 h-32 mx-auto mb-4">
            {!imageLoaded && (
              <Skeleton className="absolute inset-0 rounded-full" />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
            {!imageError ? (
              <Image
                src={getPokemonImageUrl(pokemon.id)}
                alt={formatPokemonName(pokemon.name)}
                fill
                loading="lazy"
                unoptimized
                className={`object-contain transition-all duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                } group-hover:scale-110`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-6xl">
                🎯
              </div>
            )}
          </div>

          {/* Pokemon Name */}
          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-200">
            {formatPokemonName(pokemon.name)}
          </h3>

          {/* Type Badges */}
          {pokemon.types && pokemon.types.length > 0 && (
            <PokemonTypes
              isLoading={false}
              types={pokemon.types}
              size="sm"
            />
          )}

          {/* Ability Badges */}
          {pokemon.abilities && pokemon.abilities.length > 0 && (
            <div className="mt-4">
              <div className="text-sm font-medium text-gray-600 mb-2">Abilities</div>
              <div className="flex flex-wrap gap-1 justify-center">
                {pokemon.abilities.slice(0, 2).map((ability, index) => (
                  <AbilityBadge
                    key={index}
                    abilityName={ability.ability.name}
                    isHidden={ability.is_hidden}
                    variant="compact"
                  />
                ))}
                {pokemon.abilities.length > 2 && (
                  <AbilityBadge
                    abilityName={`+${pokemon.abilities.length - 2} more`}
                    variant="more"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}