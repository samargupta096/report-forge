import { Button } from "@/components/ui/button";
import ReportTemplateTable from "@/components/ReportTemplateTable";
import { LayoutTemplate, Filter, Plus, Columns2 } from "lucide-react";
import CreateTemplateDialog, { TemplateFormValues } from "@/components/CreateTemplateDialog";
import ChartPreview from "@/components/ChartPreview";
import KpiWidget from "@/components/KpiWidget";
import DashboardFilters from "@/components/DashboardFilters";
import React from "react";
import { DateRange } from "react-day-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import ReportFolders from "@/components/ReportFolders";
import VersionModal from "@/components/VersionModal";
import ScheduleReportDialog from "@/components/ScheduleReportDialog";

const SAMPLE_REPORTS = [
  { id: 1, name: "Q2 Financials", folder: "Finance", editable: true },
  { id: 2, name: "Retail Store Stats", folder: "Retail", editable: true },
  { id: 3, name: "Operations Audit", folder: "Audit", editable: false },
];

type Template = {
  id: number;
  name: string;
  type: string;
  description?: string;
  updated: string;
};

const COLUMN_OPTIONS = [
  { key: "name", label: "Template Name" },
  { key: "type", label: "Type" },
  { key: "updated", label: "Last Edited" },
  { key: "description", label: "Description" },
  { key: "actions", label: "Actions" },
];

export default function ReportsPage() {
  const [templates, setTemplates] = React.useState<Template[]>([
    {
      id: 1,
      name: "Weekly Sales",
      type: "Table",
      updated: "2024-06-01",
      description: "Shipping department weekly sales",
    },
    {
      id: 2,
      name: "Customer Cohort Analysis",
      type: "Line Chart",
      updated: "2024-05-15",
      description: "Yearly customer cohort metrics",
    },
    {
      id: 3,
      name: "Inventory Status",
      type: "Summary",
      updated: "2024-05-17",
      description: "Concise inventory snapshot",
    },
    {
      id: 4,
      name: "Sales by Category",
      type: "Bar Chart",
      updated: "2024-06-12",
      description: "Monthly sales distributed by category",
    },
    {
      id: 5,
      name: "Revenue Split by Location",
      type: "Pie Chart",
      updated: "2024-06-09",
      description: "Pie chart of revenue sources",
    },
    {
      id: 6,
      name: "D3 Pie Sample",
      type: "D3 Pie Chart",
      updated: "2024-06-15",
      description: "Sample D3.js animated pie chart with random data",
    },
    {
      id: 7,
      name: "D3 Bar Sample",
      type: "D3 Bar Chart",
      updated: "2024-06-15",
      description: "Sample D3.js animated bar chart with random data",
    },
    {
      id: 8,
      name: "India Map Demo",
      type: "D3 India Map",
      updated: "2024-06-15",
      description: "A D3.js geo chart showing India map outline",
    },
  ]);

  // Add new template
  const handleCreate = (data: TemplateFormValues) => {
    setTemplates(prev => [
      {
        id: Date.now(),
        name: data.name,
        type: data.type,
        description: data.description,
        updated: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
  };

  // Delete template
  const handleDelete = (id: number) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
  };

  // --- date filter state and handlers ---
  const [date, setDate] = React.useState<DateRange | undefined>();
  const handleApply = () => {
    // You can add logic to actually filter reports by date here if needed
    // For now, let's just log or do nothing
    console.log("Applied report filter, date range:", date);
  };
  const handleReset = () => {
    setDate(undefined);
    // Optionally reset other filters if you add any
    console.log("Reset report filter");
  };

  // Version modal/schedule modal
  const [showVersion, setShowVersion] = React.useState(false);
  const [currReport, setCurrReport] = React.useState("");
  const [showSchedule, setShowSchedule] = React.useState(false);

  // function to log to localStorage (copied from dashboard)
  function addAudit(action: string, item: string) {
    const logs = localStorage.getItem("auditTrail");
    const audits = logs ? JSON.parse(logs) : [];
    const n = {
      id: Date.now(),
      user: "User",
      action,
      item,
      date: new Date().toLocaleString(),
    };
    const upd = [n, ...audits].slice(0, 50);
    localStorage.setItem("auditTrail", JSON.stringify(upd));
  }

  // --- FILTER and COLUMNS logic for the table ---
  // Filter logic
  const [filterDropdownOpen, setFilterDropdownOpen] = React.useState(false);
  const [filterValue, setFilterValue] = React.useState("");
  const filteredTemplates = React.useMemo(() => {
    if (!filterValue.trim()) return templates;
    const v = filterValue.trim().toLowerCase();
    return templates.filter(
      t =>
        t.name.toLowerCase().includes(v) ||
        t.type.toLowerCase().includes(v) ||
        (t.description?.toLowerCase().includes(v) ?? false)
    );
  }, [templates, filterValue]);

  // Columns selection logic
  type VisibleColumns = {
    name: boolean;
    type: boolean;
    updated: boolean;
    description: boolean;
    actions: boolean;
  };
  const [visibleColumns, setVisibleColumns] = React.useState<VisibleColumns>({
    name: true,
    type: true,
    updated: true,
    description: true,
    actions: true,
  });
  const handleToggleColumn = (colKey: string) => {
    // Always keep at least one column (besides Actions) visible
    const next = { ...visibleColumns, [colKey]: !visibleColumns[colKey] };
    const visibleCount = Object.entries(next).filter(
      ([key, bool]) => key !== "actions" && bool
    ).length;
    if (visibleCount === 0) return; // Prevents hiding all main columns
    setVisibleColumns(next);
  };

  return (
    <section>
      {/* Filters */}
      <DashboardFilters
        date={date}
        setDate={setDate}
        onApply={handleApply}
        onReset={handleReset}
      />
      {/* KPI Widgets */}
      <div className="flex flex-wrap gap-4 mb-8">
        <KpiWidget label="Total Revenue" value="₹4.2M" />
        <KpiWidget label="Active Users" value="1,253" />
        <KpiWidget label="Conversion Rate" value="3.2%" />
        <KpiWidget label="Churn Rate" value="0.8%" />
      </div>

      {/* --- Existing Dashboard Report elements moved over --- */}
      <h3 className="font-bold mb-2 mt-4 text-xl">Report Module (Enterprise Features)</h3>
      <div className="flex flex-col md:flex-row gap-5 md:items-start mb-8">
        <div className="basis-1/2">
          <ReportFolders />
          <h5 className="font-semibold mb-2 mt-4">Sample Reports</h5>
          <ul className="space-y-2">
            {SAMPLE_REPORTS.map(r => (
              <li key={r.id} className="flex gap-2 items-center justify-between bg-white/70 dark:bg-black/50 backdrop-blur rounded border p-2">
                <span>{r.name} <span className="text-xs text-muted-foreground">({r.folder})</span></span>
                <div className="flex gap-1">
                  <button
                    className="text-xs bg-muted rounded border px-2 py-1"
                    onClick={() => {
                      setCurrReport(r.name);
                      setShowVersion(true);
                      addAudit("Viewed Report Version", r.name);
                    }}
                  >Version</button>
                  <button
                    className="text-xs bg-muted rounded border px-2 py-1"
                    onClick={() => {
                      setCurrReport(r.name);
                      setShowSchedule(true);
                      addAudit("Opened Schedule", r.name);
                    }}
                  >Schedule</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Version/schedule modals */}
      <VersionModal open={showVersion} onClose={() => setShowVersion(false)} reportName={currReport} />
      <ScheduleReportDialog
        open={showSchedule}
        onClose={() => setShowSchedule(false)}
        onSchedule={sched => addAudit("Scheduled Report", `${sched.reportName} (${sched.frequency} at ${sched.at})`)}
        reportName={currReport}
      />
      <hr className="my-8" />

      {/* Section Title & New Template */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <LayoutTemplate className="text-primary" size={24} />
            Reports & Templates
          </h2>
          <p className="text-muted-foreground">
            Create and manage report templates. (Custom fields, layouts, filters coming soon!)
          </p>
        </div>
        <CreateTemplateDialog onCreate={handleCreate}>
          <Button className="mt-2 sm:mt-0 flex items-center gap-1 w-full sm:w-auto" variant="default">
            <Plus size={18} /> Create New Template
          </Button>
        </CreateTemplateDialog>
      </div>
      <div className="rounded bg-white/80 dark:bg-black/60 p-3 sm:p-5 shadow-sm text-muted-foreground mb-8 overflow-x-auto backdrop-blur-md">
        <div className="mb-4 flex flex-col md:flex-row flex-wrap gap-2 md:gap-4 justify-between">
          <div className="flex gap-2 flex-wrap">
            {/* Filter Dropdown */}
            <DropdownMenu open={filterDropdownOpen} onOpenChange={setFilterDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">
                  <Filter className="mr-1" size={16} />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-3">
                <div>
                  <label htmlFor="template-filter" className="block text-xs text-muted-foreground mb-2">Filter Templates</label>
                  <Input
                    id="template-filter"
                    placeholder="Search by name, type, etc."
                    className="mb-2"
                    value={filterValue}
                    onChange={e => setFilterValue(e.target.value)}
                    autoFocus
                  />
                  <div className="flex justify-between gap-2">
                    <Button size="sm" variant="secondary" onClick={() => setFilterValue("")}>
                      Clear
                    </Button>
                    <Button size="sm" onClick={() => setFilterDropdownOpen(false)}>
                      Apply
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Columns Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">
                  <Columns2 className="mr-1" size={16} />
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {COLUMN_OPTIONS.filter(c => c.key !== "actions").map(col => (
                  <DropdownMenuCheckboxItem
                    key={col.key}
                    checked={visibleColumns[col.key as keyof VisibleColumns]}
                    onCheckedChange={() => handleToggleColumn(col.key)}
                  >
                    {col.label}
                  </DropdownMenuCheckboxItem>
                ))}
                {/* Actions column always visible */}
                <DropdownMenuCheckboxItem checked disabled>
                  Actions
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <span className="text-xs text-muted-foreground self-center">
            Total: {filteredTemplates.length} templates
          </span>
        </div>
        <ReportTemplateTable
          templates={filteredTemplates}
          onDelete={handleDelete}
          visibleColumns={visibleColumns}
        />
      </div>
    </section>
  );
}
