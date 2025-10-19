'use client';

import { Badge } from '@/components/ui/badge';
import { formatPokemonName } from '@/lib/pokemon-utils';

interface AbilityBadgeProps {
  abilityName: string;
  isHidden?: boolean;
  variant?: 'default' | 'compact' | 'more';
  className?: string;
}

export function AbilityBadge({
  abilityName,
  isHidden = false,
  variant = 'default',
  className = ''
}: AbilityBadgeProps) {
  const formattedName = formatPokemonName(abilityName);

  if (variant === 'more') {
    return (
      <Badge
        variant="outline"
        className={`text-xs border-gray-300 text-black bg-white ${className}`}
      >
        {formattedName}
      </Badge>
    );
  }

  if (variant === 'compact') {
    return (
      <Badge
        variant="outline"
        className={`text-xs border-gray-300 text-black bg-white hover:border-blue-400 hover:text-blue-600 transition-colors duration-200 ${className}`}
      >
        {formattedName}
      </Badge>
    );
  }

  // Default variant for detailed view
  return (
    <Badge
      variant={isHidden ? "destructive" : "default"}
      className={`text-sm px-3 py-1 ${className}`}
    >
      {formattedName}
    </Badge>
  );
}
