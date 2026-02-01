
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Props = {
  open: boolean;
  dashboard: { id: number; charts: string[]; widgets: string[] } | null;
  allCharts: string[];
  allWidgets: string[];
  onSave: (id: number, charts: string[], widgets: string[]) => void;
  onOpenChange: (open: boolean) => void;
};

export default function ChartWidgetEditDialog({ open, dashboard, allCharts, allWidgets, onSave, onOpenChange }: Props) {
  const [charts, setCharts] = useState<string[]>([]);
  const [widgets, setWidgets] = useState<string[]>([]);

  useEffect(() => {
    setCharts(dashboard?.charts ?? []);
    setWidgets(dashboard?.widgets ?? []);
  }, [dashboard, open]);

  const toggle = (arr: string[], set: (v: string[]) => void, val: string) => {
    set(arr.includes(val) ? arr.filter(c => c !== val) : [...arr, val]);
  };

  if (!dashboard) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Charts & Widgets</DialogTitle>
        </DialogHeader>
        <div>
          <Label className="mb-2 block">Charts</Label>
          <div className="flex gap-2 flex-wrap mb-4">
            {allCharts.map(chart => (
              <Button
                key={chart}
                size="sm"
                variant={charts.includes(chart) ? "secondary" : "outline"}
                onClick={() => toggle(charts, setCharts, chart)}
                type="button"
              >
                {chart}
              </Button>
            ))}
          </div>
          <Label className="mb-2 block">Widgets</Label>
          <div className="flex gap-2 flex-wrap mb-4">
            {allWidgets.map(widget => (
              <Button
                key={widget}
                size="sm"
                variant={widgets.includes(widget) ? "secondary" : "outline"}
                onClick={() => toggle(widgets, setWidgets, widget)}
                type="button"
              >
                {widget}
              </Button>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onSave(dashboard.id, charts, widgets)}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
