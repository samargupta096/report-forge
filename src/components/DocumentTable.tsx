
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { FileText, FileCheck, FileX, Clock } from "lucide-react";

type DocumentStatus = "completed" | "sent" | "declined" | "in progress";

type DocumentRow = {
  id: string;
  name: string;
  recipient: string;
  status: DocumentStatus;
  signedTime?: string; // optional, only for completed
};

// Mock data for demonstration
const documents: DocumentRow[] = [
  {
    id: "1",
    name: "Offer_Letter.pdf",
    recipient: "alice@email.com",
    status: "completed",
    signedTime: "2024-06-10 15:22",
  },
  {
    id: "2",
    name: "NDA_Contract.docx",
    recipient: "bob@email.com",
    status: "sent",
    signedTime: "",
  },
  {
    id: "3",
    name: "Partnership_Agreement.pdf",
    recipient: "carol@email.com",
    status: "in progress",
    signedTime: "",
  },
  {
    id: "4",
    name: "Lease_Agreement.pdf",
    recipient: "eric@email.com",
    status: "declined",
    signedTime: "",
  },
];

// Function to get icon and color for each status
function statusIcon(status: DocumentStatus) {
  switch (status) {
    case "completed":
      return <FileCheck className="text-green-600" />;
    case "sent":
      return <FileText className="text-blue-600" />;
    case "declined":
      return <FileX className="text-red-600" />;
    case "in progress":
      return <Clock className="text-yellow-500" />;
    default:
      return <FileText />;
  }
}

function statusLabel(status: DocumentStatus) {
  switch (status) {
    case "completed":
      return "Completed";
    case "sent":
      return "Sent";
    case "declined":
      return "Declined";
    case "in progress":
      return "In Progress";
    default:
      return status;
  }
}

export default function DocumentTable() {
  return (
    <div className="mt-8">
      <Table>
        <TableCaption>List of DocuSign documents and their latest status.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Document Name</TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead>Status Details</TableHead>
            <TableHead>Signed Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell>{statusIcon(doc.status)}</TableCell>
              <TableCell className="font-medium">{doc.name}</TableCell>
              <TableCell>{doc.recipient}</TableCell>
              <TableCell>
                <span
                  className={
                    "px-2 py-1 rounded text-xs " +
                    (doc.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : doc.status === "sent"
                      ? "bg-blue-100 text-blue-800"
                      : doc.status === "declined"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800")
                  }
                >
                  {statusLabel(doc.status)}
                </span>
              </TableCell>
              <TableCell>
                {doc.status === "completed" && doc.signedTime
                  ? doc.signedTime
                  : doc.status === "declined"
                  ? "--"
                  : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
