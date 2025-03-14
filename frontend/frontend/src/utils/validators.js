/**
 * Utility functions for form validation
 */

/**
 * Validates that a field is not empty
 * 
 * @param {string} value - The field value
 * @returns {string|undefined} Error message or undefined if valid
 */
export const required = (value) => {
    if (!value || value.trim() === '') {
      return 'This field is required';
    }
    return undefined;
  };
  
  /**
   * Validates email format
   * 
   * @param {string} value - The email value
   * @returns {string|undefined} Error message or undefined if valid
   */
  export const email = (value) => {
    if (!value) return undefined;
    
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(value)) {
      return 'Invalid email address';
    }
    return undefined;
  };
  
  /**
   * Validates minimum length
   * 
   * @param {number} min - Minimum length
   * @returns {function} Validator function
   */
  export const minLength = (min) => (value) => {
    if (!value) return undefined;
    
    if (value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return undefined;
  };
  
  /**
   * Validates maximum length
   * 
   * @param {number} max - Maximum length
   * @returns {function} Validator function
   */
  export const maxLength = (max) => (value) => {
    if (!value) return undefined;
    
    if (value.length > max) {
      return `Must be no more than ${max} characters`;
    }
    return undefined;
  };
  
  /**
   * Combines multiple validators
   * 
   * @param {...function} validators - Validator functions
   * @returns {function} Combined validator function
   */
  export const composeValidators = (...validators) => (value) => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) {
        return error;
      }
    }
    return undefined;
  };