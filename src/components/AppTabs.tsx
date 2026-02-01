
import { useState } from "react";
import { Database, Merge, Delete } from "lucide-react";
import { cn } from "../lib/utils";

const tabs = [
  { id: "db-config", label: "Database Config", icon: Database },
  { id: "report", label: "Generate Report", icon: Database },
  { id: "merge", label: "Merge Records", icon: Merge },
  { id: "delete", label: "Delete Records", icon: Delete },
];

type TabId = typeof tabs[number]["id"];

interface AppTabsProps {
  defaultTab?: TabId;
  children: {
    [K in TabId]?: React.ReactNode;
  };
}

export function AppTabs({ defaultTab = "db-config", children }: AppTabsProps) {
  const [active, setActive] = useState<TabId>(defaultTab);

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-2 border-b bg-white dark:bg-background mb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "flex items-center gap-2 px-5 py-2 -mb-px border-b-2 transition font-medium",
              active === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-primary"
            )}
            onClick={() => setActive(tab.id as TabId)}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-4">{children[active]}</div>
    </div>
  );
}
