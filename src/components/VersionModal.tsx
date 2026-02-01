
import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onClose: () => void;
  reportName: string;
};

const dummyHistory = [
  { version: "v1.0", date: "2024-06-01", editor: "Alice", notes: "Initial draft" },
  { version: "v1.1", date: "2024-06-07", editor: "Bob", notes: "Fixed summary" },
  { version: "v2.0", date: "2024-06-10", editor: "Alice", notes: "Major revision" },
];

export default function VersionModal({ open, onClose, reportName }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 animate-fade-in relative">
        <button
          className="absolute top-3 right-3 text-muted-foreground"
          onClick={onClose}
          aria-label="Close"
        >✖</button>
        <h4 className="text-lg font-semibold mb-3">Version History - {reportName}</h4>
        <table className="min-w-full border rounded bg-muted/20 mb-4">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Version</th>
              <th className="px-2 py-1 text-left">Date</th>
              <th className="px-2 py-1 text-left">Editor</th>
              <th className="px-2 py-1 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {dummyHistory.map((v, idx) => (
              <tr key={idx}>
                <td className="px-2 py-1">{v.version}</td>
                <td className="px-2 py-1">{v.date}</td>
                <td className="px-2 py-1">{v.editor}</td>
                <td className="px-2 py-1">{v.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}
