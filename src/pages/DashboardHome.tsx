import React from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import KpiWidget from "@/components/KpiWidget";
import { FilterX } from "lucide-react";
import DashboardFilters from "@/components/DashboardFilters";
import { DateRange } from "react-day-picker";
import { useDashboardContext } from "../contexts/DashboardContext";
import ChartExportMenu from "@/components/ChartExportMenu";
import { ChartPreviewWithExport } from "@/components/ChartPreview";
import CustomizableKpiList from "@/components/CustomizableKpiList";
import DrilldownModal from "@/components/DrilldownModal";
import ReportFolders from "@/components/ReportFolders";
import VersionModal from "@/components/VersionModal";
import ScheduleReportDialog from "@/components/ScheduleReportDialog";
import AuditTrailTable, { Audit } from "@/components/AuditTrailTable";
import { useToast } from "@/hooks/use-toast";

const DASHBOARD_KPIS: Record<string, { label: string; value: string | number; category?: string }[]> = {
  "Executive Overview": [
    { label: "Total Revenue", value: "₹9.3M", category: "A" },
    { label: "YTD Growth", value: "7.6%", category: "B" },
    { label: "Active Clients", value: "421", category: "C" },
    { label: "Churn Rate", value: "1.2%", category: "D" },
  ],
  "Retail Performance": [
    { label: "Total Sales", value: "₹5.1M", category: "A" },
    { label: "Products Sold", value: "18,120", category: "B" },
    { label: "Stores", value: "12", category: "C" },
    { label: "Active Promotions", value: "4", category: "D" },
  ],
};

const DASHBOARD_CHARTS: Record<string, { title: string; type: string; description?: string }[]> = {
  "Executive Overview": [
    { title: "Monthly Revenue Trend", type: "Line Chart" },
    { title: "Revenue by Region", type: "Bar Chart" },
    { title: "Profit Distribution", type: "Heat Map", description: "Heat map showing profits by region and month" },
    { title: "Revenue Split", type: "Pie Chart" },
    { title: "Monthly Attendance", type: "Calendar Heat Map", description: "Sample calendar heatmap" },
    { title: "Market Distributions", type: "Violin Chart", description: "Demo violin plot chart" },
    { title: "Flow Dynamics", type: "Sankey Chart", description: "Simple Sankey flow demo" },
    { title: "Candlestick Movements", type: "Candle Stick", description: "Sample financial OHLC chart" }, // Existing for demo
  ],
  "Retail Performance": [
    { title: "Sales by Category", type: "Bar Chart" },
    { title: "Monthly Store Traffic", type: "Line Chart" },
    { title: "Store Activity Heatmap", type: "Heat Map", description: "In-store footfall heatmap (sample)" },
    { title: "Product Price Candles", type: "Candle Stick", description: "Sample candle chart for retail pricing" }, // Existing for demo
    { title: "Attendance Pattern", type: "Calendar Heat Map", description: "Demo calendar heatmap" },
    { title: "Sales Distribution", type: "Violin Chart", description: "Sample violin plot" },
    { title: "Supply Routes", type: "Sankey Chart", description: "Sample Sankey chart" }
  ],
};

const SAMPLE_REPORTS = [
  { id: 1, name: "Q2 Financials", folder: "Finance", editable: true },
  { id: 2, name: "Retail Store Stats", folder: "Retail", editable: true },
  { id: 3, name: "Operations Audit", folder: "Audit", editable: false },
];

function getKpiOrder(kpis: any[]) {
  // Try localStorage for order (simulate user selected order)
  const saved = localStorage.getItem("kpiOrder");
  if (!saved) return kpis;
  const order: string[] = JSON.parse(saved);
  return order.map(label => kpis.find((k: any) => k.label === label)).filter(Boolean);
}

export default function DashboardHome() {
  const { dashboards } = useDashboardContext();
  const dashboardOptions = dashboards.map(d => ({ label: d.name, value: d.name }));
  const [selectedDashboard, setSelectedDashboard] = React.useState<string>(
    dashboardOptions[0]?.value ?? ""
  );
  const [activeFilter, setActiveFilter] = React.useState<{ label: string; value: number } | null>(null);
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [chartKey, setChartKey] = React.useState(0);

  // KPIs customized per user
  const baseKpis = DASHBOARD_KPIS[selectedDashboard] ?? [];
  const [kpis, setKpis] = React.useState(() => getKpiOrder(baseKpis));
  React.useEffect(() => {
    setKpis(getKpiOrder(baseKpis));
  }, [selectedDashboard, baseKpis]);

  // Drilldown modal state
  const [drillData, setDrillData] = React.useState<any | null>(null);

  // Version modal/schedule modal
  const [showVersion, setShowVersion] = React.useState(false);
  const [currReport, setCurrReport] = React.useState("");
  const [showSchedule, setShowSchedule] = React.useState(false);

  // Audit Trail (simulate localStorage log)
  const [audits, setAudits] = React.useState<Audit[]>([]);
  React.useEffect(() => {
    const logs = localStorage.getItem("auditTrail");
    setAudits(logs ? JSON.parse(logs) : []);
  }, []);
  function addAudit(action: string, item: string) {
    const n: Audit = {
      id: Date.now(),
      user: "User", // fixed user since there is no role now
      action,
      item,
      date: new Date().toLocaleString(),
    };
    setAudits(aud => {
      const upd = [n, ...aud].slice(0, 50);
      localStorage.setItem("auditTrail", JSON.stringify(upd));
      return upd;
    });
  }

  const handleDashboardChange = (value: string) => {
    setSelectedDashboard(value);
    setActiveFilter(null); // reset filter when switching dashboard
  };

  const handleApplyFilter = () => {
    setChartKey(key => key + 1);
    console.log("Applying date filter for charts:", date);
  };

  const handleResetFilter = () => {
    setDate(undefined);
    setChartKey(key => key + 1);
    console.log("Resetting date filter for charts.");
  };

  // Advanced Filter States
  const baseCharts = DASHBOARD_CHARTS[selectedDashboard] ?? [];

  // Categories/KPIs for filter options (no duplicates)
  const categories = Array.from(new Set(baseKpis.map(k => k.category)));
  const kpiLabels = baseKpis.map(k => k.label);

  // Advanced Filter state
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [selectedKpis, setSelectedKpis] = React.useState<string[]>([]);

  // Saved filter sets
  const [filterSets, setFilterSets] = React.useState<any[]>([]);
  React.useEffect(() => {
    const data = localStorage.getItem("dashboardFilterSets");
    setFilterSets(data ? JSON.parse(data) : []);
  }, [selectedDashboard]);
  const saveFilterSet = (name: string) => {
    const fs = {
      name,
      date,
      categories: selectedCategories,
      kpis: selectedKpis,
    };
    const updated = [...filterSets.filter(f => f.name !== name), fs];
    setFilterSets(updated);
    localStorage.setItem("dashboardFilterSets", JSON.stringify(updated));
  };
  const applyFilterSet = (name: string) => {
    const match = filterSets.find((f: any) => f.name === name);
    if (!match) return;
    setDate(match.date ?? undefined);
    setSelectedCategories(match.categories ?? []);
    setSelectedKpis(match.kpis ?? []);
  };
  const deleteFilterSet = (name: string) => {
    const updated = filterSets.filter((f: any) => f.name !== name);
    setFilterSets(updated);
    localStorage.setItem("dashboardFilterSets", JSON.stringify(updated));
  };

  // Advanced Filter Logic for KPIs/charts
  const kpiCategoryFilter = selectedCategories.length === 0 ? baseKpis : baseKpis.filter(k => selectedCategories.includes(k.category));
  const filteredKpis =
    selectedKpis.length === 0
      ? kpiCategoryFilter
      : kpiCategoryFilter.filter(k => selectedKpis.includes(k.label));

  // For charts, could apply similar filter logic if you want
  const dashboardCharts = baseCharts; // not filtered for simplicity

  const shownKpis = !activeFilter
    ? kpis
    : kpis.filter(
        kpi => kpi.category === activeFilter.label
      );

  // User Creation Demo Section
  const { toast } = useToast();
  const [userList, setUserList] = React.useState<Array<{ name: string; email: string }>>(() => {
    // localStorage to persist on reload
    const users = localStorage.getItem("createdUserList");
    return users ? JSON.parse(users) : [];
  });

  const [userForm, setUserForm] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm(f => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.name || !userForm.email || !userForm.password) return;

    const newUsers = [
      ...userList,
      { name: userForm.name, email: userForm.email }
    ];
    setUserList(newUsers);
    localStorage.setItem("createdUserList", JSON.stringify(newUsers));
    toast({
      title: `User "${userForm.name}" created!`,
      description: "A new user has been added (demo only)."
    });
    setUserForm({ name: "", email: "", password: "" });
  };

  return (
    <section>
      {/* Remove Role Switcher */}
      <div className="flex gap-5 items-center flex-wrap mb-2 mt-2">
        {/* RoleSwitcher removed */}
        <div className="w-full max-w-xs">
          <Select value={selectedDashboard} onValueChange={handleDashboardChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select dashboard" />
            </SelectTrigger>
            <SelectContent>
              {dashboardOptions.length === 0 && (
                <SelectItem disabled value="">
                  No dashboards
                </SelectItem>
              )}
              {dashboardOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <p className="mb-6">
        Track KPIs, recent reports, and analytics at a glance. Use the dropdown to view different dashboards.
      </p>
      <DashboardFilters
        date={date}
        setDate={setDate}
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        kpis={kpiLabels}
        selectedKpis={selectedKpis}
        setSelectedKpis={setSelectedKpis}
        filterSets={filterSets}
        onSaveFilterSet={saveFilterSet}
        onApplyFilterSet={applyFilterSet}
        onDeleteFilterSet={deleteFilterSet}
        onApply={() => {}} // charts can be keyed on date for refresh: setChartKey(key => key + 1);
        onReset={() => {
          setDate(undefined);
          setSelectedCategories([]);
          setSelectedKpis([]);
        }}
      />
      {/* Customizable KPI List */}
      <CustomizableKpiList
        kpis={filteredKpis}
        setKpis={setKpis}
        onKpiClick={kpi => {
          setDrillData(kpi);
          addAudit("Viewed KPI Details", kpi.label);
        }}
        editable={true}
      />
      <DashboardFilters
        date={date}
        setDate={setDate}
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        kpis={kpiLabels}
        selectedKpis={selectedKpis}
        setSelectedKpis={setSelectedKpis}
        filterSets={filterSets}
        onSaveFilterSet={saveFilterSet}
        onApplyFilterSet={applyFilterSet}
        onDeleteFilterSet={deleteFilterSet}
        onApply={() => {}} // charts can be keyed on date for refresh: setChartKey(key => key + 1);
        onReset={() => {
          setDate(undefined);
          setSelectedCategories([]);
          setSelectedKpis([]);
        }}
      />
      {activeFilter && (
        <div className="flex items-center gap-2 mb-5 rounded bg-indigo-50 border border-indigo-200 px-3 py-1 text-indigo-800 text-sm max-w-xs">
          <span>Filter: <b>Category {activeFilter.label}</b></span>
          <button aria-label="Clear filter" onClick={() => setActiveFilter(null)}>
            <FilterX className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}
      {/* Charts */}
      <div>
        <h3 className="text-lg font-semibold mb-4">{selectedDashboard} Visualizations</h3>
        <div
          className="
            flex flex-wrap gap-4
            md:grid md:grid-cols-2 lg:grid-cols-3
            w-full
          "
        >
          {dashboardCharts.map((chart, i) => {
            const chartId = `dashboard-chart-${selectedDashboard.replace(/\s+/g, '-')}-${i}`;
            return (
              <div
                key={chartId}
                id={chartId}
                className="
                  flex flex-col relative
                  rounded border bg-white shadow-sm p-3 h-full
                  min-w-[220px] max-w-full
                  w-full
                  md:w-auto
                  grow
                  basis-[350px]
                "
                style={{
                  maxWidth: "100%",
                  flex: "1 1 340px",
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-medium text-primary">{chart.title}</span>
                    <div className="text-xs text-muted-foreground">{chart.type}</div>
                  </div>
                  <ChartExportMenu chartType={chart.type} chartTitle={chart.title} chartId={chartId} />
                </div>
                <ChartPreviewWithExport
                  type={chart.type}
                  onDataPointClick={info => setActiveFilter(info)}
                />
                {chart.description && (
                  <div className="mt-2 text-xs">{chart.description}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <hr className="my-8" />
      {/* --- Reports widgets/features --- */}
      <h3 className="font-bold mb-2 mt-4 text-xl">Report Module (Enterprise Features)</h3>
      <div className="flex flex-col md:flex-row gap-5 md:items-start">
        <div className="basis-1/2">
          <ReportFolders />
          <h5 className="font-semibold mb-2">Sample Reports</h5>
          <ul className="mb-4 space-y-2">
            {SAMPLE_REPORTS.map(r => (
              <li key={r.id} className="flex gap-2 items-center justify-between bg-white rounded border p-2">
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
        <div className="basis-1/2">
          <AuditTrailTable audits={audits} />
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
      {/* KPI Drilldown Modal */}
      <DrilldownModal
        open={!!drillData}
        kpi={drillData}
        onClose={() => setDrillData(null)}
      />

      {/* ========================== */}
      {/* User Creation Section */}
      <div className="mt-16 max-w-lg w-full mx-auto bg-white dark:bg-background rounded-xl shadow p-6 flex flex-col items-center">
        <h3 className="text-xl font-bold mb-4">Create User (Demo)</h3>
        <form onSubmit={handleAddUser} className="w-full space-y-3">
          <div>
            <label htmlFor="user-name" className="block text-sm font-medium mb-1">Name</label>
            <input
              id="user-name"
              name="name"
              type="text"
              value={userForm.name}
              onChange={handleUserInput}
              className="w-full rounded border bg-background px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="user-email" className="block text-sm font-medium mb-1">Email</label>
            <input
              id="user-email"
              name="email"
              type="email"
              value={userForm.email}
              onChange={handleUserInput}
              className="w-full rounded border bg-background px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="user-password" className="block text-sm font-medium mb-1">Password</label>
            <input
              id="user-password"
              name="password"
              type="password"
              value={userForm.password}
              onChange={handleUserInput}
              className="w-full rounded border bg-background px-3 py-2"
              required
            />
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground rounded py-2 font-semibold hover:bg-primary/90 transition">Create User</button>
        </form>
        <hr className="my-5 w-full" />
        <h4 className="font-semibold mb-2 text-lg">Created Users (local only)</h4>
        {userList.length === 0 ? (
          <div className="text-muted-foreground">No users created yet.</div>
        ) : (
          <ul className="w-full space-y-1">
            {userList.map((u, i) => (
              <li key={i} className="flex justify-between items-center border-b py-1 text-sm">
                <span className="font-medium">{u.name}</span>
                <span className="text-muted-foreground">{u.email}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
