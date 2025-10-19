'use client';

import { Skeleton } from '@/components/ui/skeleton';

interface StatsSummaryCardsProps {
  isLoading?: boolean;
  baseTotal?: number;
  modifiedTotal?: number;
  netChange?: number;
}

export function StatsSummaryCards({
  isLoading,
  baseTotal,
  modifiedTotal,
  netChange
}: StatsSummaryCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <Skeleton className="h-4 w-16 mb-1" />
          <Skeleton className="h-8 w-12" />
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <Skeleton className="h-4 w-20 mb-1" />
          <Skeleton className="h-8 w-12" />
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <Skeleton className="h-4 w-16 mb-1" />
          <Skeleton className="h-8 w-12" />
        </div>
      </div>
    );
  }

  const calculatedNetChange = netChange ?? ((modifiedTotal || 0) - (baseTotal || 0));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="text-sm font-medium text-blue-700 mb-1">Base Total</div>
        <div className="text-2xl font-bold text-blue-800">{baseTotal || 0}</div>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="text-sm font-medium text-purple-700 mb-1">Modified Total</div>
        <div className="text-2xl font-bold text-purple-800">{modifiedTotal || 0}</div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="text-sm font-medium text-gray-700 mb-1">Net Change</div>
        <div className={`text-2xl font-bold ${calculatedNetChange > 0 ? 'text-green-600' : calculatedNetChange < 0 ? 'text-red-600' : 'text-gray-800'}`}>
          {calculatedNetChange > 0 ? '+' : ''}{calculatedNetChange}
        </div>
      </div>
    </div>
  );
}
