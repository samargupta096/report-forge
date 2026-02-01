
// Remove shadcn form UI; use simple HTML divs & labels.

import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function FileUploadForm() {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <Input placeholder="e.g. March 2024 Payroll" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">File</label>
        <div
          className="flex flex-col sm:flex-row sm:items-center gap-2"
        >
          {/* Use pointer-events-none for input and absolute position */}
          <div className="relative w-full">
            <Input
              type="file"
              ref={fileRef}
              className="w-full bg-background file:mr-0 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
              accept=".csv,.xlsx,.xls,.json"
              style={{ paddingRight: "3rem" }} // space for the icon button if needed
            />
          </div>
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => fileRef.current?.click()}
            tabIndex={-1}
            aria-label="Upload file"
            className="shrink-0"
          >
            <Upload />
          </Button>
        </div>
      </div>
      <Button type="submit" className="w-full mt-3" disabled>
        Upload File (demo)
      </Button>
    </div>
  );
}

