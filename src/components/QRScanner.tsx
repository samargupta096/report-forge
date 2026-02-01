
import { useState } from "react";
import { Camera, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export default function QRScanner() {
  const [isScanning, setIsScanning] = useState(false);

  const startScanning = () => {
    // For demo purposes, we'll simulate QR scanning
    // In a real implementation, you'd use a library like @zxing/library or react-qr-scanner
    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      setIsScanning(false);
      toast({
        title: "QR Code Detected!",
        description: "Redirecting to feedback page...",
      });
      
      // Redirect to feedback page
      setTimeout(() => {
        window.location.href = "/feedback";
      }, 1000);
    }, 3000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Scan className="h-6 w-6 text-primary" />
          <CardTitle>Scan QR Code</CardTitle>
        </div>
        <CardDescription>
          Use your camera to scan a feedback QR code
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <div className="w-48 h-48 border-2 border-dashed border-primary rounded-lg flex items-center justify-center bg-muted/50">
            {isScanning ? (
              <div className="text-center">
                <div className="animate-pulse">
                  <Camera className="h-12 w-12 text-primary mx-auto mb-2" />
                </div>
                <p className="text-sm text-muted-foreground">Scanning...</p>
              </div>
            ) : (
              <div className="text-center">
                <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Camera preview</p>
              </div>
            )}
          </div>
        </div>

        <Button
          onClick={startScanning}
          disabled={isScanning}
          className="w-full"
          size="lg"
        >
          {isScanning ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Scanning...
            </>
          ) : (
            <>
              <Camera className="h-4 w-4 mr-2" />
              Start Scanning
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Position the QR code within the camera frame to scan
        </p>
      </CardContent>
    </Card>
  );
}
