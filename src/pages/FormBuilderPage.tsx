
import React from "react";
import FormBuilder from "@/components/FormBuilder";
import FormSubmissionsViewer from "@/components/FormSubmissionsViewer";
import { toast } from "@/hooks/use-toast";

export default function FormBuilderPage() {
  const handleFormSave = (formConfig: any) => {
    console.log('Form saved:', formConfig);
    toast({
      title: "Form Saved",
      description: "Your form configuration has been saved successfully.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <FormBuilder onFormSave={handleFormSave} />
      <FormSubmissionsViewer />
    </div>
  );
}
