'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { formatPokemonName } from '@/lib/pokemon-utils';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { CustomLegend } from './custom-legend';
import { CustomTooltip } from './custom-tooltip';

interface ChartDataPoint {
  name: string;
  base: number;
  modified: number;
  effect: string;
}

interface StatsChartProps {
  isLoading?: boolean;
  data?: ChartDataPoint[];
}

export function StatsChart({
  isLoading,
  data
}: StatsChartProps) {
  if (isLoading) {
    return (
      <div className="h-80 w-full">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-80 w-full flex items-center justify-center text-gray-500">
        No chart data available
      </div>
    );
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 60,
          }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={{ stroke: '#374151' }}
            tickLine={{ stroke: '#374151' }}
            angle={-45}
            textAnchor="end"
            height={60}
            tickFormatter={(value) => formatPokemonName(value)}
          />
          <YAxis
            domain={[0, 200]}
            ticks={[0, 50, 100, 150, 200]}
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={{ stroke: '#374151' }}
            tickLine={{ stroke: '#374151' }}
            tickFormatter={(value) => value.toString()}
            label={{ value: 'Stat Value', angle: -90, position: 'insideLeft', offset: -5, style: { textAnchor: 'middle', fill: '#374151', fontSize: 14 } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
          <Bar
            dataKey="base"
            name="Base Stat"
            fill="#3B82F6"
            radius={[2, 2, 0, 0]}
          />
          <Bar
            dataKey="modified"
            name="Ability Modified"
            fill="#8B5CF6"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
