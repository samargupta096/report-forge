
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Props = {
  open: boolean;
  dashboard: { id: number; name: string; description: string; charts: string[]; widgets: string[] } | null;
  onSave: (values: { id: number; name: string; description: string; charts: string[]; widgets: string[] }) => void;
  onOpenChange: (open: boolean) => void;
};

export default function DashboardEditDialog({ open, dashboard, onSave, onOpenChange }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(dashboard?.name ?? "");
    setDescription(dashboard?.description ?? "");
  }, [dashboard, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dashboard?.id && dashboard.id !== 0 ? "Edit Dashboard" : "Create Dashboard"}</DialogTitle>
        </DialogHeader>
        <form className="space-y-3" 
              onSubmit={e => { 
                e.preventDefault(); 
                onSave({ id: dashboard?.id ?? 0, name, description, charts: dashboard?.charts ?? [], widgets: dashboard?.widgets ?? [] }); 
              }}>
          <div>
            <Label>Name</Label>
            <Input value={name} onChange={e => setName(e.target.value)} required/>
          </div>
          <div>
            <Label>Description</Label>
            <Input value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <DialogFooter>
            <Button type="submit">{dashboard?.id && dashboard.id !== 0 ? "Update" : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
