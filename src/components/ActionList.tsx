
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

type Action = {
  id: number;
  name: string;
  description: string;
};

type ActionListProps = {
  actions: Action[];
  selectedActionIds: number[];
  onToggleAction: (actionId: number) => void;
};

export function ActionList({ actions, selectedActionIds, onToggleAction }: ActionListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map(action => (
          <label key={action.id} className="flex items-center gap-2 cursor-pointer text-sm">
            <Checkbox
              checked={selectedActionIds.includes(action.id)}
              onCheckedChange={() => onToggleAction(action.id)}
            />
            <span>
              <span className="font-medium">{action.name}</span>{" "}
              <span className="text-xs text-muted-foreground">{action.description}</span>
            </span>
          </label>
        ))}
      </CardContent>
    </Card>
  );
}
