
import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  kpi: { label: string; value: string | number } | null;
  open: boolean;
  onClose: () => void;
};

export default function DrilldownModal({ kpi, open, onClose }: Props) {
  if (!open || !kpi) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-6 animate-fade-in relative">
        <button
          className="absolute top-3 right-3 text-muted-foreground"
          onClick={onClose}
          aria-label="Close"
        >✖</button>
        <h4 className="text-lg font-semibold mb-3">
          {kpi.label} - Drill Down
        </h4>
        <div className="mb-4 text-sm">
          <p className="mb-2">Current value: <span className="font-bold">{kpi.value}</span></p>
          <div>
            <span className="block mb-1 font-medium">Sample Trend (Past Months):</span>
            <ul className="pl-3 list-disc space-y-1">
              <li>April: 1000</li>
              <li>May: 1050</li>
              <li>June: 1200</li>
            </ul>
          </div>
        </div>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}
