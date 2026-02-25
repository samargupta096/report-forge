import React, { useState, useEffect } from "react";
import { Command } from "cmdk";
import { useNavigate } from "react-router-dom";
import { Search, FileText, Database, Calendar, Users, Settings, Activity, Shield, LayoutDashboard, Bell, FileSpreadsheet, Box } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle the menu when ⌘K or ctrl k is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 overflow-hidden shadow-2xl border-border bg-card max-w-xl">
        <Command className="[&_[cmdk-root]]:min-h-[300px] [&_[cmdk-root]]:flex [&_[cmdk-root]]:flex-col bg-card w-full h-full">
          <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input
              autoFocus
              placeholder="Type a command or search..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0 focus-visible:ring-0 focus:ring-0 text-foreground"
            />
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">No results found.</Command.Empty>
            
            <Command.Group heading="Navigation" className="text-muted-foreground text-xs [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-semibold">
              <Command.Item
                onSelect={() => runCommand(() => navigate("/"))}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate("/reports"))}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <FileText className="mr-2 h-4 w-4" />
                Reports
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate("/data-sources"))}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Database className="mr-2 h-4 w-4" />
                Data Sources
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate("/schedules"))}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedules
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate("/users"))}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Users className="mr-2 h-4 w-4" />
                Users
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate("/roles"))}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Shield className="mr-2 h-4 w-4" />
                Role Management
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate("/history"))}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Activity className="mr-2 h-4 w-4" />
                History
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate("/audit-logs"))}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <FileText className="mr-2 h-4 w-4" />
                Audit Logs
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate("/mcp"))}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Box className="mr-2 h-4 w-4" />
                AI MCP Server
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate("/dynamic-forms"))}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Dynamic Forms
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate("/notifications"))}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Command.Item>
            </Command.Group>
            
            <Command.Separator className="-mx-1 h-px bg-border my-1" />
            
            <Command.Group heading="Settings" className="text-muted-foreground text-xs [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-semibold">
              <Command.Item
                onSelect={() => runCommand(() => navigate("/profile"))}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Settings className="mr-2 h-4 w-4" />
                Profile Settings
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
