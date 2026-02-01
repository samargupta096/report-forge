import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import DashboardList from "../components/DashboardList";
import DashboardEditDialog from "../components/DashboardEditDialog";
import ChartWidgetEditDialog from "../components/ChartWidgetEditDialog";
import DashboardRoleAssignment from "../components/DashboardRoleAssignment";
import { Plus } from "lucide-react";

// Types
type Dashboard = {
  id: number;
  name: string;
  description: string;
  charts: string[];
  widgets: string[];
};

type Role = {
  id: number;
  name: string;
  dashboards: number[]; // dashboard ids
};

type User = {
  id: number;
  name: string;
  roles: number[]; // role ids
};

// Context
import { useDashboardContext } from "../contexts/DashboardContext";

// Demo data
const DEMO_CHARTS = ["Revenue Over Time", "Sales by Category", "Active Clients", "Profit Distribution"];
const DEMO_WIDGETS = ["KPI: Total Revenue", "KPI: Active Users", "KPI: Conversion Rate"];

const DEMO_ROLES: Role[] = [
  { id: 1, name: "Admin", dashboards: [1,2] },
  { id: 2, name: "Manager", dashboards: [1] },
];

const DEMO_USERS: User[] = [
  { id: 1, name: "Alex Johnson", roles: [1] },
  { id: 2, name: "Jamie Carter", roles: [2] },
];

export default function AdminDashboardMgmt() {
  // ====== USE CONTEXT DASHBOARDS INSTEAD ====
  const { dashboards, setDashboards } = useDashboardContext();
  // ===========================================

  // Local state
  const [roles, setRoles] = useState<Role[]>(DEMO_ROLES);
  const [users, setUsers] = useState<User[]>(DEMO_USERS);

  // Dialog controls
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingDashboard, setEditingDashboard] = useState<Dashboard | null>(null);

  const [chartWidgetDialogOpen, setChartWidgetDialogOpen] = useState(false);
  const [dashboardForChartWidget, setDashboardForChartWidget] = useState<Dashboard | null>(null);

  // CRUD handlers **use context setDashboards**
  const handleCreate = () => {
    setEditingDashboard({ id: 0, name: "", description: "", charts: [], widgets: [] });
    setEditDialogOpen(true);
  };
  const handleEdit = (dashboard: Dashboard) => {
    setEditingDashboard(dashboard);
    setEditDialogOpen(true);
  };
  const handleDelete = (id: number) => {
    setDashboards(ds => ds.filter(d => d.id !== id));
    setRoles(rs => rs.map(r => ({ ...r, dashboards: r.dashboards.filter(did => did !== id) })));
  };
  const handleSaveDashboard = (values: Dashboard) => {
    if (values.id === 0) {
      // Create
      setDashboards(ds => [{ ...values, id: Date.now() }, ...ds]);
    } else {
      // Update
      setDashboards(ds => ds.map(d => d.id === values.id ? values : d));
    }
    setEditDialogOpen(false);
    setEditingDashboard(null);
  };

  // Chart/Widget handler
  const handleEditChartsWidgets = (dashboard: Dashboard) => {
    setDashboardForChartWidget(dashboard);
    setChartWidgetDialogOpen(true);
  };
  const handleSaveChartsWidgets = (id: number, charts: string[], widgets: string[]) => {
    setDashboards(ds => ds.map(d =>
      d.id === id ? { ...d, charts, widgets } : d
    ));
    setChartWidgetDialogOpen(false);
  };

  // Role assignment handlers
  const handleAssignDashboardToRole = (roleId: number, dashboardId: number) => {
    setRoles(rs => rs.map(r =>
      r.id === roleId && !r.dashboards.includes(dashboardId)
        ? { ...r, dashboards: [...r.dashboards, dashboardId] }
        : r
    ));
  };
  const handleRemoveDashboardFromRole = (roleId: number, dashboardId: number) => {
    setRoles(rs => rs.map(r =>
      r.id === roleId
        ? { ...r, dashboards: r.dashboards.filter(id => id !== dashboardId) }
        : r
    ));
  };
  // Role→User
  const handleAssignRoleToUser = (userId: number, roleId: number) => {
    setUsers(us => us.map(u =>
      u.id === userId && !u.roles.includes(roleId)
        ? { ...u, roles: [...u.roles, roleId] }
        : u
    ));
  };
  const handleRemoveRoleFromUser = (userId: number, roleId: number) => {
    setUsers(us => us.map(u =>
      u.id === userId
        ? { ...u, roles: u.roles.filter(rid => rid !== roleId) }
        : u
    ));
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard Management</h2>
        <Button onClick={handleCreate}><Plus size={18} className="mr-1"/> New Dashboard</Button>
      </div>
      <DashboardList
        dashboards={dashboards}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onEditChartsWidgets={handleEditChartsWidgets}
      />
      <DashboardEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        dashboard={editingDashboard}
        onSave={handleSaveDashboard}
      />
      <ChartWidgetEditDialog
        open={chartWidgetDialogOpen}
        dashboard={dashboardForChartWidget}
        allCharts={DEMO_CHARTS}
        allWidgets={DEMO_WIDGETS}
        onSave={handleSaveChartsWidgets}
        onOpenChange={setChartWidgetDialogOpen}
      />
      <div className="mt-10">
        <DashboardRoleAssignment
          dashboards={dashboards}
          roles={roles}
          users={users}
          onAssignDashboardToRole={handleAssignDashboardToRole}
          onRemoveDashboardFromRole={handleRemoveDashboardFromRole}
          onAssignRoleToUser={handleAssignRoleToUser}
          onRemoveRoleFromUser={handleRemoveRoleFromUser}
        />
      </div>
    </section>
  );
}
