
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

export default function UserAvatarMenu() {
  const navigate = useNavigate();

  // Demo logic: always "signed out". Replace with real auth check later.
  const isSignedIn = false;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="rounded-full border-2 border-primary/30 hover:border-primary ring-0 transition-all focus:outline-none"
          aria-label="Open user menu"
        >
          <Avatar>
            <AvatarImage src="" alt="User" />
            <AvatarFallback>
              <User className="h-5 w-5 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 mt-2 mr-2">
        {!isSignedIn && (
          <DropdownMenuItem
            onClick={() => navigate("/signin")}
            className="cursor-pointer"
          >
            Sign In
          </DropdownMenuItem>
        )}
        {/* In a real app, add Profile, Settings, Logout for signed-in users */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
