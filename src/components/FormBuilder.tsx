
/**
 * Form Builder Component
 * 
 * A comprehensive dynamic form creation and management system.
 * Refactored into smaller, focused components for better maintainability.
 */

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Import refactored components
import FieldTypeSelector from "./form-builder/FieldTypeSelector";
import FieldEditor from "./form-builder/FieldEditor";
import FormPreview from "./form-builder/FormPreview";
import FieldList from "./form-builder/FieldList";

// Import types and utilities
import { FormConfig, FormBuilderProps, FieldType, FormField } from "./form-builder/types";
import { createNewField, validateForm } from "./form-builder/utils";

/**
 * Form Builder Component
 * 
 * Main component for building and managing dynamic forms.
 * Now uses smaller, focused components for better organization.
 */
export default function FormBuilder({
  initialForm,
  onFormSave,
  onFormSubmit,
  allowPreview = true,
  readOnly = false,
}: FormBuilderProps) {
  // Main form state management
  const [form, setForm] = useState<FormConfig>(
    initialForm || {
      title: "New Form",
      description: "",
      fields: [],
      settings: {
        submitButtonText: "Submit",
        showProgressBar: false,
        allowSaveDraft: false,
        multiStep: false,
      },
    }
  );

  // UI state management
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  /**
   * Adds a new field to the form
   */
  const addField = useCallback((type: FieldType) => {
    if (readOnly) return;

    const newField = createNewField(type);
    setForm(prev => ({
      ...prev,
      fields: [...prev.fields, newField],
    }));

    // Auto-select the new field for editing
    setSelectedFieldId(newField.id);

    toast({
      title: "Field Added",
      description: `${type} field has been added to your form.`,
    });
  }, [readOnly]);

  /**
   * Updates an existing form field
   */
  const updateField = useCallback((fieldId: string, updates: Partial<FormField>) => {
    if (readOnly) return;

    setForm(prev => ({
      ...prev,
      fields: prev.fields.map(field =>
        field.id === fieldId ? { ...field, ...updates } : field
      ),
    }));
  }, [readOnly]);

  /**
   * Removes a field from the form
   */
  const removeField = useCallback((fieldId: string) => {
    if (readOnly) return;

    setForm(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== fieldId),
    }));

    // Clear selection if removed field was selected
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
    }

    toast({
      title: "Field Removed",
      description: "The field has been removed from your form.",
    });
  }, [readOnly, selectedFieldId]);

  /**
   * Saves the current form configuration
   */
  const saveForm = useCallback(() => {
    const validation = validateForm(form);
    
    if (!validation.isValid) {
      validation.errors.forEach(error => {
        toast({
          title: "Validation Error",
          description: error,
          variant: "destructive",
        });
      });
      return;
    }

    onFormSave(form);
    
    toast({
      title: "Form Saved",
      description: "Your form configuration has been saved successfully.",
    });
  }, [form, onFormSave]);

  const selectedField = form.fields.find(f => f.id === selectedFieldId) || null;

  // Main component render
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Form Builder</h1>
              <p className="text-gray-600">Create and customize dynamic forms</p>
            </div>
            
            <div className="flex items-center gap-2">
              {allowPreview && (
                <Button
                  variant="outline"
                  onClick={() => setPreviewMode(!previewMode)}
                >
                  <Eye size={16} className="mr-2" />
                  {previewMode ? 'Edit' : 'Preview'}
                </Button>
              )}
              
              <Button onClick={saveForm} disabled={readOnly}>
                <Save size={16} className="mr-2" />
                Save Form
              </Button>
            </div>
          </div>

          {/* Form Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="form-title">Form Title</Label>
              <Input
                id="form-title"
                value={form.title}
                onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                disabled={readOnly}
              />
            </div>
            <div>
              <Label htmlFor="form-description">Description (Optional)</Label>
              <Input
                id="form-description"
                value={form.description || ''}
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                disabled={readOnly}
                placeholder="Brief description of your form"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        {previewMode ? (
          <FormPreview form={form} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Field Types */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
                <FieldTypeSelector onAddField={addField} readOnly={readOnly} />
              </div>
            </div>

            {/* Center - Form Fields */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-lg mb-4">
                  Form Fields ({form.fields.length})
                </h3>
                
                <FieldList
                  fields={form.fields}
                  selectedFieldId={selectedFieldId}
                  onSelectField={setSelectedFieldId}
                  onRemoveField={removeField}
                  readOnly={readOnly}
                />
              </div>
            </div>

            {/* Right Sidebar - Field Editor */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
                <FieldEditor
                  selectedField={selectedField}
                  onUpdateField={updateField}
                  onRemoveField={removeField}
                  readOnly={readOnly}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Re-export types for backwards compatibility
export type { FormField, FormConfig, FieldType, FormBuilderProps } from "./form-builder/types";
