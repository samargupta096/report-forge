
import { Link, useLocation } from "react-router-dom";
import { Settings } from "lucide-react";

export default function AdminNavLink() {
  const { pathname } = useLocation();
  const selected = pathname === "/admin";
  return (
    <Link
      to="/admin"
      className={`flex items-center gap-2 p-2 rounded hover:bg-muted-foreground/10 ${selected ? "font-bold bg-muted" : ""}`}
    >
      <Settings size={20} /> Admin
    </Link>
  );
}
