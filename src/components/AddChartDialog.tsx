import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type ChartType = 
  | "Bar Chart" | "Line Chart" | "Pie Chart" | "Donut Chart" | "Area Chart"
  | "Bubble Chart" | "Combo Chart" | "Scatter Chart" | "Stacked Bar Chart"
  | "Heat Map" | "Calendar Heat Map" | "Violin Chart" | "Sankey Chart"
  | "India Map" | "State Map" | "City Map" | "Candle Stick" | "Treemap";

const CHART_TYPES: ChartType[] = [
  "Line Chart", "Bar Chart", "Pie Chart", "Donut Chart", "Area Chart",
  "Scatter Chart", "Stacked Bar Chart", "Combo Chart", "Bubble Chart",
  "Heat Map", "Calendar Heat Map", "Treemap", "Violin Chart", "Sankey Chart",
  "Candle Stick", "India Map", "State Map", "City Map"
];

type AddChartDialogProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (chart: { title: string; type: string; description?: string }) => void;
};

export default function AddChartDialog({ open, onClose, onAdd }: AddChartDialogProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<ChartType | "">("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (!title || !type) return;
    onAdd({
      title,
      type,
      description: description || undefined,
    });
    // Reset
    setTitle("");
    setType("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Visualization Widget</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Monthly Users"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Chart Type
            </Label>
            <div className="col-span-3">
              <Select value={type} onValueChange={(val) => setType(val as ChartType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a chart type" />
                </SelectTrigger>
                <SelectContent>
                  {CHART_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional brief description"
              className="col-span-3"
              rows={2}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleAdd} disabled={!title || !type}>
            Add Widget
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
