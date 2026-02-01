
/**
 * Field List Component
 * 
 * Displays the list of form fields with selection and management capabilities.
 * Allows users to select fields for editing and provides basic field information.
 * This component serves as the central interface for viewing and managing
 * all fields within a form, including selection, deletion, and reordering.
 * 
 * @fileoverview Component for displaying and managing form fields list
 * @author Form Builder Team
 * @version 1.0.0
 */

import React from "react";
import { Button } from "@/components/ui/button";
import { Move, Trash2, FileText, Eye } from "lucide-react";
import { FormField } from "./types";

/**
 * Props interface for the FieldList component
 * 
 * @interface FieldListProps
 * @property {FormField[]} fields - Array of form fields to display
 * @property {string | null} selectedFieldId - ID of currently selected field
 * @property {function} onSelectField - Callback for field selection
 * @property {function} onRemoveField - Callback for field removal
 * @property {boolean} [readOnly] - Optional read-only mode flag
 */
interface FieldListProps {
  /** Array of form fields to display in the list */
  fields: FormField[];
  
  /** ID of the currently selected field (null if none selected) */
  selectedFieldId: string | null;
  
  /** 
   * Callback function invoked when a field is selected
   * @param {string} fieldId - ID of the selected field
   */
  onSelectField: (fieldId: string) => void;
  
  /** 
   * Callback function invoked when a field is removed
   * @param {string} fieldId - ID of the field to remove
   */
  onRemoveField: (fieldId: string) => void;
  
  /** 
   * Whether the list should be in read-only mode
   * When true, removal actions are disabled
   */
  readOnly?: boolean;
}

/**
 * FieldList Component
 * 
 * Renders a list of form fields with interactive capabilities including:
 * - Field selection for editing
 * - Field removal with confirmation
 * - Visual indicators for field type and requirements
 * - Empty state handling
 * - Drag handle for future reordering functionality
 * 
 * The component provides a clean, organized view of all form fields
 * with clear visual hierarchy and intuitive interaction patterns.
 * 
 * @param {FieldListProps} props - Component props
 * @returns {JSX.Element} The rendered FieldList component
 */
export default function FieldList({ 
  fields, 
  selectedFieldId, 
  onSelectField, 
  onRemoveField, 
  readOnly 
}: FieldListProps) {
  
  /**
   * Empty State Component
   * Displayed when no fields have been added to the form
   */
  if (fields.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <FileText size={48} className="mx-auto mb-4 opacity-50" />
        <p className="text-base font-medium mb-2">No fields added yet</p>
        <p className="text-sm">Choose a field type from the left panel to get started</p>
      </div>
    );
  }

  /**
   * Field List Rendering
   * Maps through fields and renders each as an interactive card
   */
  return (
    <div className="space-y-3" role="list" aria-label="Form fields">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
            selectedFieldId === field.id 
              ? 'border-blue-500 bg-blue-50 shadow-sm' 
              : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
          }`}
          onClick={() => onSelectField(field.id)}
          role="listitem"
          aria-selected={selectedFieldId === field.id}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectField(field.id);
            }
          }}
        >
          <div className="flex items-start justify-between gap-3">
            {/* Field Information Section */}
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {/* Drag Handle */}
              <div className="flex-shrink-0 pt-1">
                <div title="Drag to reorder (coming soon)">
                  <Move 
                    size={16} 
                    className="text-gray-400 hover:text-gray-600 transition-colors" 
                  />
                </div>
              </div>
              
              {/* Field Details */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 mb-2 truncate">
                  {field.label || `Untitled ${field.type} field`}
                </h4>
                
                <div className="flex flex-wrap items-center gap-2 text-sm mb-2">
                  <span className="capitalize bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">
                    {field.type} field
                  </span>
                  
                  {/* Required Indicator */}
                  {field.required && (
                    <span className="text-red-600 font-medium bg-red-50 px-2 py-1 rounded text-xs">
                      Required
                    </span>
                  )}
                  
                  {/* Options Count for Select Fields */}
                  {field.type === 'select' && field.options && (
                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">
                      {field.options.length} option{field.options.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                
                {/* Help Text Preview */}
                {field.helpText && (
                  <p className="text-xs text-gray-600 truncate mb-2">
                    {field.helpText}
                  </p>
                )}
                
                {/* Field Position Indicator */}
                <div className="text-xs text-gray-400">
                  Position {index + 1} of {fields.length}
                </div>
              </div>
            </div>
            
            {/* Action Buttons Section */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Preview Indicator (when field is selected) */}
              {selectedFieldId === field.id && (
                <div className="mr-2">
                  <div title="Currently editing">
                    <Eye size={14} className="text-blue-500" />
                  </div>
                </div>
              )}
              
              {/* Remove Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`Are you sure you want to remove "${field.label}"?`)) {
                    onRemoveField(field.id);
                  }
                }}
                disabled={readOnly}
                className="text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors h-8 w-8 p-0"
                aria-label={`Remove ${field.label} field`}
              >
                <div title={readOnly ? 'Read-only mode' : 'Remove field'}>
                  <Trash2 size={16} />
                </div>
              </Button>
            </div>
          </div>
        </div>
      ))}
      
      {/* Summary Information */}
      <div className="text-xs text-gray-500 text-center pt-4 border-t mt-4">
        {fields.length} field{fields.length !== 1 ? 's' : ''} • 
        {fields.filter(f => f.required).length} required
      </div>
    </div>
  );
}
