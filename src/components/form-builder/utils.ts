
/**
 * Form Builder Utility Functions
 * 
 * Reusable utility functions for form building operations.
 * This module provides helper functions for field management,
 * form validation, and data manipulation within the form builder.
 * 
 * @fileoverview Utility functions for form builder operations
 * @author Form Builder Team
 * @version 1.0.0
 */

import { FormField, FieldType, FormConfig } from "./types";
import { DEFAULT_FIELD_CONFIG, VALIDATION_CONSTANTS } from "./constants";

/**
 * Generates a unique ID for new form fields
 * Uses timestamp and random number for uniqueness to ensure
 * no collisions even in rapid field creation scenarios
 * 
 * @returns {string} Unique field ID in format: field_timestamp_randomString
 * 
 * @example
 * const newFieldId = generateFieldId();
 * console.log(newFieldId); // "field_1698765432000_abc123def"
 */
export const generateFieldId = (): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substr(2, 9);
  return `field_${timestamp}_${randomString}`;
};

/**
 * Creates a new field with default properties based on the field type
 * 
 * @param {FieldType} type - Type of field to create
 * @returns {FormField} New field configuration with sensible defaults
 * 
 * @example
 * const textField = createNewField('text');
 * console.log(textField.label); // "Text Field"
 * console.log(textField.placeholder); // "Enter text..."
 * 
 * @example
 * const selectField = createNewField('select');
 * console.log(selectField.options); // ["Option 1", "Option 2"]
 */
export const createNewField = (type: FieldType): FormField => {
  const baseField: FormField = {
    id: generateFieldId(),
    type,
    label: DEFAULT_FIELD_CONFIG.LABELS[type] || `New ${type} Field`,
    placeholder: DEFAULT_FIELD_CONFIG.PLACEHOLDERS[type] || `Enter ${type}...`,
    required: false,
  };

  // Add type-specific properties
  switch (type) {
    case 'select':
      baseField.options = ['Option 1', 'Option 2'];
      break;
    case 'checkbox':
      baseField.defaultValue = false;
      break;
    case 'number':
      baseField.validation = {
        min: 0,
        max: 100
      };
      break;
    case 'textarea':
      baseField.validation = {
        maxLength: 500
      };
      break;
    default:
      break;
  }

  return baseField;
};

/**
 * Validates form configuration before saving
 * Performs comprehensive validation of form structure and field configurations
 * 
 * @param {FormConfig} form - Form configuration to validate
 * @returns {Object} Validation result with success flag and detailed errors
 * @returns {boolean} returns.isValid - Whether the form is valid
 * @returns {string[]} returns.errors - Array of validation error messages
 * @returns {string[]} returns.warnings - Array of validation warnings (non-blocking)
 * 
 * @example
 * const validationResult = validateForm(formConfig);
 * if (!validationResult.isValid) {
 *   console.error('Form validation failed:', validationResult.errors);
 * }
 * 
 * @example
 * const { isValid, errors, warnings } = validateForm(formConfig);
 * if (warnings.length > 0) {
 *   console.warn('Form has warnings:', warnings);
 * }
 */
export const validateForm = (form: FormConfig) => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate form title
  if (!form.title || !form.title.trim()) {
    errors.push("Form title is required and cannot be empty.");
  } else if (form.title.length > 100) {
    errors.push("Form title cannot exceed 100 characters.");
  }

  // Validate field count
  if (form.fields.length === 0) {
    errors.push("Form must have at least one field.");
  } else if (form.fields.length > VALIDATION_CONSTANTS.MAX_FIELDS) {
    errors.push(`Form cannot have more than ${VALIDATION_CONSTANTS.MAX_FIELDS} fields.`);
  }

  // Check for duplicate field labels
  const fieldLabels = form.fields.map((field: FormField) => field.label.toLowerCase());
  const duplicateLabels = fieldLabels.filter((label, index) => fieldLabels.indexOf(label) !== index);
  
  if (new Set(duplicateLabels).size > 0) {
    warnings.push("Some fields have duplicate labels. Consider making them unique for better user experience.");
  }

  // Validate individual fields
  form.fields.forEach((field: FormField, index: number) => {
    const fieldPrefix = `Field ${index + 1} (${field.label})`;
    
    // Validate field label
    if (!field.label || !field.label.trim()) {
      errors.push(`${fieldPrefix}: Field label is required.`);
    } else if (field.label.length > VALIDATION_CONSTANTS.MAX_LABEL_LENGTH) {
      errors.push(`${fieldPrefix}: Field label cannot exceed ${VALIDATION_CONSTANTS.MAX_LABEL_LENGTH} characters.`);
    }

    // Validate help text length
    if (field.helpText && field.helpText.length > VALIDATION_CONSTANTS.MAX_HELP_TEXT_LENGTH) {
      errors.push(`${fieldPrefix}: Help text cannot exceed ${VALIDATION_CONSTANTS.MAX_HELP_TEXT_LENGTH} characters.`);
    }

    // Validate select field options
    if (field.type === 'select') {
      if (!field.options || field.options.length === 0) {
        errors.push(`${fieldPrefix}: Select field must have at least one option.`);
      } else if (field.options.length > VALIDATION_CONSTANTS.MAX_SELECT_OPTIONS) {
        errors.push(`${fieldPrefix}: Select field cannot have more than ${VALIDATION_CONSTANTS.MAX_SELECT_OPTIONS} options.`);
      } else {
        const emptyOptions = field.options.filter(option => !option.trim());
        if (emptyOptions.length > 0) {
          warnings.push(`${fieldPrefix}: Some select options are empty.`);
        }
      }
    }

    // Validate number field constraints
    if (field.type === 'number' && field.validation) {
      if (field.validation.min !== undefined && field.validation.max !== undefined) {
        if (field.validation.min >= field.validation.max) {
          errors.push(`${fieldPrefix}: Minimum value must be less than maximum value.`);
        }
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Clones a form field with a new ID
 * Useful for duplicating fields while maintaining unique identifiers
 * 
 * @param {FormField} field - Field to clone
 * @returns {FormField} Cloned field with new ID
 * 
 * @example
 * const originalField = { id: 'field_1', type: 'text', label: 'Name' };
 * const clonedField = cloneField(originalField);
 * console.log(clonedField.id !== originalField.id); // true
 * console.log(clonedField.label); // "Name (Copy)"
 */
export const cloneField = (field: FormField): FormField => {
  return {
    ...field,
    id: generateFieldId(),
    label: `${field.label} (Copy)`
  };
};

/**
 * Reorders fields in a form
 * Moves a field from one position to another
 * 
 * @param {FormField[]} fields - Array of form fields
 * @param {number} fromIndex - Current index of the field
 * @param {number} toIndex - Target index for the field
 * @returns {FormField[]} New array with reordered fields
 * 
 * @example
 * const reorderedFields = reorderFields(fields, 0, 2);
 * // Moves first field to third position
 */
export const reorderFields = (fields: FormField[], fromIndex: number, toIndex: number): FormField[] => {
  const result = Array.from(fields);
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
};

/**
 * Exports form configuration to JSON string
 * Useful for saving or sharing form configurations
 * 
 * @param {FormConfig} form - Form configuration to export
 * @returns {string} JSON string representation of the form
 * 
 * @example
 * const jsonString = exportFormToJSON(formConfig);
 * localStorage.setItem('savedForm', jsonString);
 */
export const exportFormToJSON = (form: FormConfig): string => {
  return JSON.stringify(form, null, 2);
};

/**
 * Imports form configuration from JSON string
 * Validates the imported data and returns a form configuration
 * 
 * @param {string} jsonString - JSON string to parse
 * @returns {FormConfig | null} Parsed form configuration or null if invalid
 * 
 * @example
 * const savedForm = localStorage.getItem('savedForm');
 * const formConfig = importFormFromJSON(savedForm);
 * if (formConfig) {
 *   setForm(formConfig);
 * }
 */
export const importFormFromJSON = (jsonString: string): FormConfig | null => {
  try {
    const parsed = JSON.parse(jsonString);
    
    // Basic validation
    if (!parsed.title || !Array.isArray(parsed.fields)) {
      return null;
    }
    
    return parsed as FormConfig;
  } catch (error) {
    console.error('Failed to parse form JSON:', error);
    return null;
  }
};
