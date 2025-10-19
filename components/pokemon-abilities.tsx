'use client';

import { AbilityBadge } from '@/components/ability-badge';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAbilityDetails } from '@/hooks/use-ability-details';
import { formatPokemonName } from '@/lib/pokemon-utils';
import { AlertCircle, Info } from 'lucide-react';

interface PokemonAbilitiesProps {
  isLoading: boolean;
  abilities?: Array<{
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  }>;
}

export function PokemonAbilities({ isLoading, abilities }: PokemonAbilitiesProps) {
  if (isLoading) {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Abilities</h3>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-4 w-12 rounded-full" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!abilities || abilities.length === 0) {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Abilities</h3>
        <div className="text-center text-gray-500 py-8">
          No abilities available for this Pokémon.
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Abilities</h3>
      <div className="space-y-4">
        {abilities.map((ability, index) => (
          <AbilityCard
            key={index}
            ability={ability}
          />
        ))}
      </div>
    </div>
  );
}

interface AbilityCardProps {
  ability: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  };
}

function AbilityCard({ ability }: AbilityCardProps) {
  const { ability: abilityData, isLoading, error } = useAbilityDetails(ability.ability.name);
  const abilityName = formatPokemonName(ability.ability.name);

  return (
    <div className="space-y-3">
      {/* Ability badges */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AbilityBadge
            abilityName={ability.ability.name}
            isHidden={ability.is_hidden}
            variant="default"
          />
          {ability.is_hidden && (
            <Badge variant="outline" className="text-sm px-3 py-1">
              Hidden
            </Badge>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 text-amber-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>Unable to load ability details</span>
          </div>
        ) : abilityData?.effect_entries && abilityData.effect_entries.length > 0 ? (
          <div className="text-sm text-gray-700 leading-relaxed">
            {abilityData.effect_entries
              .find(entry => entry.language.name === 'en')
              ?.effect || 'No description available'}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Info className="h-4 w-4" />
            <span>No description available</span>
          </div>
        )}
      </div>
    </div>
  );
}
