
import React from "react";

type KpiWidgetProps = {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
};

export default function KpiWidget({ label, value, icon, color }: KpiWidgetProps) {
  return (
    <div
      className={`rounded-lg shadow-sm bg-white flex flex-col gap-1 p-4 border border-muted min-w-[160px]`}
    >
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
    </div>
  );
}
