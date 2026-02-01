
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRound, UserCog } from "lucide-react";

export default function ProfilePage() {
  // Static user info for now
  const user = {
    name: "Alex Johnson",
    email: "alex@email.com",
    role: "Admin",
    avatarUrl: "",
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <UserRound className="text-primary" size={28} /> User Profile
      </h2>
      <p className="mb-6 text-muted-foreground">
        View and edit your profile info. <span className="italic">(User info, role, password change coming soon!)</span>
      </p>

      <div className="mx-auto max-w-lg">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Avatar className="h-16 w-16">
              {user.avatarUrl ? (
                <AvatarImage src={user.avatarUrl} alt={user.name} />
              ) : (
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0]?.toUpperCase())
                    .join("")}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1">
                <UserCog size={16} className="text-muted-foreground" /> {user.role}
              </CardDescription>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-5 mt-2">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" disabled value={user.name} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" disabled value={user.email} />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Input id="role" type="text" disabled value={user.role} />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" disabled value="password" />
                <p className="text-xs text-muted-foreground mt-1">
                  Password change functionality coming soon!
                </p>
              </div>
              {/* Future: Add edit/save buttons */}
              <Button type="button" className="w-full mt-4" disabled>
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
