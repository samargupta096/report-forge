
import React from "react";

export type Audit = {
  id: number;
  user: string;
  action: string;
  item: string;
  date: string;
};

type Props = {
  audits: Audit[];
};

export default function AuditTrailTable({ audits }: Props) {
  return (
    <div className="overflow-x-auto bg-white border rounded p-3 shadow mb-6">
      <h4 className="font-semibold mb-2">Audit Trail</h4>
      <table className="min-w-full text-xs">
        <thead>
          <tr>
            <th className="px-2 py-1">User</th>
            <th className="px-2 py-1">Action</th>
            <th className="px-2 py-1">Item</th>
            <th className="px-2 py-1">Date</th>
          </tr>
        </thead>
        <tbody>
          {audits.length === 0 && (
            <tr><td colSpan={4} className="text-center text-muted-foreground">No audit records.</td></tr>
          )}
          {audits.map(a => (
            <tr key={a.id}>
              <td className="px-2 py-1">{a.user}</td>
              <td className="px-2 py-1">{a.action}</td>
              <td className="px-2 py-1">{a.item}</td>
              <td className="px-2 py-1">{a.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
