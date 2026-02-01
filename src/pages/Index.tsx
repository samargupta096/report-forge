
// Desktop dashboard for Database Report App

import { AppTabs } from "../components/AppTabs";
import DatabaseConfigForm from "../components/DatabaseConfigForm";
import ReportGenerator from "../components/ReportGenerator";
import MergeRecords from "../components/MergeRecords";
import DeleteRecords from "../components/DeleteRecords";
import { Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  
  // Dummy login/signup handlers
  const handleLogin = () => {
    navigate("/signin");
  };
  
  const handleSignup = () => {
    navigate("/signup");
  };

  const handleReportGenerate = (reportConfig: any) => {
    console.log('Report generated:', reportConfig);
    toast({
      title: "Report Generated",
      description: `Report "${reportConfig.name}" has been generated successfully.`,
    });
  };

  return (
    <main className="min-h-screen bg-muted/40 py-10 px-0">
      {/* Header */}
      <div className="max-w-6xl mx-auto pb-8 mb-4 border-b flex items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <Database size={32} className="text-primary" />
          <h1 className="text-3xl font-semibold tracking-tight">Database Report Dashboard</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleLogin}>Log In</Button>
          <Button onClick={handleSignup}>Sign Up</Button>
        </div>
      </div>

      {/* Tabs/Application */}
      <div className="max-w-6xl mx-auto">
        <AppTabs>
          {{
            "db-config": <DatabaseConfigForm />,
            "report": <ReportGenerator onReportGenerate={handleReportGenerate} />,
            "merge": <MergeRecords />,
            "delete": <DeleteRecords />,
          }}
        </AppTabs>
      </div>
    </main>
  );
};

export default Index;
