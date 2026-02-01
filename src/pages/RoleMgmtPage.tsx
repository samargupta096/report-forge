
import React, { useState } from "react";
import { RoleList } from "../components/RoleList";
import { UserList } from "../components/UserList";
import { RoleAssignment } from "../components/RoleAssignment";
import { ActionList } from "../components/ActionList";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

// --- Types ---
type Action = { id: number; name: string; description: string };
type Role = { id: number; name: string; description: string; actionIds: number[] };
type User = { id: number; name: string; email: string; roles: string[] };

// Mock data
const actionsInit: Action[] = [
  { id: 1, name: "view_reports", description: "Can view reports" },
  { id: 2, name: "edit_reports", description: "Can edit reports" },
  { id: 3, name: "delete_reports", description: "Can delete reports" },
  { id: 4, name: "manage_users", description: "Manage users and assign roles" },
];
const rolesInit: Role[] = [
  { id: 1, name: "Admin", description: "Full access, manage all settings", actionIds: [1,2,3,4] },
  { id: 2, name: "Editor", description: "Modify content and resources", actionIds: [1,2] },
  { id: 3, name: "Viewer", description: "Read-only access", actionIds: [1] },
];
const usersInit: User[] = [
  { id: 1, name: "Alex Johnson", email: "alex@email.com", roles: ["Admin"] },
  { id: 2, name: "Sandy Clark", email: "sandy@email.com", roles: ["Editor"] },
  { id: 3, name: "Jamie Carter", email: "jamie@email.com", roles: ["Viewer"] },
];

export default function RoleMgmtPage() {
  const [actions] = useState<Action[]>(actionsInit);
  const [roles, setRoles] = useState<Role[]>(rolesInit);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>(usersInit);

  // Dialog state for editing actions of a role
  const [editingRoleId, setEditingRoleId] = useState<number | null>(null);

  // Add user to role dialog state
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [userToAddId, setUserToAddId] = useState<number | null>(null);

  // Assignment handlers for users <-> roles
  const selectedRole = roles.find(r => r.id === selectedRoleId);
  const selectedUser = users.find(u => u.id === selectedUserId);

  // Filter users by selected role (or show all if none selected)
  const filteredUsers =
    selectedRole && selectedRole.name
      ? users.filter(u => u.roles.includes(selectedRole.name))
      : users;

  // Remove selected user if filtered out (to prevent broken selection)
  React.useEffect(() => {
    if (
      selectedUserId != null &&
      !filteredUsers.some(u => u.id === selectedUserId)
    ) {
      setSelectedUserId(null);
    }
    // eslint-disable-next-line
  }, [selectedRoleId, users]);

  // List of users NOT assigned to selected role
  const usersNotInRole =
    selectedRole && selectedRole.name
      ? users.filter(u => !u.roles.includes(selectedRole.name))
      : [];

  // Add user to role
  const handleAddUserToRole = () => {
    if (!selectedRole || userToAddId === null) return;
    setUsers(users =>
      users.map(u =>
        u.id === userToAddId && !u.roles.includes(selectedRole.name)
          ? { ...u, roles: [...u.roles, selectedRole.name] }
          : u
      )
    );
    setAddUserDialogOpen(false);
    setUserToAddId(null);
    toast({
      title: "User Assigned",
      description: `User has been added to role "${selectedRole.name}".`,
    });
  };

  const handleAssignRole = () => {
    if (!selectedUser || !selectedRole) return;
    setUsers(users =>
      users.map(u =>
        u.id === selectedUser.id && !u.roles.includes(selectedRole.name)
          ? { ...u, roles: [...u.roles, selectedRole.name] }
          : u
      )
    );
  };

  const handleUnassignRole = () => {
    if (!selectedUser || !selectedRole) return;
    setUsers(users =>
      users.map(u =>
        u.id === selectedUser.id
          ? { ...u, roles: u.roles.filter(r => r !== selectedRole.name) }
          : u
      )
    );
  };

  // Role <-> Action assignments
  const handleToggleActionForRole = (actionId: number) => {
    if (editingRoleId == null) return;
    setRoles(roles =>
      roles.map(role => {
        if (role.id !== editingRoleId) return role;
        const has = role.actionIds.includes(actionId);
        return {
          ...role,
          actionIds: has
            ? role.actionIds.filter(aid => aid !== actionId)
            : [...role.actionIds, actionId],
        };
      })
    );
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Role Management</h2>
      <p className="mb-6">
        Manage user roles, actions (API permissions), and assignments. 
        <span className="italic ml-2 text-muted-foreground">
          (Assign, remove, and view relationships)
        </span>
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        <RoleList
          selectedRoleId={selectedRoleId}
          setSelectedRoleId={setSelectedRoleId}
          roles={roles}
          actions={actions}
          onEditActions={setEditingRoleId}
        />
        <div className="relative">
          <UserList
            selectedUserId={selectedUserId}
            onSelectUser={setSelectedUserId}
            users={filteredUsers}
          />
          {selectedRole && (
            <Button
              className="absolute top-4 right-5 z-10"
              variant="secondary"
              size="sm"
              onClick={() => setAddUserDialogOpen(true)}
              disabled={usersNotInRole.length === 0}
            >
              Add User
            </Button>
          )}
        </div>
        <div>
          <RoleAssignment
            selectedUser={selectedUser}
            selectedRole={selectedRole}
            onAssign={handleAssignRole}
            onUnassign={handleUnassignRole}
          />
        </div>
      </div>

      {/* Dialog to edit actions for a role */}
      <Dialog open={editingRoleId != null} onOpenChange={open => !open && setEditingRoleId(null)}>
        <DialogContent>
          <DialogTitle>Edit Actions for Role</DialogTitle>
          {editingRoleId != null && (
            <ActionList
              actions={actions}
              selectedActionIds={roles.find(r => r.id === editingRoleId)?.actionIds ?? []}
              onToggleAction={handleToggleActionForRole}
            />
          )}
          <Button
            className="mt-4"
            variant="secondary"
            onClick={() => setEditingRoleId(null)}
          >
            Done
          </Button>
        </DialogContent>
      </Dialog>

      {/* Dialog: Add User to Selected Role */}
      <Dialog open={addUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add User To Role</DialogTitle>
          </DialogHeader>
          {selectedRole && (
            <div>
              <Label className="block mb-2">Choose a user to add to <span className="font-semibold">{selectedRole.name}</span>:</Label>
              <select
                className="w-full p-2 border rounded mb-4"
                value={userToAddId ?? ""}
                onChange={e => setUserToAddId(Number(e.target.value))}
              >
                <option value="" disabled>
                  Select user
                </option>
                {usersNotInRole.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.email})
                  </option>
                ))}
              </select>
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={handleAddUserToRole}
              disabled={userToAddId == null}
            >
              Add
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setAddUserDialogOpen(false);
                setUserToAddId(null);
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
