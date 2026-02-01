import { Link, useLocation } from "react-router-dom";
import {
  Database,
  FileText,
  Users,
  Settings,
  Calendar,
  Bell,
  ChartBar,
  FilePlus,
  QrCode,
  ClipboardList,
  ServerCog,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export const navItems = [
  { to: "/", label: "Dashboard", icon: ChartBar, description: "Main dashboard with overview analytics" },
  { to: "/reports", label: "Reports", icon: FileText, description: "Create and view report templates" },
  { to: "/data-sources", label: "Data Sources", icon: Database, description: "Manage your connected data sources" },
  { to: "/schedules", label: "Schedules", icon: Calendar, description: "View and set up report schedules" },
  { to: "/notifications", label: "Notifications", icon: Bell, description: "View alerts and notification settings" },
  { to: "/audit-logs", label: "Audit Logs", icon: FilePlus, description: "Browse system audit logs" },
  { to: "/history", label: "Report History", icon: FileText, description: "See submitted report history" },
  { to: "/qr-features", label: "QR Features", icon: QrCode, description: "QR code and scan tools" },
  { to: "/form-builder", label: "Form Builder", icon: ClipboardList, description: "Create or fill custom data forms" },
  // New Document nav item
  { to: "/document", label: "Document", icon: FileText, description: "E-sign documents via DocuSign" },
  { to: "/mcp-server", label: "MCP Server", icon: "server-cog", description: "Setup & manage MCP dashboard/report server APIs" },
  { to: "/profile", label: "Profile", icon: Users, description: "Your account profile and preferences" },
  { to: "/roles", label: "Role Mgmt", icon: Settings, description: "Manage roles and permissions" },
  { to: "/share", label: "Share/Export", icon: FilePlus, description: "Share or export your data" },
];

export default function DashboardNav() {
  const { pathname } = useLocation();
  return (
    <Sidebar
      className="
        bg-gradient-to-b
        from-purple-200 via-blue-100 to-cyan-100
        dark:from-[#232857] dark:via-[#322d58] dark:to-[#194453]
        border-r border-white/40 dark:border-black/40
        shadow-xl
        transition-all duration-500
      "
    >
      <SidebarHeader className="flex h-16 items-center justify-center">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Database className="h-6 w-6 text-primary" />
          <span className="group-data-[collapsible=icon]:hidden">ReportForge</span>
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            // Map string icon to component for MCP Server
            const IconComponent =
              item.icon === "server-cog"
                ? ServerCog
                : item.icon;
            return (
              <SidebarMenuItem key={item.to}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.to}
                      tooltip={{
                        children: item.label,
                        side: "right",
                        align: "center",
                      }}
                    >
                      <Link to={item.to}>
                        <IconComponent size={20} />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    {item.description}
                  </TooltipContent>
                </Tooltip>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
