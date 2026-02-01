
/**
 * Form Builder Type Definitions
 * 
 * Centralized type definitions for the form builder system.
 * Provides type safety and consistency across all form builder components.
 */

import { ComponentType } from "react";

/**
 * Field Type Definitions
 * Defines all available form field types with their properties
 */
export type FieldType = 
  | 'text' 
  | 'email' 
  | 'number' 
  | 'textarea' 
  | 'select' 
  | 'checkbox' 
  | 'radio' 
  | 'date'
  | 'file';

/**
 * Form Field Configuration Interface
 * Defines the structure of each form field
 */
export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  defaultValue?: any;
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
  };
  helpText?: string;
}

/**
 * Form Configuration Interface
 * Defines the complete form structure
 */
export interface FormConfig {
  title: string;
  description?: string;
  fields: FormField[];
  settings?: {
    submitButtonText?: string;
    showProgressBar?: boolean;
    allowSaveDraft?: boolean;
    multiStep?: boolean;
  };
}

/**
 * Form Builder Props Interface
 */
export interface FormBuilderProps {
  initialForm?: FormConfig;
  onFormSave: (form: FormConfig) => void;
  onFormSubmit?: (data: any) => void;
  allowPreview?: boolean;
  readOnly?: boolean;
}

/**
 * Field Type Configuration
 */
export interface FieldTypeConfig {
  type: FieldType;
  label: string;
  icon: ComponentType<any>;
  description: string;
}
