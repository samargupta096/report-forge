import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Database } from "lucide-react";
import DatabaseConfigForm from "@/components/DatabaseConfigForm";
import ApiConfigForm from "@/components/ApiConfigForm";
import FileUploadForm from "@/components/FileUploadForm";

// Demo data sources
const initialSources = [
  {
    id: 1,
    type: "Database",
    name: "Sales Postgres",
    detail: "PostgreSQL (AWS), sales-db.company.com:5432",
    status: "Connected",
  },
  {
    id: 2,
    type: "API",
    name: "Timesheet API",
    detail: "REST, timesheet.company.com/api/v2",
    status: "Connected",
  },
  {
    id: 3,
    type: "File",
    name: "2024 Expense Sheet",
    detail: "Excel upload",
    status: "Imported",
  },
];

const tabs = [
  { label: "All", value: "all" },
  { label: "Databases", value: "database" },
  { label: "APIs", value: "api" },
  { label: "Files", value: "file" },
];

function filterSources(sources, filter) {
  if (filter === "all") return sources;
  if (filter === "database") return sources.filter(s => s.type === "Database");
  if (filter === "api") return sources.filter(s => s.type === "API");
  if (filter === "file") return sources.filter(s => s.type === "File");
  return sources;
}

export default function DataSourcesPage() {
  const [tab, setTab] = useState("all");
  const [sources, setSources] = useState(initialSources);
  const [addSheetOpen, setAddSheetOpen] = useState(false);
  const [addType, setAddType] = useState("database");

  // Render which form based on addType (expand as real integrations are added)
  const renderAddSourceForm = () => {
    if (addType === "database") {
      return <DatabaseConfigForm />;
    }
    if (addType === "api") {
      return <ApiConfigForm />;
    }
    if (addType === "file") {
      return <FileUploadForm />;
    }
    return null;
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-2 flex gap-2 items-center">
        <Database className="text-primary" /> Data Source Management
      </h2>
      <p className="mb-6 text-muted-foreground max-w-2xl">
        Connect databases, REST APIs, upload files, and more. Securely centralize data access for seamless reporting.
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {tabs.map(t => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`px-4 py-1.5 rounded-full font-medium text-sm transition ${
              tab === t.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            {t.label}
          </button>
        ))}
        <div className="ml-auto">
          <Sheet open={addSheetOpen} onOpenChange={setAddSheetOpen}>
            <SheetTrigger asChild>
              <Button onClick={() => { setAddType("database"); }} size="sm">
                + Add Data Source
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="max-w-md w-full">
              <SheetHeader>
                <SheetTitle>
                  Add Data Source
                </SheetTitle>
              </SheetHeader>
              {/* Type picker */}
              <div className="py-2 flex gap-3">
                <Button
                  size="sm"
                  variant={addType === "database" ? "default" : "outline"}
                  onClick={() => setAddType("database")}
                  type="button"
                >
                  Database
                </Button>
                <Button
                  size="sm"
                  variant={addType === "api" ? "default" : "outline"}
                  onClick={() => setAddType("api")}
                  type="button"
                >
                  API
                </Button>
                <Button
                  size="sm"
                  variant={addType === "file" ? "default" : "outline"}
                  onClick={() => setAddType("file")}
                  type="button"
                >
                  File
                </Button>
              </div>
              <div className="pt-3">
                {renderAddSourceForm()}
              </div>
              <SheetClose asChild>
                <Button className="mt-6 w-full" variant="outline" type="button">
                  Close
                </Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Source Table */}
      <div className="rounded bg-white p-0 shadow-sm border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterSources(sources, tab).map(src => (
              <TableRow key={src.id}>
                <TableCell className="font-medium">{src.name}</TableCell>
                <TableCell>
                  <span className="rounded px-2 py-0.5 bg-muted text-xs font-semibold">{src.type}</span>
                </TableCell>
                <TableCell>{src.detail}</TableCell>
                <TableCell>
                  <span
                    className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${
                      src.status === "Connected"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {src.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
            {filterSources(sources, tab).length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No data sources for this type.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
