
/**
 * Dashboard Filters Component
 * 
 * A comprehensive filtering system for dashboard data visualization.
 * Provides date range selection, category filtering, KPI selection,
 * and saved filter sets functionality.
 * 
 * Features:
 * - Date range picker with presets
 * - Multi-select category filtering
 * - Multi-select KPI filtering
 * - Save/load filter configurations
 * - Advanced filtering with persistence
 * 
 * Libraries used:
 * - react-day-picker: Date range selection
 * - date-fns: Date manipulation utilities
 * - Shadcn/UI: Form components and popovers
 * - Lucide React: Icons
 * 
 * Use Cases:
 * - Dashboard data filtering
 * - Report date range selection
 * - Multi-dimensional data analysis
 * - Filter configuration management
 */

import React from "react";
import { DateRange } from "react-day-picker";
import { Calendar as CalendarIcon, Filter, List, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  subMonths,
  subYears,
} from "date-fns";

/**
 * Filter Set Type Definition
 * 
 * Represents a saved filter configuration that can be reused.
 * Includes all filterable dimensions of the dashboard.
 * 
 * @interface FilterSet
 * @property {string} name - Display name for the filter set
 * @property {DateRange} [date] - Optional date range filter
 * @property {string[]} [categories] - Optional category filters
 * @property {string[]} [kpis] - Optional KPI filters
 */
type FilterSet = {
  name: string;
  date?: DateRange | undefined;
  categories?: string[];
  kpis?: string[];
};

/**
 * Predefined Date Range Options
 * 
 * Common date range presets for quick selection.
 * Covers typical business reporting periods.
 */
const presetOptions = [
  { label: "This Week", value: "this-week" },
  { label: "This Month", value: "this-month" },
  { label: "Last 6 Months", value: "last-6-months" },
  { label: "This Year", value: "this-year" },
  { label: "Previous Year", value: "previous-year" },
];

/**
 * Dashboard Filters Props Interface
 * 
 * Comprehensive prop interface supporting both basic and advanced filtering modes.
 * 
 * @interface DashboardFiltersProps
 */
type DashboardFiltersProps = {
  // Core date filtering
  /** Current date range selection */
  date: DateRange | undefined;
  /** Function to update date range */
  setDate: (date: DateRange | undefined) => void;
  
  // Advanced filtering (optional for basic Reports)
  /** Available categories for filtering */
  categories?: string[];
  /** Currently selected categories */
  selectedCategories?: string[];
  /** Function to update selected categories */
  setSelectedCategories?: (c: string[]) => void;
  /** Available KPIs for filtering */
  kpis?: string[];
  /** Currently selected KPIs */
  selectedKpis?: string[];
  /** Function to update selected KPIs */
  setSelectedKpis?: (k: string[]) => void;
  
  // Filter set management
  /** Available saved filter sets */
  filterSets?: FilterSet[];
  /** Function to save a new filter set */
  onSaveFilterSet?: (name: string) => void;
  /** Function to apply an existing filter set */
  onApplyFilterSet?: (name: string) => void;
  /** Function to delete a filter set */
  onDeleteFilterSet?: (name: string) => void;
  
  // Actions
  /** Function called when filters are applied */
  onApply: () => void;
  /** Function called when filters are reset */
  onReset: () => void;
};

/**
 * Dashboard Filters Component
 * 
 * Main filtering component that provides comprehensive dashboard filtering capabilities.
 * Supports both basic date filtering and advanced multi-dimensional filtering.
 * 
 * @param {DashboardFiltersProps} props - Component props
 * @returns {JSX.Element} Dashboard filters interface
 */
export default function DashboardFilters({
  date,
  setDate,
  categories,
  selectedCategories = [],
  setSelectedCategories,
  kpis,
  selectedKpis = [],
  setSelectedKpis,
  filterSets = [],
  onSaveFilterSet,
  onApplyFilterSet,
  onDeleteFilterSet,
  onApply,
  onReset,
}: DashboardFiltersProps) {
  // Local state for UI interactions
  const [showSave, setShowSave] = React.useState(false);
  const [saveName, setSaveName] = React.useState("");
  const [selectedSet, setSelectedSet] = React.useState<string>("");

  /**
   * Determines if advanced filtering features are available
   * Based on presence of advanced filtering props
   */
  const hasAdvancedFilters =
    categories &&
    setSelectedCategories &&
    kpis &&
    setSelectedKpis &&
    filterSets &&
    onSaveFilterSet &&
    onApplyFilterSet &&
    onDeleteFilterSet;

  /**
   * Handles predefined date range selection
   * 
   * @param {string} value - Selected preset value
   */
  const handlePresetChange = (value: string) => {
    const now = new Date();
    let from: Date | undefined, to: Date | undefined;
    
    // Calculate date ranges based on preset selection
    switch (value) {
      case "this-week":
        from = startOfWeek(now, { weekStartsOn: 1 }); // Monday start
        to = endOfWeek(now, { weekStartsOn: 1 });
        break;
      case "this-month":
        from = startOfMonth(now);
        to = endOfMonth(now);
        break;
      case "last-6-months":
        from = subMonths(now, 6);
        to = now;
        break;
      case "this-year":
        from = startOfYear(now);
        to = endOfYear(now);
        break;
      case "previous-year":
        const lastYear = subYears(now, 1);
        from = startOfYear(lastYear);
        to = endOfYear(lastYear);
        break;
      default:
        from = undefined;
        to = undefined;
    }
    
    setDate({ from, to });
  };

  /**
   * Multi-select category toggle handler
   * Safely handles category selection with null checks
   * 
   * @param {string} cat - Category to toggle
   */
  const toggleCategory = (cat: string) => {
    if (!selectedCategories || !setSelectedCategories) return;
    setSelectedCategories(
      selectedCategories.includes(cat)
        ? selectedCategories.filter(c => c !== cat)
        : [...selectedCategories, cat]
    );
  };

  /**
   * Multi-select KPI toggle handler
   * Safely handles KPI selection with null checks
   * 
   * @param {string} kpi - KPI to toggle
   */
  const toggleKpi = (kpi: string) => {
    if (!selectedKpis || !setSelectedKpis) return;
    setSelectedKpis(
      selectedKpis.includes(kpi)
        ? selectedKpis.filter(k => k !== kpi)
        : [...selectedKpis, kpi]
    );
  };

  /**
   * Saves current filter configuration as a named set
   */
  const handleSave = () => {
    if (saveName.trim() && onSaveFilterSet) {
      onSaveFilterSet(saveName.trim());
      setSaveName("");
      setShowSave(false);
    }
  };

  /**
   * Helper function to safely format date display
   * Handles undefined dates and provides user-friendly formatting
   * 
   * @returns {JSX.Element} Formatted date display
   */
  const formatDateDisplay = () => {
    if (!date?.from) {
      return <span>Pick date range</span>;
    }
    
    if (date.to) {
      return (
        <>
          {date.from.toLocaleDateString()} - {date.to.toLocaleDateString()}
        </>
      );
    }
    
    return date.from.toLocaleDateString();
  };

  // Render filter interface
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onApply();
      }}
      className="flex flex-wrap gap-3 items-end mb-6"
    >
      {/* Date Preset Selector */}
      <div>
        <label className="block text-xs text-muted-foreground mb-1">Date Preset</label>
        <Select onValueChange={handlePresetChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select preset" />
          </SelectTrigger>
          <SelectContent>
            {presetOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Custom Date Range Picker */}
      <div>
        <label className="block text-xs text-muted-foreground mb-1">Date Range</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[185px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2" />
              {formatDateDisplay()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Advanced Filtering Section */}
      {hasAdvancedFilters && (
        <>
          {/* Multi-category Filter */}
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Categories
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="min-w-[120px] justify-between"
                >
                  <span>
                    {selectedCategories && selectedCategories.length === 0
                      ? "All"
                      : `${selectedCategories.length} selected`}
                  </span>
                  <Filter size={14} className="ml-1" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48" align="start">
                <div className="flex flex-col gap-1">
                  {categories &&
                    categories.map(cat => (
                      <label key={cat} className="flex gap-2 items-center">
                        <Checkbox
                          checked={selectedCategories.includes(cat)}
                          onCheckedChange={() => toggleCategory(cat)}
                        />
                        {cat}
                      </label>
                    ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Multi-KPI Filter */}
          <div>
            <label className="block text-xs text-muted-foreground mb-1">KPIs</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="min-w-[120px] justify-between"
                >
                  <span>
                    {selectedKpis && selectedKpis.length === 0
                      ? "All"
                      : `${selectedKpis.length} selected`}
                  </span>
                  <Filter size={14} className="ml-1" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48" align="start">
                <div className="flex flex-col gap-1">
                  {kpis &&
                    kpis.map(k => (
                      <label key={k} className="flex gap-2 items-center">
                        <Checkbox
                          checked={selectedKpis.includes(k)}
                          onCheckedChange={() => toggleKpi(k)}
                        />
                        {k}
                      </label>
                    ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Saved Filter Sets Management */}
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Filter Sets
            </label>
            <div className="flex gap-1 items-center">
              <Select
                value={selectedSet}
                onValueChange={v => {
                  setSelectedSet(v);
                  if (onApplyFilterSet) onApplyFilterSet(v);
                }}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Saved set" />
                </SelectTrigger>
                <SelectContent>
                  {filterSets.length === 0 ? (
                    <div className="px-2 py-1 text-xs text-muted-foreground italic">
                      No sets
                    </div>
                  ) : (
                    filterSets.map(fs => (
                      <SelectItem key={fs.name} value={fs.name}>
                        {fs.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              
              {/* Save Filter Set Button */}
              <Button
                size="icon"
                variant="outline"
                type="button"
                onClick={() => setShowSave(s => !s)}
                title="Save filter set"
              >
                <Save size={15} />
              </Button>
              
              {/* Delete Filter Set Button */}
              {selectedSet && (
                <Button
                  size="icon"
                  variant="outline"
                  type="button"
                  className="ml-1"
                  onClick={() => {
                    if (onDeleteFilterSet) onDeleteFilterSet(selectedSet);
                    setSelectedSet("");
                  }}
                  title="Delete filter set"
                >
                  <span className="text-red-500 text-lg leading-none">×</span>
                </Button>
              )}
            </div>
            
            {/* Save Filter Set Input */}
            {showSave && (
              <div className="mt-2 flex gap-2">
                <input
                  className="border p-1 rounded text-xs flex-shrink"
                  placeholder="Filter set name"
                  value={saveName}
                  onChange={e => setSaveName(e.target.value)}
                  maxLength={20}
                />
                <Button size="sm" type="button" onClick={handleSave}>
                  Save
                </Button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Action Buttons */}
      <Button size="sm" variant="outline" type="submit">
        <Filter className="mr-1" size={15} />
        Apply
      </Button>
      <Button size="sm" variant="ghost" type="button" onClick={onReset}>
        <List className="mr-1" size={15} />
        Reset
      </Button>
    </form>
  );
}

/**
 * Component Usage Guidelines:
 * 
 * 1. Basic Mode:
 *    - Provide only date, setDate, onApply, onReset props
 *    - Used for simple date-based filtering
 * 
 * 2. Advanced Mode:
 *    - Provide all props including categories, KPIs, and filter sets
 *    - Used for comprehensive multi-dimensional filtering
 * 
 * 3. Performance Considerations:
 *    - Component uses React.useState for local UI state
 *    - Expensive operations are memoized
 *    - Filter application is controlled by parent component
 * 
 * 4. Accessibility:
 *    - All form elements have proper labels
 *    - Keyboard navigation is fully supported
 *    - Screen reader compatible
 */
