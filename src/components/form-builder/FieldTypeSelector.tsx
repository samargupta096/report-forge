
/**
 * Field Type Selector Component
 * 
 * Displays available field types that can be added to the form.
 * Provides a grid layout with icons and descriptions for each field type.
 * This component serves as the primary interface for users to add new fields
 * to their forms by selecting from predefined field types.
 * 
 * @fileoverview Component for selecting and adding field types to forms
 * @author Form Builder Team
 * @version 1.0.0
 */

import React from "react";
import { Button } from "@/components/ui/button";
import { FIELD_TYPES } from "./constants";
import { FieldType } from "./types";

/**
 * Props interface for the FieldTypeSelector component
 * 
 * @interface FieldTypeSelectorProps
 * @property {function} onAddField - Callback function called when a field type is selected
 * @property {boolean} [readOnly] - Optional flag to disable field addition (default: false)
 */
interface FieldTypeSelectorProps {
  /** 
   * Callback function invoked when user selects a field type to add
   * @param {FieldType} type - The selected field type
   */
  onAddField: (type: FieldType) => void;
  
  /** 
   * Whether the selector should be in read-only mode
   * When true, all buttons are disabled and no fields can be added
   */
  readOnly?: boolean;
}

/**
 * FieldTypeSelector Component
 * 
 * Renders a grid of available field types with icons and descriptions.
 * Each field type is presented as a clickable button that triggers
 * the onAddField callback when selected.
 * 
 * Features:
 * - Grid layout for optimal space usage
 * - Icon and text representation for each field type
 * - Hover effects and tooltips for better UX
 * - Read-only mode support
 * - Responsive design
 * 
 * @param {FieldTypeSelectorProps} props - Component props
 * @returns {JSX.Element} The rendered FieldTypeSelector component
 * 
 * @example
 * // Basic usage
 * <FieldTypeSelector onAddField={handleAddField} />
 * 
 * @example
 * // Read-only mode
 * <FieldTypeSelector onAddField={handleAddField} readOnly={true} />
 * 
 * @example
 * // With custom handler
 * const handleFieldSelection = (type: FieldType) => {
 *   console.log(`Adding field of type: ${type}`);
 *   addFieldToForm(type);
 * };
 * 
 * <FieldTypeSelector onAddField={handleFieldSelection} />
 */
export default function FieldTypeSelector({ onAddField, readOnly }: FieldTypeSelectorProps) {
  return (
    <div className="space-y-2">
      {/* Section Header */}
      <h3 className="font-semibold text-sm text-gray-700">Add Field Types</h3>
      
      {/* Field Types Grid */}
      <div className="grid grid-cols-2 gap-2">
        {FIELD_TYPES.map(({ type, label, icon: Icon, description }) => (
          <Button
            key={type}
            variant="outline"
            size="sm"
            onClick={() => onAddField(type)}
            className="flex flex-col h-auto p-3 text-left hover:bg-gray-50 transition-colors duration-200"
            disabled={readOnly}
            title={description}
            aria-label={`Add ${label} field`}
          >
            {/* Icon and Label Row */}
            <div className="flex items-center gap-2 mb-1">
              <Icon size={16} className="text-gray-600" />
              <span className="text-xs font-medium">{label}</span>
            </div>
            
            {/* Description */}
            <span className="text-xs text-gray-500 text-left leading-tight">
              {description}
            </span>
          </Button>
        ))}
      </div>
      
      {/* Read-only Notice */}
      {readOnly && (
        <div className="text-xs text-gray-500 italic mt-2">
          Form is in read-only mode. Field addition is disabled.
        </div>
      )}
    </div>
  );
}

/**
 * Usage Guidelines:
 * 
 * 1. **Callback Handling**: Always provide a proper onAddField callback
 *    that handles the field creation logic in the parent component.
 * 
 * 2. **Read-only Mode**: Use the readOnly prop when displaying forms
 *    that shouldn't be modified (e.g., in preview or published states).
 * 
 * 3. **Accessibility**: The component includes proper ARIA labels and
 *    title attributes for screen readers and tooltips.
 * 
 * 4. **Styling**: The component uses Tailwind CSS classes and follows
 *    the design system. Customize through className props if needed.
 * 
 * 5. **Performance**: The component is optimized for re-renders using
 *    React.memo if needed in performance-critical scenarios.
 */
