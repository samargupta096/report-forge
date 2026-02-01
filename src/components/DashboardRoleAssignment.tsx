
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = {
  dashboards: { id: number; name: string; }[];
  roles: { id: number; name: string; dashboards: number[] }[];
  users: { id: number; name: string; roles: number[] }[];
  onAssignDashboardToRole: (roleId: number, dashboardId: number) => void;
  onRemoveDashboardFromRole: (roleId: number, dashboardId: number) => void;
  onAssignRoleToUser: (userId: number, roleId: number) => void;
  onRemoveRoleFromUser: (userId: number, roleId: number) => void;
};

export default function DashboardRoleAssignment({
  dashboards,
  roles,
  users,
  onAssignDashboardToRole,
  onRemoveDashboardFromRole,
  onAssignRoleToUser,
  onRemoveRoleFromUser,
}: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Role→Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle>Assign Dashboards to Roles</CardTitle>
        </CardHeader>
        <CardContent>
          {roles.map((role) => (
            <div key={role.id} className="mb-4">
              <div className="font-semibold mb-2">{role.name}</div>
              <div className="flex flex-wrap gap-2 mb-2">
                {dashboards.map(db => {
                  const assigned = role.dashboards.includes(db.id);
                  return (
                    <Badge key={db.id} variant={assigned ? "secondary" : "outline"}>
                      {db.name}
                      <Button
                        type="button"
                        size="sm"
                        className="ml-2"
                        variant={assigned ? "destructive" : "ghost"}
                        onClick={() =>
                          assigned
                            ? onRemoveDashboardFromRole(role.id, db.id)
                            : onAssignDashboardToRole(role.id, db.id)
                        }
                      >
                        {assigned ? "Remove" : "Assign"}
                      </Button>
                    </Badge>
                  );
                })}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      {/* User→Role */}
      <Card>
        <CardHeader>
          <CardTitle>Assign Roles to Users</CardTitle>
        </CardHeader>
        <CardContent>
          {users.map((user) => (
            <div key={user.id} className="mb-4">
              <div className="font-semibold mb-2">{user.name}</div>
              <div className="flex flex-wrap gap-2 mb-2">
                {roles.map(role => {
                  const assigned = user.roles.includes(role.id);
                  return (
                    <Badge key={role.id} variant={assigned ? "secondary" : "outline"}>
                      {role.name}
                      <Button
                        type="button"
                        size="sm"
                        className="ml-2"
                        variant={assigned ? "destructive" : "ghost"}
                        onClick={() =>
                          assigned
                            ? onRemoveRoleFromUser(user.id, role.id)
                            : onAssignRoleToUser(user.id, role.id)
                        }
                      >
                        {assigned ? "Remove" : "Assign"}
                      </Button>
                    </Badge>
                  );
                })}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

