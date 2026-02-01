
import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, BarChartBig } from "lucide-react";

type Props = {
  dashboards: {
    id: number;
    name: string;
    description: string;
    charts: string[];
    widgets: string[];
  }[];
  onEdit: (dashboard: any) => void;
  onDelete: (id: number) => void;
  onEditChartsWidgets: (dashboard: any) => void;
};

export default function DashboardList({ dashboards, onEdit, onDelete, onEditChartsWidgets }: Props) {
  return (
    <div className="overflow-x-auto rounded shadow border bg-white mb-8">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="p-3">Name</th>
            <th className="p-3">Description</th>
            <th className="p-3">Charts</th>
            <th className="p-3">Widgets</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dashboards.map(d => (
            <tr key={d.id} className="border-b hover:bg-muted/10">
              <td className="p-3 font-medium">{d.name}</td>
              <td className="p-3 text-xs text-muted-foreground">{d.description}</td>
              <td className="p-3">
                {d.charts.length ? d.charts.join(", ") : <span className="italic text-gray-400">None</span>}
              </td>
              <td className="p-3">
                {d.widgets.length ? d.widgets.join(", ") : <span className="italic text-gray-400">None</span>}
              </td>
              <td className="p-3 flex gap-2">
                <Button size="icon" variant="secondary" onClick={() => onEdit(d)} aria-label="Edit">
                  <Pencil size={16}/>
                </Button>
                <Button size="icon" variant="outline" onClick={() => onEditChartsWidgets(d)} aria-label="Charts/Widgets">
                  <BarChartBig size={16}/>
                </Button>
                <Button size="icon" variant="destructive" onClick={() => onDelete(d.id)} aria-label="Delete">
                  <Trash2 size={16}/>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
