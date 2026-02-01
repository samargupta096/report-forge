
import React from "react";
import { Button } from "@/components/ui/button";

type Schedule = { reportName: string; frequency: string; at: string };
const FREQUENCIES = ["Daily", "Weekly", "Monthly"];

export default function ScheduleReportDialog({
  open, onClose, onSchedule, reportName
}: {
  open: boolean;
  onClose: () => void;
  onSchedule: (sched: Schedule) => void;
  reportName: string;
}) {
  const [frequency, setFrequency] = React.useState("Weekly");
  const [at, setAt] = React.useState("10:00");

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 animate-fade-in relative">
        <button
          className="absolute top-3 right-3 text-muted-foreground"
          onClick={onClose}
          aria-label="Close"
        >✖</button>
        <h4 className="text-lg font-semibold mb-3">
          Schedule Report - {reportName}
        </h4>
        <div className="mb-3">
          <label className="block text-sm mb-1">Frequency</label>
          <select className="border rounded p-1" value={frequency} onChange={e => setFrequency(e.target.value)}>
            {FREQUENCIES.map(fq => <option key={fq}>{fq}</option>)}
          </select>
        </div>
        <div className="mb-5">
          <label className="block text-sm mb-1">Time</label>
          <input className="border rounded p-1" type="time" value={at} onChange={e => setAt(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <Button onClick={() => {
            onSchedule({ reportName, frequency, at });
            onClose();
          }}>Add Schedule</Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}
