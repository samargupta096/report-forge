
import React from "react";
import { Server, ServerCog, FileText, Wrench, Settings2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function McpServerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 bg-white border rounded shadow space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <ServerCog size={26} className="text-primary" />
        <h1 className="text-2xl font-bold">MCP Server APIs</h1>
      </div>
      <p className="mb-8 text-gray-600">
        This page will serve as the hub for your MCP dashboard and report API integrations.
        <br />
        Below are entry points to add tools, documentation, or server configuration for your backend APIs.
      </p>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
        {/* Tools card */}
        <Card>
          <CardHeader className="flex items-center gap-2 pb-2">
            <Wrench className="text-primary" size={24} />
            <CardTitle className="ml-2 text-lg">Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Set up server-side utilities, test endpoints, and monitor your dashboard or reporting processes. Add scripts, health checks, or custom API test tools here.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" disabled>
              Learn more (coming soon)
            </Button>
          </CardFooter>
        </Card>
        {/* Documentation card */}
        <Card>
          <CardHeader className="flex items-center gap-2 pb-2">
            <FileText className="text-primary" size={24} />
            <CardTitle className="ml-2 text-lg">API Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Provide OpenAPI/Swagger documentation, code samples, and instructions for consuming your dashboard and report APIs.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" disabled>
              Learn more (coming soon)
            </Button>
          </CardFooter>
        </Card>
        {/* Configuration card */}
        <Card>
          <CardHeader className="flex items-center gap-2 pb-2">
            <Settings2 className="text-primary" size={24} />
            <CardTitle className="ml-2 text-lg">Server Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Manage API keys, environment variables, server endpoints, and access control. Customize or document server-side configurations here.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" disabled>
              Learn more (coming soon)
            </Button>
          </CardFooter>
        </Card>
      </div>
      {/* Coming Soon Block */}
      <div className="rounded bg-muted/20 p-4 mt-8 border border-dashed max-w-sm">
        <div className="flex items-center gap-2 mb-2 text-muted-foreground">
          <Server size={20} />
          <span className="font-medium">More MCP features coming soon</span>
        </div>
        <div className="text-muted-foreground text-sm">
          This page will evolve as your backend integrations grow.
        </div>
      </div>
    </div>
  );
}
