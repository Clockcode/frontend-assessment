import { getPokemonDetails } from '@/lib/api';
import { Pokemon } from '@/types/pokemon';
import { useQuery } from './use-query';

export function usePokemonDetails(id: string | number | null) {
  const { data, isLoading, error } = useQuery<Pokemon | null>(
    'pokemon',
    id ? String(id) : null,
    async (pokemonId) => {
      const result = await getPokemonDetails(pokemonId);
      return result;
    },
  );

  return {
    pokemon: data,
    isLoading,
    error,
  };
}
