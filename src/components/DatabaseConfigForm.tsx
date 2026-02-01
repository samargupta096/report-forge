
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const dbTypes = [
  { value: "postgres", label: "PostgreSQL" },
  { value: "mysql", label: "MySQL" },
  { value: "mssql", label: "MS SQL" },
  { value: "sqlite", label: "SQLite" },
];

export default function DatabaseConfigForm() {
  const [form, setForm] = useState({
    type: "postgres",
    host: "",
    port: "",
    user: "",
    password: "",
    dbname: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTest = () => {
    toast({
      title: "Test Connection",
      description: "This is a demo. In production, your connection would be tested here.",
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Saved!",
      description: "Database configuration saved (frontend demo only).",
    });
  };

  return (
    <form onSubmit={handleSave} className="max-w-xl space-y-6">
      <div className="grid grid-cols-2 gap-5">
        <div>
          <Label htmlFor="type">Database Type</Label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2 bg-background"
          >
            {dbTypes.map((db) => (
              <option value={db.value} key={db.value}>{db.label}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="host">Host</Label>
          <Input id="host" name="host" value={form.host} onChange={handleChange} placeholder="127.0.0.1" required />
        </div>
        <div>
          <Label htmlFor="port">Port</Label>
          <Input id="port" name="port" value={form.port} onChange={handleChange} placeholder="5432" required />
        </div>
        <div>
          <Label htmlFor="user">Username</Label>
          <Input id="user" name="user" value={form.user} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" value={form.password} onChange={handleChange} type="password" required />
        </div>
        <div>
          <Label htmlFor="dbname">Database Name</Label>
          <Input id="dbname" name="dbname" value={form.dbname} onChange={handleChange} required />
        </div>
      </div>
      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={handleTest}>
          Test Connection
        </Button>
        <Button type="submit">
          Save Config
        </Button>
      </div>
    </form>
  );
}
