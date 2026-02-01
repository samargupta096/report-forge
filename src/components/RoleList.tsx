import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Action = {
  id: number;
  name: string;
  description: string;
};

type Role = {
  id: number;
  name: string;
  description: string;
  actionIds: number[];
};

type RoleListProps = {
  selectedRoleId: number | null;
  setSelectedRoleId: (id: number) => void;
  roles: Role[];
  actions: Action[];
  onEditActions: (roleId: number) => void;
};

export function RoleList({ selectedRoleId, setSelectedRoleId, roles, actions, onEditActions }: RoleListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Roles</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {roles.map((role) => (
          <div key={role.id} className="relative group">
            <button
              type="button"
              className={`w-full flex flex-col items-start gap-0.5 py-2 text-left rounded ${
                selectedRoleId === role.id ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted/40"
              }`}
              onClick={() => setSelectedRoleId(role.id)}
            >
              <span className="font-medium">{role.name}</span>
              <span className="text-xs text-muted-foreground">{role.description}</span>
              <div className="mt-1 flex flex-wrap gap-1">
                {role.actionIds.length === 0 && (
                  <span className="text-xs text-muted-foreground italic">No actions</span>
                )}
                {role.actionIds.map(id => {
                  const action = actions.find(a => a.id === id);
                  return (
                    <span key={id} className="bg-gray-100 text-xs px-2 rounded border">{action?.name}</span>
                  );
                })}
              </div>
            </button>
            <button
              className="absolute right-2 top-2 text-xs underline text-blue-500 opacity-80 group-hover:opacity-100"
              onClick={e => { e.stopPropagation(); onEditActions(role.id); }}
            >
              Edit Actions
            </button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
