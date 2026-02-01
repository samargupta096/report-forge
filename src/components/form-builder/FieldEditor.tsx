
/**
 * Field Editor Component
 * 
 * Provides an interface for editing field properties like label, placeholder,
 * validation rules, and field-specific options.
 */

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { FormField } from "./types";

interface FieldEditorProps {
  selectedField: FormField | null;
  onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;
  onRemoveField: (fieldId: string) => void;
  readOnly?: boolean;
}

export default function FieldEditor({ 
  selectedField, 
  onUpdateField, 
  onRemoveField, 
  readOnly 
}: FieldEditorProps) {
  if (!selectedField) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="mb-3">⚙️</div>
        <p className="text-sm">Select a field to edit its properties</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="font-semibold text-sm text-gray-700">
        Edit Field: {selectedField.label}
      </h3>
      
      {/* Field Label */}
      <div>
        <Label htmlFor="field-label">Field Label</Label>
        <Input
          id="field-label"
          value={selectedField.label}
          onChange={(e) => onUpdateField(selectedField.id, { label: e.target.value })}
          disabled={readOnly}
        />
      </div>

      {/* Field Placeholder */}
      {['text', 'email', 'number', 'textarea'].includes(selectedField.type) && (
        <div>
          <Label htmlFor="field-placeholder">Placeholder</Label>
          <Input
            id="field-placeholder"
            value={selectedField.placeholder || ''}
            onChange={(e) => onUpdateField(selectedField.id, { placeholder: e.target.value })}
            disabled={readOnly}
          />
        </div>
      )}

      {/* Required Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="field-required"
          checked={selectedField.required || false}
          onCheckedChange={(checked) => 
            onUpdateField(selectedField.id, { required: !!checked })
          }
          disabled={readOnly}
        />
        <Label htmlFor="field-required">Required Field</Label>
      </div>

      {/* Options for Select Fields */}
      {selectedField.type === 'select' && (
        <div>
          <Label>Options (one per line)</Label>
          <Textarea
            value={(selectedField.options || []).join('\n')}
            onChange={(e) => 
              onUpdateField(selectedField.id, { 
                options: e.target.value.split('\n').filter(opt => opt.trim())
              })
            }
            disabled={readOnly}
            placeholder="Option 1&#10;Option 2&#10;Option 3"
          />
        </div>
      )}

      {/* Help Text */}
      <div>
        <Label htmlFor="field-help">Help Text</Label>
        <Input
          id="field-help"
          value={selectedField.helpText || ''}
          onChange={(e) => onUpdateField(selectedField.id, { helpText: e.target.value })}
          disabled={readOnly}
          placeholder="Additional instructions for this field"
        />
      </div>

      {/* Remove Field Button */}
      <Button
        variant="destructive"
        size="sm"
        onClick={() => onRemoveField(selectedField.id)}
        disabled={readOnly}
        className="w-full"
      >
        <Trash2 size={16} className="mr-2" />
        Remove Field
      </Button>
    </div>
  );
}
