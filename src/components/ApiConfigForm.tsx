
// Previously used shadcn form UI; replace with simple HTML markup.

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ApiConfigForm() {
  // Placeholder form - in a real app, this would use react-hook-form etc.
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <Input placeholder="e.g. Payroll API" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Endpoint URL</label>
        <Input type="url" placeholder="https://api.example.com/v1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Auth Type</label>
        <select className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground">
          <option value="none">None</option>
          <option value="apikey">API Key</option>
          <option value="basic">Basic Auth</option>
          <option value="oauth2">OAuth 2.0</option>
        </select>
      </div>
      <Button type="submit" className="w-full mt-3" disabled>
        Connect API (demo)
      </Button>
    </div>
  );
}
