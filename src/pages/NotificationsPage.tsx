
import NotificationList from "@/components/NotificationList";

export default function NotificationsPage() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <p className="mb-6">See alerts and email/SMS notifications. (Notification settings and logs coming soon!)</p>
      <div className="rounded bg-white p-5 shadow-sm">
        <NotificationList />
      </div>
    </section>
  );
}
