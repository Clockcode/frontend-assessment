import { calculateAbilityEffect } from '@/lib/abilityEffects';
import { useEffect, useMemo, useState } from 'react';

interface ModifiedStat {
  name: string;
  base: number;
  modified: number;
  effect: string;
}

export function useAbilityStats(
  abilities?: Array<{
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  }>,
  stats?: Array<{
    stat: { name: string };
    base_stat: number;
  }>
) {
  const [selectedAbility, setSelectedAbility] = useState<string>('');

  // Auto-select first ability when data loads
  useEffect(() => {
    if (abilities && abilities.length > 0 && !selectedAbility) {
      setSelectedAbility(abilities[0].ability.name);
    }
  }, [abilities, selectedAbility]);

  // Calculate modified stats for selected ability
  const modifiedStats: ModifiedStat[] = useMemo(() => {
    if (!stats || !selectedAbility) return [];

    return stats.map(stat => {
      const { modified, effect } = calculateAbilityEffect(
        selectedAbility,
        stat.stat.name,
        stat.base_stat
      );

      return {
        name: stat.stat.name,
        base: stat.base_stat,
        modified,
        effect
      };
    });
  }, [stats, selectedAbility]);

  return {
    selectedAbility,
    setSelectedAbility,
    modifiedStats,
    abilities
  };
}
