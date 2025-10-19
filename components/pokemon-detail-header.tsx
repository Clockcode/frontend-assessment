'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PokemonDetailHeaderProps {
  isLoading: boolean;
  pokemonName?: string;
  pokemonId?: string;
}

export function PokemonDetailHeader({ isLoading, pokemonName, pokemonId }: PokemonDetailHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">⚡</span>
            {isLoading ? (
              <>
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-6 w-12 flex items-center" />
              </>
            ) : pokemonName && pokemonId ? (
              <>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-3xl font-bold">
                  {pokemonName}
                </span>
                <span className="text-lg font-normal text-muted-foreground flex items-center">
                  {pokemonId}
                </span>
              </>
            ) : (
              <>
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-6 w-12 flex items-center" />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
