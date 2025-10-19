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
        <div className="h-full w-full bg-white relative p-5">

          {/* Chart area with exact margins matching BarChart */}
          <div
            className="absolute bg-white"
            style={{
              top: '20px',
              right: '80px',
              left: '80px',
              bottom: '60px'
            }}
          >
            {/* Grid lines - thinner with proper margins */}
            <div
              className="h-4/6 flex flex-col justify-between"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="border-t border-gray-200" style={{ height: '0.5px' }} />
              ))}
            </div>
          </div>

          {/* Legend skeleton - positioned below the chart area, smaller elements */}
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400"></div>
              <Skeleton className="h-2 w-12" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400"></div>
              <Skeleton className="h-2 w-16" />
            </div>
          </div>
        </div>
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
