
import ExportShareDialog from "@/components/ExportShareDialog";

export default function SharePage() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Export & Share</h2>
      <p className="mb-6">Download and share reports in PDF, Excel, or CSV format. Email sharing coming soon!</p>
      <ExportShareDialog />
    </section>
  );
}
