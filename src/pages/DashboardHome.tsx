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
import AuditTrailTable, { Audit } from "@/components/AuditTrailTable";
import AuditTrailModal from "@/components/AuditTrailModal";
import { useSearchParams } from "react-router-dom";
import { Plus, Trash2, History, Download } from "lucide-react";
import AddChartDialog from "@/components/AddChartDialog";
import html2canvas from "html2canvas";
// import { useToast } from "@/hooks/use-toast";

// KPIs and Charts are now fetched dynamically from JSON files

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
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Default to URL param, then first option
  const urlDashboard = searchParams.get("dashboard");
  const [selectedDashboard, setSelectedDashboard] = React.useState<string>("");

  React.useEffect(() => {
    if (urlDashboard && dashboardOptions.find(d => d.value === urlDashboard)) {
      setSelectedDashboard(urlDashboard);
    } else if (dashboardOptions.length > 0 && !selectedDashboard) {
       setSelectedDashboard(dashboardOptions[0].value);
    }
  }, [urlDashboard, dashboardOptions, selectedDashboard]);
  const [activeFilter, setActiveFilter] = React.useState<{ label: string; value: number } | null>(null);
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [chartKey, setChartKey] = React.useState(0);

  // KPIs customized per user
  const [baseKpis, setBaseKpis] = React.useState<any[]>([]);
  const [baseCharts, setBaseCharts] = React.useState<any[]>([]);
  const [loadingConfig, setLoadingConfig] = React.useState(false);
  
  // Custom added charts state
  const [customCharts, setCustomCharts] = React.useState<{ title: string; type: string; description?: string }[]>([]);
  const [showAddChart, setShowAddChart] = React.useState(false);

  React.useEffect(() => {
    // Load persisted custom charts per dashboard
    const stored = localStorage.getItem(`customCharts_${selectedDashboard}`);
    if (stored) {
       try { setCustomCharts(JSON.parse(stored)); } catch { setCustomCharts([]); }
    } else {
       setCustomCharts([]);
    }
  }, [selectedDashboard]);

  const handleRemoveCustomChart = (index: number) => {
    const chartToRemove = customCharts[index];
    const updated = customCharts.filter((_, idx) => idx !== index);
    setCustomCharts(updated);
    localStorage.setItem(`customCharts_${selectedDashboard}`, JSON.stringify(updated));
    addAudit("Removed Widget", chartToRemove.title);
  };

  React.useEffect(() => {
    if (!selectedDashboard) return;
    setLoadingConfig(true);
    // Try to match the exact ID from dashbaords context, fallback to slugified name
    const dashObj = dashboards.find(d => d.name === selectedDashboard);
    const slug = dashObj?.id || selectedDashboard.toLowerCase().replace(/\s+/g, '-');
    
    fetch(`${import.meta.env.BASE_URL}data/${slug}.json`)
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

  const [showAuditModal, setShowAuditModal] = React.useState(false);

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
    setSearchParams({ dashboard: value });
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

  const handleExportDashboard = async () => {
    const dashboardElement = document.getElementById("dashboard-content");
    if (!dashboardElement) return;

    try {
      const canvas = await html2canvas(dashboardElement, {
        backgroundColor: document.documentElement.classList.contains("dark") || document.documentElement.classList.contains("dracula") || document.documentElement.classList.contains("dim") ? "#111827" : "#ffffff",
        useCORS: true,
        scale: 2,
      });

      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.download = `Dashboard-${selectedDashboard}-${new Date().toISOString().split("T")[0]}.png`;
      link.href = image;
      link.click();
      
      addAudit("Exported Dashboard", selectedDashboard);
    } catch (err) {
      console.error("Failed to export dashboard:", err);
    }
  };

  // Combine original JSON-loaded charts with custom added ones
  const dashboardCharts = [...baseCharts, ...customCharts];

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
    <section id="dashboard-content" className="relative p-2 rounded-xl bg-background/50">
      {/* Remove Role Switcher */}
      <div className="flex gap-5 items-center justify-between flex-wrap mb-2 mt-2">
        {/* RoleSwitcher removed */}
        <div className="w-full max-w-xs flex gap-2">
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
                  Dashboard: {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button 
            onClick={() => setShowAuditModal(true)}
            className="flex items-center justify-center p-2 rounded border bg-card text-muted-foreground hover:text-primary hover:bg-muted transition-colors shadow-sm"
            title="View Audit Trail"
          >
            <History className="w-5 h-5" />
          </button>
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
        <div className="flex items-center justify-between mb-4 mt-2">
          <h3 className="text-lg font-semibold">{selectedDashboard} Visualizations</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportDashboard}
              className="flex items-center gap-1 bg-secondary text-secondary-foreground text-sm px-3 py-1.5 rounded hover:bg-secondary/90 transition-colors border shadow-sm"
              title="Export Dashboard as Image"
            >
              <Download className="w-4 h-4" /> Export
            </button>
            <button
              onClick={() => setShowAddChart(true)}
              className="flex items-center gap-1 bg-primary text-primary-foreground text-sm px-3 py-1.5 rounded hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Widget
            </button>
          </div>
        </div>
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
                  rounded border bg-card shadow-sm p-3 h-full
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
                  <div className="flex items-center">
                    <ChartExportMenu chartType={chart.type} chartTitle={chart.title} chartId={chartId} />
                    {i >= baseCharts.length && (
                      <button 
                        onClick={() => handleRemoveCustomChart(i - baseCharts.length)}
                        className="text-muted-foreground hover:text-destructive p-2 transition-colors rounded-full"
                        title="Remove Widget"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
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

      
      {/* Audit Trail Modal */}
      <AuditTrailModal 
        open={showAuditModal} 
        onOpenChange={setShowAuditModal} 
        audits={audits}
      />
      {/* KPI Drilldown Modal */}
      <DrilldownModal
        open={!!drillData}
        kpi={drillData}
        onClose={() => setDrillData(null)}
      />

      <AddChartDialog 
        open={showAddChart} 
        onClose={() => setShowAddChart(false)}
        onAdd={(newChart) => {
          const updated = [...customCharts, newChart];
          setCustomCharts(updated);
          localStorage.setItem(`customCharts_${selectedDashboard}`, JSON.stringify(updated));
          addAudit("Added Widget", newChart.title);
        }}
      />
      {/* User Creation Section removed and moved to /users */}
    </section>
  );
}
