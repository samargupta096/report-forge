
import { useState, useEffect } from "react";
import { QrCode, Download, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

export default function QRCodeGenerator() {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const feedbackUrl = `${window.location.origin}/feedback`;

  useEffect(() => {
    // Generate QR code using QR Server API
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(feedbackUrl)}`;
    setQrCodeUrl(qrApiUrl);
  }, [feedbackUrl]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(feedbackUrl);
      toast({
        title: "Copied!",
        description: "Feedback URL copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the URL manually",
        variant: "destructive",
      });
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = "feedback-qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Download started",
      description: "QR code image is being downloaded",
    });
  };

  const openFeedbackPage = () => {
    window.open(feedbackUrl, "_blank");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <QrCode className="h-6 w-6 text-primary" />
          <CardTitle>Feedback QR Code</CardTitle>
        </div>
        <CardDescription>
          Scan to access the feedback page instantly
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {qrCodeUrl && (
          <div className="flex justify-center">
            <img
              src={qrCodeUrl}
              alt="Feedback QR Code"
              className="border rounded-lg shadow-sm"
              width={250}
              height={250}
            />
          </div>
        )}
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Feedback URL:</label>
          <div className="flex gap-2">
            <Input
              value={feedbackUrl}
              readOnly
              className="text-sm"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              title="Copy URL"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            onClick={downloadQRCode}
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            Download QR
          </Button>
          <Button
            onClick={openFeedbackPage}
            className="flex-1"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Page
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
