
/**
 * Dashboard Context Provider
 * 
 * Manages global dashboard state using React Context API.
 * Provides centralized state management for dashboard-related data including
 * dashboard configurations, chart data, and widget settings.
 * 
 * Features:
 * - Centralized dashboard state management
 * - Type-safe context with TypeScript
 * - Error boundary for context usage
 * - Demo data for development and testing
 * 
 * Use Cases:
 * - Sharing dashboard data across components
 * - Managing multiple dashboard configurations
 * - Synchronizing dashboard state changes
 * - Persisting dashboard preferences
 */

import React, { createContext, useContext, useState } from "react";

/**
 * Dashboard Type Definition
 * 
 * Defines the structure of a dashboard object used throughout the application.
 * 
 * @interface Dashboard
 * @property {number} id - Unique identifier for the dashboard
 * @property {string} name - Display name of the dashboard
 * @property {string} description - Brief description of dashboard purpose
 * @property {string[]} charts - Array of chart identifiers included in dashboard
 * @property {string[]} widgets - Array of widget identifiers included in dashboard
 */
export type Dashboard = {
  id: number;
  name: string;
  description: string;
  charts: string[];
  widgets: string[];
};

/**
 * Dashboard Context Type Definition
 * 
 * Defines the shape of the context value provided to consuming components.
 * 
 * @interface DashboardContextType
 * @property {Dashboard[]} dashboards - Array of all available dashboards
 * @property {React.Dispatch<React.SetStateAction<Dashboard[]>>} setDashboards - State setter for dashboards
 */
type DashboardContextType = {
  dashboards: Dashboard[];
  setDashboards: React.Dispatch<React.SetStateAction<Dashboard[]>>;
};

/**
 * Dashboard Context
 * 
 * React context for sharing dashboard state across the component tree.
 * Initialized as undefined to enforce proper provider usage.
 */
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

/**
 * Dashboard Context Hook
 * 
 * Custom hook for accessing dashboard context with built-in error handling.
 * Ensures context is used within a DashboardProvider boundary.
 * 
 * @returns {DashboardContextType} Dashboard context value
 * @throws {Error} When used outside of DashboardProvider
 * 
 * @example
 * function MyComponent() {
 *   const { dashboards, setDashboards } = useDashboardContext();
 *   
 *   const addDashboard = (newDashboard: Dashboard) => {
 *     setDashboards(prev => [...prev, newDashboard]);
 *   };
 *   
 *   return (
 *     <div>
 *       {dashboards.map(dashboard => (
 *         <div key={dashboard.id}>{dashboard.name}</div>
 *       ))}
 *     </div>
 *   );
 * }
 */
export function useDashboardContext() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboardContext must be used within DashboardProvider");
  return ctx;
}

/**
 * Demo Dashboard Data
 * 
 * Predefined dashboard configurations for development and demonstration purposes.
 * These provide realistic examples of dashboard structures and content.
 */
const DEMO_DASHBOARDS: Dashboard[] = [
  { 
    id: 1, 
    name: "Executive Overview", 
    description: "Summary for execs", 
    charts: ["Revenue Over Time"], 
    widgets: ["KPI: Total Revenue"] 
  },
  { 
    id: 2, 
    name: "Retail Performance", 
    description: "Sales and KPIs for retail", 
    charts: ["Sales by Category", "Profit Distribution"], 
    widgets: ["KPI: Conversion Rate"] 
  },
];

/**
 * Dashboard Provider Component
 * 
 * Provides dashboard context to all child components.
 * Manages dashboard state and provides methods for state manipulation.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap with context
 * @returns {JSX.Element} Context provider wrapper
 * 
 * @example
 * function App() {
 *   return (
 *     <DashboardProvider>
 *       <DashboardHome />
 *       <ReportsPage />
 *     </DashboardProvider>
 *   );
 * }
 */
export function DashboardProvider({ children }: { children: React.ReactNode }) {
  // Initialize state with demo data
  const [dashboards, setDashboards] = useState<Dashboard[]>(DEMO_DASHBOARDS);

  /**
   * Context value object
   * Contains all dashboard state and state manipulation functions
   */
  const contextValue: DashboardContextType = {
    dashboards,
    setDashboards,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
}

/**
 * Future Enhancements:
 * 
 * 1. Persistence Layer:
 *    - Add localStorage persistence
 *    - Implement server synchronization
 *    - Add offline support
 * 
 * 2. Advanced State Management:
 *    - Add dashboard filtering/sorting
 *    - Implement dashboard templates
 *    - Add dashboard sharing capabilities
 * 
 * 3. Performance Optimizations:
 *    - Implement memoization for large dashboard lists
 *    - Add virtual scrolling for dashboard grids
 *    - Optimize re-renders with React.memo
 * 
 * 4. Additional Features:
 *    - Dashboard versioning
 *    - Import/export functionality
 *    - Dashboard analytics and usage tracking
 */
