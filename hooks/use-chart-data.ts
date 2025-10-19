import { useMemo } from 'react';

interface ChartDataPoint {
  name: string;
  base: number;
  modified: number;
  effect: string;
}

interface UseChartDataProps {
  modifiedStats: Array<{
    name: string;
    base: number;
    modified: number;
    effect: string;
  }>;
  selectedAbility: string;
}

export function useChartData({ modifiedStats, selectedAbility }: UseChartDataProps) {
  // Process chart data for Recharts
  const chartData: ChartDataPoint[] = useMemo(() => {
    if (!modifiedStats || modifiedStats.length === 0) return [];

    return modifiedStats.map(stat => ({
      name: stat.name,
      base: stat.base,
      modified: stat.modified,
      effect: stat.effect
    }));
  }, [modifiedStats]);

  // Calculate chart statistics
  const chartStats = useMemo(() => {
    if (!chartData.length) {
      return {
        baseTotal: 0,
        modifiedTotal: 0,
        netChange: 0,
        maxValue: 0
      };
    }

    const baseTotal = chartData.reduce((sum, point) => sum + point.base, 0);
    const modifiedTotal = chartData.reduce((sum, point) => sum + point.modified, 0);
    const netChange = modifiedTotal - baseTotal;
    const maxValue = Math.max(
      ...chartData.map(point => Math.max(point.base, point.modified))
    );

    return {
      baseTotal,
      modifiedTotal,
      netChange,
      maxValue
    };
  }, [chartData]);

  return {
    chartData,
    chartStats,
    selectedAbility
  };
}
