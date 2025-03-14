import React from 'react';
import {
  FormControl,
  FormLabel,
  Select as ChakraSelect,
  FormErrorMessage,
  FormHelperText
} from '@chakra-ui/react';

/**
 * A reusable select component that wraps Chakra UI Select with form control
 * 
 * @param {object} props - The component props
 * @param {string} props.id - Select ID
 * @param {string} props.name - Select name
 * @param {string} props.label - Select label
 * @param {string} [props.value=''] - Selected value
 * @param {function} props.onChange - Change handler function
 * @param {string} [props.placeholder=''] - Select placeholder
 * @param {boolean} [props.isRequired=false] - Whether select is required
 * @param {boolean} [props.isDisabled=false] - Whether select is disabled
 * @param {boolean} [props.isReadOnly=false] - Whether select is read-only
 * @param {boolean} [props.isInvalid=false] - Whether select has validation error
 * @param {string} [props.error=''] - Error message
 * @param {string} [props.helperText=''] - Helper text
 * @param {Array} props.options - Array of option objects with value and label
 * @returns {JSX.Element} The Select component
 */
const Select = ({
  id,
  name,
  label,
  value = '',
  onChange,
  placeholder = '',
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  isInvalid = false,
  error = '',
  helperText = '',
  options = [],
  ...props
}) => {
  return (
    <FormControl 
      id={id} 
      isRequired={isRequired} 
      isInvalid={isInvalid} 
      mb={4}
    >
      {label && <FormLabel>{label}</FormLabel>}
      
      <ChakraSelect
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </ChakraSelect>
      
      {helperText && !isInvalid && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
      
      {isInvalid && error && (
        <FormErrorMessage>{error}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default Select;