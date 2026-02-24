import React from "react";
import { Loader2 } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full bg-transparent">
      <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
      <h2 className="text-lg font-medium text-gray-700">Loading Configuration...</h2>
      <p className="text-sm text-gray-400 mt-2">Fetching dependencies and evaluating components</p>
    </div>
  );
}
