
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { downloadAsCSV, downloadAsXLSX } from "@/lib/exportUtils";
import { Download, Share } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Example/mock data
const tableData = [
  { userId: "001", name: "Alice Lee", email: "alice@email.com", joined: "2023-10-11" },
  { userId: "002", name: "Bob Smith", email: "bob@email.com", joined: "2023-10-11" },
  { userId: "003", name: "Carol White", email: "carol@email.com", joined: "2023-10-11" },
];

const headers = ["User ID", "Name", "Email", "Joined"];

export default function ExportShareDialog() {
  const [open, setOpen] = useState(false);

  const handleExportCSV = () => {
    downloadAsCSV(tableData, headers, "user_report.csv");
  };

  const handleExportXLSX = () => {
    downloadAsXLSX(tableData, headers, "user_report.xlsx");
  };

  // Placeholder for PDF generation. Add dynamic generation if needed.
  const handleExportPDF = () => {
    alert("PDF export functionality will be available soon!");
  };

  const handleShareEmail = () => {
    alert("Sharing via email will be enabled soon!");
  };

  // WhatsApp share feature
  const handleShareWhatsApp = () => {
    // You can customize the message or add more details as required
    const reportText =
      "Check out this report from Report Forge Fusion!" +
      "\n\n(User Report for demonstration)\n" +
      tableData.map(row =>
        `• ${row.name} (${row.email}, Joined: ${row.joined})`
      ).join("\n");

    // Pre-fill message and open WhatsApp
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(reportText)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    toast({
      title: "Opening WhatsApp",
      description: "A new tab has been opened for WhatsApp sharing.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="lg">
          <Share className="mr-2" /> Export & Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export & Share Report</DialogTitle>
          <DialogDescription>
            Instantly download your report or share via email or WhatsApp.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-2">
          <Button onClick={handleExportCSV} variant="outline">
            <Download className="mr-2" /> Download as CSV
          </Button>
          <Button onClick={handleExportXLSX} variant="outline">
            <Download className="mr-2" /> Download as Excel (.xlsx)
          </Button>
          <Button onClick={handleExportPDF} variant="outline">
            <Download className="mr-2" /> Download as PDF
          </Button>
          <Button onClick={handleShareEmail} variant="secondary">
            <Share className="mr-2" /> Share via Email
          </Button>
          <Button onClick={handleShareWhatsApp} variant="secondary" className="bg-green-500 hover:bg-green-600 text-white">
            {/* WhatsApp green */}
            <Share className="mr-2" /> Share on WhatsApp
          </Button>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

