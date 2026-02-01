
import React from "react";

type CreatedForm = {
  id: string;
  name: string;
  fields: {
    id: string;
    label: string;
    type: string;
    required: boolean;
  }[];
};

interface CreatedFormsPanelProps {
  forms: CreatedForm[];
}

export default function CreatedFormsPanel({ forms }: CreatedFormsPanelProps) {
  if (forms.length === 0) {
    return (
      <aside className="p-4 bg-muted/40 border rounded min-h-[120px]">
        <p className="text-xs text-muted-foreground">No forms created yet.</p>
      </aside>
    );
  }

  return (
    <aside className="p-4 bg-muted/40 border rounded min-h-[120px]">
      <div className="font-semibold mb-2">Created Forms</div>
      <ul className="space-y-2">
        {forms.map(form => (
          <li key={form.id} className="border rounded px-3 py-2 bg-white shadow-sm">
            <div className="font-bold">{form.name}</div>
            <div className="text-xs text-muted-foreground">Fields: {form.fields.length}</div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
