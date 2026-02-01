import { Link, useLocation } from "react-router-dom";
import DashboardNav, { navItems } from "../components/DashboardNav";
import ThemeSwitcher from "../components/ThemeSwitcher";
import AdminNavLink from "../components/AdminNavLink";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import UserAvatarMenu from "@/components/UserAvatarMenu";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const currentPage = navItems.find((item) => item.to === pathname);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col md:flex-row bg-gradient-to-br from-purple-100 via-blue-100 to-cyan-100 dark:from-[#22263c] dark:via-[#33314e] dark:to-[#10313f] transition-colors duration-500">
        <DashboardNav />
        <div className="flex flex-1 flex-col min-w-0">
          <header className="flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
              <div className="flex items-center gap-4 min-w-0">
                  <SidebarTrigger />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link to="/">Dashboard</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {currentPage && pathname !== "/" && (
                        <>
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                            <BreadcrumbPage className="truncate max-w-[110px] md:max-w-xs">{currentPage.label}</BreadcrumbPage>
                          </BreadcrumbItem>
                        </>
                      )}
                    </BreadcrumbList>
                  </Breadcrumb>
                  {/* Add Admin nav link for demo */}
                  <span className="ml-2">
                    <AdminNavLink />
                  </span>
              </div>
              <div className="flex items-center gap-3">
                <ThemeSwitcher />
                <UserAvatarMenu />
              </div>
          </header>
          <main className="flex-1 p-2 sm:p-4 md:p-6 min-w-0 overflow-x-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
