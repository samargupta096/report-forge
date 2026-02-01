
import React, { useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { BadgeCheck, Clock10, XCircle, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const mockHistory = [
  {
    id: 1,
    report: "Monthly Sales",
    status: "Success",
    runBy: "alice@email.com",
    runAt: "2025-06-14 09:34",
  },
  {
    id: 2,
    report: "Top 10 Customers",
    status: "Running",
    runBy: "bob@email.com",
    runAt: "2025-06-13 22:17",
  },
  {
    id: 3,
    report: "Product Overview",
    status: "Failed",
    runBy: "carol@email.com",
    runAt: "2025-06-13 08:02",
  },
  {
    id: 4,
    report: "User Signup Stats",
    status: "Queued",
    runBy: "dan@email.com",
    runAt: "2025-06-12 18:44",
  },
];

// Mock logs per report ID
const mockLogs: Record<number, string> = {
  1: `2025-06-14 09:34:01 [INFO] Report started
2025-06-14 09:34:05 [INFO] Fetched sales data
2025-06-14 09:34:14 [SUCCESS] Report generated successfully`,

  2: `2025-06-13 22:17:08 [INFO] Report scheduled
2025-06-13 22:17:09 [INFO] Gathering top customers...
[RUNNING]
...`,

  3: `2025-06-13 08:02:01 [INFO] Job started
2025-06-13 08:03:27 [ERROR] Failed to connect to products database
2025-06-13 08:03:28 [FAILED] Report could not be generated`,

  4: `2025-06-12 18:44:10 [INFO] Report queued
2025-06-12 18:44:22 [INFO] Waiting for available resources...
[QUEUED]
...`
};

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "Success":
      return (
        <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs bg-green-100 text-green-800">
          <BadgeCheck className="w-3 h-3 text-green-500" /> Success
        </span>
      );
    case "Failed":
      return (
        <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs bg-red-100 text-red-800">
          <XCircle className="w-3 h-3 text-red-500" /> Failed
        </span>
      );
    case "Running":
      return (
        <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs bg-blue-100 text-blue-800 animate-pulse">
          <Loader2 className="w-3 h-3 text-blue-500 animate-spin" /> Running
        </span>
      );
    case "Queued":
      return (
        <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs bg-gray-100 text-gray-700">
          <Clock10 className="w-3 h-3 text-gray-400" /> Queued
        </span>
      );
    default:
      return status;
  }
}

type ViewLogDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportName?: string;
  log?: string;
};

function ViewLogDialog({ open, onOpenChange, reportName, log }: ViewLogDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{reportName ? `Logs for "${reportName}"` : "Logs"}</DialogTitle>
          <DialogDescription>
            {reportName && "This is the log output for the selected report run."}
          </DialogDescription>
        </DialogHeader>
        <div className="rounded bg-black/90 text-xs font-mono text-green-100 p-4 whitespace-pre-wrap max-h-72 overflow-y-auto shadow-inner">
          {log || "No logs available."}
        </div>
        <div className="flex justify-end mt-4">
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function HistoryPage() {
  const [viewingLogId, setViewingLogId] = useState<number | null>(null);

  const handleViewLog = (reportId: number) => {
    setViewingLogId(reportId);
  };
  const handleCloseLog = () => setViewingLogId(null);

  const current = viewingLogId != null ? mockHistory.find(row => row.id === viewingLogId) : null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Report History</h2>
      <p className="mb-6">
        Track recent report executions and activity. <span className="italic text-muted-foreground">(History table/audit viewer coming soon!)</span>
      </p>
      <div className="rounded bg-white p-5 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Run By</TableHead>
              <TableHead>Run At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockHistory.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.report}</TableCell>
                <TableCell>
                  <StatusBadge status={row.status} />
                </TableCell>
                <TableCell>{row.runBy}</TableCell>
                <TableCell>{row.runAt}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewLog(row.id)}
                  >
                    View Log
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ViewLogDialog
        open={viewingLogId !== null}
        onOpenChange={open => {
          if (!open) handleCloseLog();
        }}
        reportName={current?.report}
        log={current ? mockLogs[current.id] : ""}
      />
    </section>
  );
}

