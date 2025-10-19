'use client';

export const CustomLegend = () => {
  return (
    <div className="flex justify-center gap-6 mt-8">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-blue-500"></div>
        <span className="text-sm font-medium text-blue-500">Base Stat</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-purple-500"></div>
        <span className="text-sm font-medium text-purple-500">Ability Modified</span>
      </div>
    </div>
  );
};
