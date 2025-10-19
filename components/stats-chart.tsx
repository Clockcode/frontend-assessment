'use client';

import { Skeleton } from '@/components/ui/skeleton';

interface ChartDataPoint {
  name: string;
  base: number;
  modified: number;
  effect: string;
}

interface StatsChartProps {
  isLoading?: boolean;
  data?: ChartDataPoint[];
  selectedAbility?: string;
}

export function StatsChart({
  isLoading,
  data,
  selectedAbility
}: StatsChartProps) {
  if (isLoading) {
    return (
      <div className="mb-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="mb-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="h-64 w-full flex items-center justify-center text-gray-500">
            No chart data available
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="h-64 w-full flex items-center justify-center text-gray-500">
          Chart will be rendered here
        </div>
        <div className="text-xs text-gray-400 mt-2 text-center">
          Data points: {data.length} | Selected ability: {selectedAbility || 'None'}
        </div>
      </div>
    </div>
  );
}
