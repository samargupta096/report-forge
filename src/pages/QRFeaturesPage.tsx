

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import QRScanner from "@/components/QRScanner";
import { QrCode, Scan, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QRFeaturesPage() {
  const [activeTab, setActiveTab] = useState<"generate" | "scan">("generate");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-cyan-100 dark:from-[#22263c] dark:via-[#33314e] dark:to-[#10313f] transition-colors duration-500 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">QR Code Features</CardTitle>
            <CardDescription className="text-lg">
              Generate QR codes for feedback collection or scan existing ones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-4 mb-8">
              <Button
                variant={activeTab === "generate" ? "default" : "outline"}
                onClick={() => setActiveTab("generate")}
                className="flex items-center gap-2"
              >
                <QrCode className="h-4 w-4" />
                Generate QR Code
              </Button>
              <Button
                variant={activeTab === "scan" ? "default" : "outline"}
                onClick={() => setActiveTab("scan")}
                className="flex items-center gap-2"
              >
                <Scan className="h-4 w-4" />
                Scan QR Code
              </Button>
            </div>

            <div className="flex justify-center">
              {activeTab === "generate" ? <QRCodeGenerator /> : <QRScanner />}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Generate QR Codes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Create QR codes for feedback collection</li>
                <li>• Download high-quality QR code images</li>
                <li>• Copy shareable feedback URLs</li>
                <li>• Perfect for physical locations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5" />
                Scan QR Codes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Quick access to feedback forms</li>
                <li>• Mobile-friendly scanning</li>
                <li>• Instant page redirection</li>
                <li>• No app installation required</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

