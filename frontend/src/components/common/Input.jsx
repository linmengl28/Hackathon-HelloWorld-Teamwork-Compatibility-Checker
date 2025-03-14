import React from 'react';
import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  FormErrorMessage,
  FormHelperText
} from '@chakra-ui/react';

/**
 * A reusable input component that wraps Chakra UI Input with form control
 * 
 * @param {object} props - The component props
 * @param {string} props.id - Input ID
 * @param {string} props.name - Input name
 * @param {string} [props.type='text'] - Input type
 * @param {string} props.label - Input label
 * @param {string} [props.value=''] - Input value
 * @param {function} props.onChange - Change handler function
 * @param {string} [props.placeholder=''] - Input placeholder
 * @param {boolean} [props.isRequired=false] - Whether input is required
 * @param {boolean} [props.isDisabled=false] - Whether input is disabled
 * @param {boolean} [props.isReadOnly=false] - Whether input is read-only
 * @param {boolean} [props.isInvalid=false] - Whether input has validation error
 * @param {string} [props.error=''] - Error message
 * @param {string} [props.helperText=''] - Helper text
 * @returns {JSX.Element} The Input component
 */
const Input = ({
  id,
  name,
  type = 'text',
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
      
      <ChakraInput
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        {...props}
      />
      
      {helperText && !isInvalid && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
      
      {isInvalid && error && (
        <FormErrorMessage>{error}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default Input;