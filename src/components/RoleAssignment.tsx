
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  selectedUser: { id: number; name: string; roles: string[] } | undefined;
  selectedRole: { id: number; name: string } | undefined;
  onAssign: () => void;
  onUnassign: () => void;
};

export function RoleAssignment({
  selectedUser,
  selectedRole,
  onAssign,
  onUnassign,
}: Props) {
  if (!selectedUser || !selectedRole) {
    return (
      <div className="text-muted-foreground text-center py-5">
        Select a user and a role to manage assignments.
      </div>
    );
  }

  const assigned = selectedUser.roles.includes(selectedRole.name);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Assignment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          <span className="font-semibold">{selectedUser.name}</span> <span className="text-sm text-muted-foreground">({selectedRole.name})</span>
        </div>
        <div className="flex gap-2">
          {!assigned ? (
            <Button size="sm" onClick={onAssign}>
              Assign Role
            </Button>
          ) : (
            <Button size="sm" variant="destructive" onClick={onUnassign}>
              Unassign Role
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
