
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Logs } from "lucide-react";

const mockLogs = [
  {
    id: 1,
    action: "Updated Report Schedule",
    user: "alice@email.com",
    resource: "Reports",
    timestamp: "2025-06-14 10:08",
  },
  {
    id: 2,
    action: "Deleted Data Source",
    user: "bob@email.com",
    resource: "Data Sources",
    timestamp: "2025-06-13 15:42",
  },
  {
    id: 3,
    action: "Logged In",
    user: "alice@email.com",
    resource: "Auth",
    timestamp: "2025-06-13 09:20",
  },
  {
    id: 4,
    action: "Exported Report",
    user: "carol@email.com",
    resource: "Reports",
    timestamp: "2025-06-12 21:55",
  },
];

export default function AuditLogsPage() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Logs className="text-primary" size={24} />
        Audit Logs
      </h2>
      <p className="mb-6">
        Track changes, access, and activity. 
        <span className="italic ml-2 text-muted-foreground">(Detailed audit log table coming soon!)</span>
      </p>
      <div className="rounded bg-white p-5 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Resource</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="flex items-center gap-2">
                  <Logs className="text-muted-foreground" size={16} />
                  {log.action}
                </TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>{log.resource}</TableCell>
                <TableCell>{log.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

