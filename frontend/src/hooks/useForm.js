import { useState } from 'react';

/**
 * Custom hook for handling form state and validation
 * 
 * @param {object} initialValues - Initial form values
 * @param {object} [validators={}] - Validation functions for each field
 * @returns {object} Form methods and state
 */
const useForm = (initialValues = {}, validators = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handles form input changes
   * 
   * @param {object} e - Event object
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setValues({
      ...values,
      [name]: value
    });

    // Validate field if it's already been touched
    if (touched[name] && validators[name]) {
      const error = validators[name](value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  /**
   * Marks a field as touched and validates it
   * 
   * @param {object} e - Event object
   */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    if (validators[name]) {
      const error = validators[name](value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  /**
   * Validates all form fields
   * 
   * @returns {boolean} Whether the form is valid
   */
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Mark all fields as touched
    const newTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    
    setTouched(newTouched);

    // Validate all fields
    Object.keys(validators).forEach(field => {
      const error = validators[field](values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Handles form submission
   * 
   * @param {function} onSubmit - Function to call on valid submission
   * @returns {function} Submit handler function
   */
  const handleSubmit = (onSubmit) => async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isValid = validateForm();
    
    if (isValid) {
      try {
        await onSubmit(values);
        // Could reset form here if needed
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
  };

  /**
   * Resets the form to initial values
   */
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues
  };
};

export default useForm;