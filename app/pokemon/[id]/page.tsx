'use client';

import { PokemonAbilities } from '@/components/pokemon-abilities';
import { PokemonDetailHeader } from '@/components/pokemon-detail-header';
import { PokemonImage } from '@/components/pokemon-image';
import { PokemonPhysicalStats } from '@/components/pokemon-physical-stats';
import { PokemonStats } from '@/components/pokemon-stats';
import { PokemonTypes } from '@/components/pokemon-types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePokemonDetails } from '@/hooks/use-pokemon-details';
import { formatPokemonName } from '@/lib/pokemon-utils';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useEffect } from 'react';

interface PokemonDetailPageProps {
  params: {
    id: string;
  };
}


export default function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  const { pokemon, isLoading, error } = usePokemonDetails(params.id);

  useEffect(() => {
    if (!isLoading && !error && pokemon === null) {
      notFound();
    }
  }, [isLoading, error, pokemon]);

  const pokemonName = pokemon?.name ? formatPokemonName(pokemon.name) : undefined;
  const pokemonId = pokemon?.id ? `#${pokemon.id.toString().padStart(3, '0')}` : undefined;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Failed to load Pokémon
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {error.message || 'An unexpected error occurred while loading the Pokémon details.'}
              </AlertDescription>
            </Alert>
            <div className="pt-4 space-y-2">
              <Button
                onClick={() => window.location.reload()}
                className="w-full"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Pokédex
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <PokemonDetailHeader
        isLoading={isLoading}
        pokemonName={pokemonName}
        pokemonId={pokemonId}
      />

      <main className="max-w-4xl mx-auto p-4">
        <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-2xl border border-gray-200 shadow-sm p-8">
          <PokemonImage
            isLoading={isLoading}
            name={pokemonName}
            imageUrl={pokemon?.sprites?.other?.['official-artwork']?.front_default}
          />

          <PokemonPhysicalStats
            isLoading={isLoading}
            height={pokemon?.height}
            weight={pokemon?.weight}
          />

          <PokemonTypes
            isLoading={isLoading}
            types={pokemon?.types}
          />

          <PokemonAbilities
            isLoading={isLoading}
            abilities={pokemon?.abilities}
          />

          <PokemonStats
            isLoading={isLoading}
            stats={pokemon?.stats}
          />
        </div>
      </main>
    </div>
  );
}