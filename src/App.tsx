
/**
 * Main Application Component
 * 
 * This is the root component that sets up the entire application structure with:
 * - Theme management (light/dark mode support)
 * - Dashboard state management context
 * - React Query for server state management
 * - React Router for client-side navigation
 * - Toast notifications system
 * - Tooltip provider for UI enhancements
 * 
 * Libraries used:
 * - React Router: Client-side routing and navigation
 * - React Query: Server state management and caching
 * - Shadcn/UI: Component library with toast and tooltip systems
 * 
 * Architecture:
 * - Provider pattern for state management
 * - Context API for theme and dashboard state
 * - Centralized routing configuration
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import PageLoader from "@/components/PageLoader";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DashboardProvider } from "@/contexts/DashboardContext";

// Lazy-loaded routes for performance code-splitting
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const FeedbackPage = lazy(() => import("./pages/FeedbackPage"));
const QRFeaturesPage = lazy(() => import("./pages/QRFeaturesPage"));
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const DashboardHome = lazy(() => import("./pages/DashboardHome"));
const ReportsPage = lazy(() => import("./pages/ReportsPage"));
const DataSourcesPage = lazy(() => import("./pages/DataSourcesPage"));
const SchedulesPage = lazy(() => import("./pages/SchedulesPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const RoleMgmtPage = lazy(() => import("./pages/RoleMgmtPage"));
const HistoryPage = lazy(() => import("./pages/HistoryPage"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));
const AuditLogsPage = lazy(() => import("./pages/AuditLogsPage"));
const SharePage = lazy(() => import("./pages/SharePage"));
const UsersPage = lazy(() => import("./pages/UsersPage"));
const AdminDashboardMgmt = lazy(() => import("./pages/AdminDashboardMgmt"));
const FormBuilderPage = lazy(() => import("./pages/FormBuilderPage"));
const DynamicFormPage = lazy(() => import("./pages/DynamicFormPage"));
const DocumentPage = lazy(() => import("./pages/DocumentPage"));
const McpServerPage = lazy(() => import("./pages/McpServerPage"));

/**
 * React Query Client Configuration
 * Provides caching, background updates, and error handling for API calls
 */
const queryClient = new QueryClient();

/**
 * App Component
 * 
 * Main application component that wraps all providers and routing.
 * Uses a hierarchical provider structure to ensure proper context availability:
 * 
 * Provider Hierarchy:
 * 1. ThemeProvider - Manages light/dark theme state
 * 2. DashboardProvider - Manages dashboard-specific state
 * 3. QueryClientProvider - Manages server state and API calls
 * 4. TooltipProvider - Enables tooltips throughout the app
 * 5. BrowserRouter - Enables client-side routing
 * 
 * @returns {JSX.Element} The complete application with all providers and routing
 */
const App = () => (
  <ThemeProvider>
    <DashboardProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {/* Dual toast system for different notification types */}
          <Toaster />
          <Sonner />
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <ErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Dashboard Routes - Protected by DashboardLayout */}
                  <Route
                    path="/"
                    element={
                      <DashboardLayout>
                        <DashboardHome />
                      </DashboardLayout>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <DashboardLayout>
                        <AdminDashboardMgmt />
                      </DashboardLayout>
                    }
                  />
                  <Route
                    path="/reports"
                    element={
                      <DashboardLayout>
                        <ReportsPage />
                      </DashboardLayout>
                    }
                  />
                  <Route
                    path="/data-sources"
                    element={
                      <DashboardLayout>
                        <DataSourcesPage />
                      </DashboardLayout>
                    }
                  />
                  <Route
                    path="/schedules"
                    element={
                      <DashboardLayout>
                        <SchedulesPage />
                      </DashboardLayout>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <DashboardLayout>
                        <ProfilePage />
                      </DashboardLayout>
                    }
                  />
                  <Route
                    path="/roles"
                    element={
                      <DashboardLayout>
                        <RoleMgmtPage />
                      </DashboardLayout>
                    }
                  />
                  <Route
                    path="/users"
                    element={
                      <DashboardLayout>
                        <UsersPage />
                      </DashboardLayout>
                    }
                  />
                  <Route
                    path="/history"
                    element={
                      <DashboardLayout>
                        <HistoryPage />
                      </DashboardLayout>
                    }
                  />
                  <Route
                    path="/notifications"
                    element={
                      <DashboardLayout>
                        <NotificationsPage />
                      </DashboardLayout>
                    }
                  />
                  <Route
                    path="/audit-logs"
                    element={
                      <DashboardLayout>
                        <AuditLogsPage />
                      </DashboardLayout>
                    }
                  />
                  <Route
                    path="/share/:id"
                    element={
                      <DashboardLayout>
                        <SharePage />
                      </DashboardLayout>
                    }
                  />
                  <Route
                    path="/feedback"
                    element={
                      <DashboardLayout>
                        <FeedbackPage />
                      </DashboardLayout>
                    }
                  />
                  <Route
                    path="/qr-features"
                    element={
                      <DashboardLayout>
                        <QRFeaturesPage />
                      </DashboardLayout>
                    }
                  />
                  <Route
                    path="/form-builder"
                    element={
                      <DashboardLayout>
                        <FormBuilderPage />
                      </DashboardLayout>
                    }
                  />
                  {/* Dynamic form route - no layout wrapper for embedded use */}
                  <Route
                    path="/form/:formId"
                    element={<DynamicFormPage />}
                  />
                  <Route
                    path="/document"
                    element={
                      <DashboardLayout>
                        <DocumentPage />
                      </DashboardLayout>
                    }
                  />
                  <Route
                    path="/mcp-server"
                    element={
                      <DashboardLayout>
                        <McpServerPage />
                      </DashboardLayout>
                    }
                  />
                  <Route
                    path="/mcp/:serverId"
                    element={
                      <DashboardLayout>
                        <McpServerPage />
                      </DashboardLayout>
                    }
                  />
                  
                  {/* Authentication Pages - Standalone without dashboard layout */}
                  <Route path="/signin" element={<SignInPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  
                  {/* 404 Handler */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </DashboardProvider>
  </ThemeProvider>
);

export default App;
