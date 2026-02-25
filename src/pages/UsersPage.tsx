import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function UsersPage() {
  const { toast } = useToast();
  const [userList, setUserList] = useState<Array<{ name: string; email: string }>>(() => {
    const users = localStorage.getItem("createdUserList");
    return users ? JSON.parse(users) : [];
  });

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm(f => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.name || !userForm.email || !userForm.password) return;

    const newUsers = [
      ...userList,
      { name: userForm.name, email: userForm.email }
    ];
    setUserList(newUsers);
    localStorage.setItem("createdUserList", JSON.stringify(newUsers));
    toast({
      title: `User "${userForm.name}" created!`,
      description: "A new user has been added (demo only)."
    });
    setUserForm({ name: "", email: "", password: "" });
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Users Management</h2>
      <p className="mb-6">Create and manage your organization's users.</p>
      
      <div className="max-w-lg w-full bg-card dark:bg-background rounded-xl shadow p-6 flex flex-col items-center">
        <h3 className="text-xl font-bold mb-4">Create User (Demo)</h3>
        <form onSubmit={handleAddUser} className="w-full space-y-3">
          <div>
            <label htmlFor="user-name" className="block text-sm font-medium mb-1">Name</label>
            <input
              id="user-name"
              name="name"
              type="text"
              value={userForm.name}
              onChange={handleUserInput}
              className="w-full rounded border bg-background px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="user-email" className="block text-sm font-medium mb-1">Email</label>
            <input
              id="user-email"
              name="email"
              type="email"
              value={userForm.email}
              onChange={handleUserInput}
              className="w-full rounded border bg-background px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="user-password" className="block text-sm font-medium mb-1">Password</label>
            <input
              id="user-password"
              name="password"
              type="password"
              value={userForm.password}
              onChange={handleUserInput}
              className="w-full rounded border bg-background px-3 py-2"
              required
            />
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground rounded py-2 font-semibold hover:bg-primary/90 transition">Create User</button>
        </form>
        <hr className="my-5 w-full" />
        <h4 className="font-semibold mb-2 text-lg">Created Users (local only)</h4>
        {userList.length === 0 ? (
          <div className="text-muted-foreground">No users created yet.</div>
        ) : (
          <ul className="w-full space-y-1">
            {userList.map((u, i) => (
              <li key={i} className="flex justify-between items-center border-b py-1 text-sm">
                <span className="font-medium">{u.name}</span>
                <span className="text-muted-foreground">{u.email}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
