
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import DocumentTable from "@/components/DocumentTable";

export default function DocumentPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 bg-white border rounded shadow">
      <div className="flex items-center gap-2 mb-4">
        <FileText size={26} className="text-primary" />
        <h1 className="text-2xl font-bold">Document E-sign</h1>
      </div>
      <p className="mb-6 text-gray-600">
        Here you can e-sign documents using DocuSign integration.
        {/* This is just a placeholder. Actual DocuSign functionality can be integrated here. */}
      </p>
      <Button disabled>
        Start DocuSign (coming soon)
      </Button>

      {/* Table of DocuSign documents */}
      <DocumentTable />
    </div>
  );
}
