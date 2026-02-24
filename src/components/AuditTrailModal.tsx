import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AuditTrailTable, { Audit } from "./AuditTrailTable";

type AuditTrailModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  audits: Audit[];
};

export default function AuditTrailModal({ open, onOpenChange, audits }: AuditTrailModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Audit Trail History</DialogTitle>
          <DialogDescription>
            A comprehensive log of all user actions taken during this session.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">
          {/* Reuse the existing table component without its container margin to fit cleanly */}
          <div className="[&>div]:m-0 [&>div]:shadow-none [&>div]:border-none">
            <AuditTrailTable audits={audits} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
