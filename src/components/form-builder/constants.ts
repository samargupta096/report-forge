
/**
 * Form Builder Constants
 * 
 * Centralized constants and configuration values for the form builder.
 * This file contains all the static data used throughout the form builder system,
 * including field type definitions, icons, and descriptions.
 * 
 * @fileoverview Constants for form builder field types and configurations
 * @author Form Builder Team
 * @version 1.0.0
 */

import { 
  Type, 
  Mail, 
  Hash, 
  FileText, 
  List, 
  CheckSquare, 
  Calendar 
} from "lucide-react";
import { FieldTypeConfig } from "./types";

/**
 * Available field types with their configurations
 * Used for the field type selector in the form builder
 * 
 * Each field type includes:
 * - type: The internal field type identifier
 * - label: Display name for the field type
 * - icon: Lucide React icon component
 * - description: User-friendly description of the field type
 * 
 * @constant {FieldTypeConfig[]} FIELD_TYPES
 * 
 * @example
 * // Access a specific field type configuration
 * const textFieldConfig = FIELD_TYPES.find(field => field.type === 'text');
 * console.log(textFieldConfig.label); // "Text Input"
 * 
 * @example
 * // Iterate through all available field types
 * FIELD_TYPES.forEach(fieldType => {
 *   console.log(`${fieldType.label}: ${fieldType.description}`);
 * });
 */
export const FIELD_TYPES: FieldTypeConfig[] = [
  { 
    type: 'text', 
    label: 'Text Input', 
    icon: Type, 
    description: 'Single-line text input field for short text entries' 
  },
  { 
    type: 'email', 
    label: 'Email', 
    icon: Mail, 
    description: 'Email address input with built-in validation' 
  },
  { 
    type: 'number', 
    label: 'Number', 
    icon: Hash, 
    description: 'Numeric input field with number validation' 
  },
  { 
    type: 'textarea', 
    label: 'Text Area', 
    icon: FileText, 
    description: 'Multi-line text input for longer text content' 
  },
  { 
    type: 'select', 
    label: 'Dropdown', 
    icon: List, 
    description: 'Dropdown selection field with predefined options' 
  },
  { 
    type: 'checkbox', 
    label: 'Checkbox', 
    icon: CheckSquare, 
    description: 'Boolean checkbox input for yes/no selections' 
  },
  { 
    type: 'date', 
    label: 'Date', 
    icon: Calendar, 
    description: 'Date picker input for date selection' 
  },
];

/**
 * Default field configurations
 * Used when creating new fields of specific types
 * 
 * @constant {Object} DEFAULT_FIELD_CONFIG
 */
export const DEFAULT_FIELD_CONFIG = {
  /** Default placeholder text patterns */
  PLACEHOLDERS: {
    text: 'Enter text...',
    email: 'Enter email address...',
    number: 'Enter number...',
    textarea: 'Enter your message...',
    select: 'Select an option...',
    date: 'Select date...'
  },
  
  /** Default field labels */
  LABELS: {
    text: 'Text Field',
    email: 'Email Field',
    number: 'Number Field',
    textarea: 'Text Area Field',
    select: 'Dropdown Field',
    checkbox: 'Checkbox Field',
    date: 'Date Field'
  }
} as const;

/**
 * Validation constants
 * Used for form and field validation
 * 
 * @constant {Object} VALIDATION_CONSTANTS
 */
export const VALIDATION_CONSTANTS = {
  /** Minimum number of fields required in a form */
  MIN_FIELDS: 1,
  
  /** Maximum number of fields allowed in a form */
  MAX_FIELDS: 50,
  
  /** Maximum length for field labels */
  MAX_LABEL_LENGTH: 100,
  
  /** Maximum length for field help text */
  MAX_HELP_TEXT_LENGTH: 200,
  
  /** Maximum number of options for select fields */
  MAX_SELECT_OPTIONS: 20
} as const;
