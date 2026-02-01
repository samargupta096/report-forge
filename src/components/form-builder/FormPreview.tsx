
/**
 * Form Preview Component
 * 
 * Renders a preview of how the form will appear to end users.
 * Shows all fields with their current configuration in a read-only format.
 */

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { FormConfig } from "./types";

interface FormPreviewProps {
  form: FormConfig;
}

export default function FormPreview({ form }: FormPreviewProps) {
  return (
    <div className="space-y-6 p-6 bg-white border rounded-lg">
      <div>
        <h2 className="text-2xl font-bold">{form.title}</h2>
        {form.description && (
          <p className="text-gray-600 mt-2">{form.description}</p>
        )}
      </div>

      <form className="space-y-4">
        {form.fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={`preview-${field.id}`}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            
            {/* Render different input types */}
            {field.type === 'textarea' ? (
              <Textarea
                id={`preview-${field.id}`}
                placeholder={field.placeholder}
                disabled
              />
            ) : field.type === 'select' ? (
              <Select disabled>
                <SelectTrigger>
                  <SelectValue placeholder={field.placeholder || 'Select an option'} />
                </SelectTrigger>
                <SelectContent>
                  {(field.options || []).map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : field.type === 'checkbox' ? (
              <div className="flex items-center space-x-2">
                <Checkbox id={`preview-${field.id}`} disabled />
                <Label htmlFor={`preview-${field.id}`}>{field.label}</Label>
              </div>
            ) : (
              <Input
                id={`preview-${field.id}`}
                type={field.type}
                placeholder={field.placeholder}
                disabled
              />
            )}
            
            {field.helpText && (
              <p className="text-sm text-gray-500">{field.helpText}</p>
            )}
          </div>
        ))}

        <Button type="button" disabled className="w-full">
          {form.settings?.submitButtonText || 'Submit'}
        </Button>
      </form>
    </div>
  );
}
