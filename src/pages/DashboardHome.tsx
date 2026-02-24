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
// import { useToast } from "@/hooks/use-toast";

// KPIs and Charts are now fetched dynamically from JSON files

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
  const [baseKpis, setBaseKpis] = React.useState<any[]>([]);
  const [baseCharts, setBaseCharts] = React.useState<any[]>([]);
  const [loadingConfig, setLoadingConfig] = React.useState(false);

  React.useEffect(() => {
    if (!selectedDashboard) return;
    setLoadingConfig(true);
    // Try to match the exact ID from dashbaords context, fallback to slugified name
    const dashObj = dashboards.find(d => d.name === selectedDashboard);
    const slug = dashObj?.id || selectedDashboard.toLowerCase().replace(/\s+/g, '-');
    
    fetch(`/data/${slug}.json`)
      .then(res => res.json())
      .then(data => {
        setBaseKpis(data.kpis || []);
        setBaseCharts(data.charts || []);
        setLoadingConfig(false);
      })
      .catch(err => {
         console.error("Failed to load dashboard config", err);
         setBaseKpis([]);
         setBaseCharts([]);
         setLoadingConfig(false);
      });
  }, [selectedDashboard, dashboards]);

  // KPIs customized per user
  const [kpis, setKpis] = React.useState(() => getKpiOrder(baseKpis));
  React.useEffect(() => {
    setKpis(getKpiOrder(baseKpis));
  }, [baseKpis]);

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
  const dashboardCharts = baseCharts; // Using dynamic charts

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

  // For charts, not filtered for simplicity
  // The 'dashboardCharts' is just baseCharts, defined above

  const shownKpis = !activeFilter
    ? kpis
    : kpis.filter(
        kpi => kpi.category === activeFilter.label
      );

  // Removed User Creation Demo Section



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

      {/* User Creation Section removed and moved to /users */}
    </section>
  );
}
