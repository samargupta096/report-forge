
import React from "react";

type Props = {
  role: string;
  setRole: (r: string) => void;
};

export default function RoleSwitcher({ role, setRole }: Props) {
  return (
    <div className="flex gap-2 items-center p-2 rounded border bg-white shadow-sm">
      <span className="text-xs text-muted-foreground">Role:</span>
      <select
        value={role}
        onChange={e => setRole(e.target.value)}
        className="border rounded px-2 py-0.5 text-sm"
      >
        <option value="Admin">Admin</option>
        <option value="User">User</option>
      </select>
    </div>
  );
}
