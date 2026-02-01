
import { Bell, Mail } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as React from "react";

type NotificationType = "alert" | "email" | "sms";

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  date: string;
  read: boolean;
}

const icons: Record<NotificationType, React.ReactNode> = {
  alert: <Bell className="text-yellow-500" />,
  email: <Mail className="text-blue-500" />,
  sms: <Mail className="text-green-500" />,
};

const demoData: Notification[] = [
  {
    id: "1",
    type: "alert",
    message: "Server CPU usage exceeded 95%",
    date: "2025-06-14 14:17",
    read: false,
  },
  {
    id: "2",
    type: "email",
    message: "Monthly report generated and sent.",
    date: "2025-06-13 09:03",
    read: true,
  },
  {
    id: "3",
    type: "sms",
    message: "SMS sent to admin for jobs failure.",
    date: "2025-06-12 02:16",
    read: false,
  },
];

export function NotificationList() {
  const [notifs, setNotifs] = React.useState<Notification[]>(demoData);

  const handleMarkRead = (id: string) => {
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="space-y-5">
      {/* Show important alerts at the top */}
      {notifs.some((n) => n.type === "alert" && !n.read) && (
        <Alert variant="destructive">
          <Bell className="h-5 w-5" />
          <AlertTitle>Important Alerts!</AlertTitle>
          <AlertDescription>
            {
              notifs
                .filter((n) => n.type === "alert" && !n.read)
                .map((n) => n.message)
                .join(", ")
            }
          </AlertDescription>
        </Alert>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-24" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {notifs.map((n) => (
            <TableRow key={n.id}
              className={cn({
                "bg-accent/20": !n.read,
                "opacity-60": n.read,
              })}
            >
              <TableCell className="pr-0">
                {icons[n.type]}
              </TableCell>
              <TableCell>{n.message}</TableCell>
              <TableCell>{n.date}</TableCell>
              <TableCell>
                {n.read ? (
                  <span className="text-xs text-muted-foreground">Read</span>
                ) : (
                  <span className="text-xs text-primary font-semibold">Unread</span>
                )}
              </TableCell>
              <TableCell>
                {!n.read && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleMarkRead(n.id)}
                  >
                    Mark as Read
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default NotificationList;
