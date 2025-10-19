'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { calculateAbilityEffect } from '@/lib/abilityEffects';
import { formatPokemonName } from '@/lib/pokemon-utils';
import { Zap } from 'lucide-react';

interface AbilitySelectorProps {
  isLoading?: boolean;
  abilities?: Array<{
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  }>;
  selectedAbility: string;
  onSelectAbility: (abilityName: string) => void;
}

function getAbilityDescription(abilityName: string): string {
  const { effect } = calculateAbilityEffect(abilityName, 'attack', 100);

  if (effect === 'No stat modification from this ability') {
    const { effect: speedEffect } = calculateAbilityEffect(abilityName, 'speed', 100);
    if (speedEffect !== 'No stat modification from this ability') {
      return speedEffect;
    }

    const { effect: defenseEffect } = calculateAbilityEffect(abilityName, 'defense', 100);
    if (defenseEffect !== 'No stat modification from this ability') {
      return defenseEffect;
    }
  }

  return effect;
}

export function AbilitySelector({
  isLoading,
  abilities,
  selectedAbility,
  onSelectAbility
}: AbilitySelectorProps) {
  if (isLoading) {
    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-medium text-gray-700">Select Ability</span>
        </div>
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
          <Skeleton className="h-5 w-24 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!abilities || abilities.length === 0) {
    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-medium text-gray-700">Select Ability</span>
        </div>
        <div className="text-center text-gray-500 py-4">
          No abilities available for this Pokémon.
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="h-4 w-4 text-yellow-500" />
        <span className="text-sm font-medium text-gray-700">Select Ability</span>
      </div>

      {/* Ability Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {abilities.map((ability, index) => {
          const abilityName = ability.ability.name;
          const formattedName = formatPokemonName(abilityName);
          const isSelected = selectedAbility === abilityName;

          return (
            <div key={index} className="flex items-center gap-2">
              <Button
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => onSelectAbility(abilityName)}
                className="flex items-center gap-2"
              >
                {formattedName}
                {ability.is_hidden && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    Hidden
                  </Badge>
                )}
              </Button>
            </div>
          );
        })}
      </div>

      {/* Selected Ability Description */}
      {selectedAbility && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2">
            {formatPokemonName(selectedAbility)}
          </h4>
          <p className="text-sm text-gray-600">
            {getAbilityDescription(selectedAbility)}
          </p>
        </div>
      )}
    </div>
  );
}