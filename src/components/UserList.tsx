
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type User = {
  id: number;
  name: string;
  email: string;
  roles: string[];
};

type UserListProps = {
  onSelectUser: (id: number) => void;
  selectedUserId: number | null;
  users: User[];
};

export function UserList({ onSelectUser, selectedUserId, users }: UserListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        {users.length === 0 ? (
          <div className="text-muted-foreground text-center py-5">No users for this role.</div>
        ) : (
          <ul className="space-y-3">
            {users.map((user) => (
              <li
                key={user.id}
                className={`p-2 rounded cursor-pointer ${selectedUserId === user.id ? "bg-muted" : "hover:bg-muted/40"}`}
                onClick={() => onSelectUser(user.id)}
              >
                <div className="font-medium">{user.name}</div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
                <div className="flex gap-1 mt-1">
                  {user.roles.map((role) => (
                    <Badge key={role} variant="secondary" className="text-xs">
                      {role}
                    </Badge>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
