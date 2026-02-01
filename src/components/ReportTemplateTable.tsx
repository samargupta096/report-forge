
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";

type Template = {
  id: number;
  name: string;
  type: string;
  updated: string;
  description?: string;
};

type VisibleColumns = {
  name: boolean;
  type: boolean;
  updated: boolean;
  description: boolean;
  actions: boolean;
};

export default function ReportTemplateTable({
  templates,
  onDelete,
  visibleColumns,
}: {
  templates: Template[];
  onDelete: (id: number) => void;
  visibleColumns: VisibleColumns;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {visibleColumns.name && <TableHead>Template Name</TableHead>}
          {visibleColumns.type && <TableHead>Type</TableHead>}
          {visibleColumns.updated && <TableHead>Last Edited</TableHead>}
          {visibleColumns.description && <TableHead>Description</TableHead>}
          {visibleColumns.actions && <TableHead className="w-32">Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {templates.length === 0 && (
          <TableRow>
            <TableCell colSpan={Object.values(visibleColumns).filter(Boolean).length} className="text-center text-muted-foreground">
              No templates created yet.
            </TableCell>
          </TableRow>
        )}
        {templates.map((tpl) => (
          <TableRow key={tpl.id}>
            {visibleColumns.name && <TableCell>{tpl.name}</TableCell>}
            {visibleColumns.type && <TableCell>{tpl.type}</TableCell>}
            {visibleColumns.updated && <TableCell>{tpl.updated}</TableCell>}
            {visibleColumns.description && (
              <TableCell className="max-w-xs truncate">{tpl.description || <span className="text-muted-foreground">–</span>}</TableCell>
            )}
            {visibleColumns.actions && (
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" title="Edit" disabled>
                    <Edit className="mr-1" size={16} />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" title="Delete" onClick={() => onDelete(tpl.id)}>
                    <Trash2 className="mr-1" size={16} />
                    Delete
                  </Button>
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
