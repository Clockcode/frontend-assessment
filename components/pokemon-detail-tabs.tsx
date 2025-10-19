'use client';

import { PokemonAbilities } from '@/components/pokemon-abilities';
import { PokemonStats } from '@/components/pokemon-stats';
import { PokemonStatsChart } from '@/components/pokemon-stats-chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, TrendingUp } from 'lucide-react';

interface PokemonDetailTabsProps {
  isLoading: boolean;
  abilities?: Array<{
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  }>;
  stats?: Array<{
    stat: { name: string };
    base_stat: number;
  }>;
}

export function PokemonDetailTabs({ isLoading, abilities, stats }: PokemonDetailTabsProps) {
  return (
    <div className="mt-8">
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100">
          <TabsTrigger
            value="details"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Info className="h-4 w-4" />
            Details
          </TabsTrigger>
          <TabsTrigger
            value="stats"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <TrendingUp className="h-4 w-4" />
            Stats Chart
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <div className="space-y-8">
            <PokemonAbilities
              isLoading={isLoading}
              abilities={abilities}
            />

            <PokemonStats
              isLoading={isLoading}
              stats={stats}
            />
          </div>
        </TabsContent>

        <TabsContent value="stats" className="mt-6">
          <PokemonStatsChart />
        </TabsContent>
      </Tabs>
    </div>
  );
}
