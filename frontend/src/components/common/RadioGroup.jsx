import React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup as ChakraRadioGroup,
  Radio,
  Stack,
  FormErrorMessage,
  FormHelperText
} from '@chakra-ui/react';

/**
 * A reusable radio group component that wraps Chakra UI RadioGroup with form control
 * 
 * @param {object} props - The component props
 * @param {string} props.id - RadioGroup ID
 * @param {string} props.name - RadioGroup name
 * @param {string} props.label - RadioGroup label
 * @param {string} [props.value=''] - Selected value
 * @param {function} props.onChange - Change handler function
 * @param {boolean} [props.isRequired=false] - Whether input is required
 * @param {boolean} [props.isDisabled=false] - Whether input is disabled
 * @param {boolean} [props.isInvalid=false] - Whether input has validation error
 * @param {string} [props.error=''] - Error message
 * @param {string} [props.helperText=''] - Helper text
 * @param {string} [props.direction='column'] - Stack direction
 * @param {Array} props.options - Array of option objects with value and label
 * @returns {JSX.Element} The RadioGroup component
 */
const RadioGroup = ({
  id,
  name,
  label,
  value = '',
  onChange,
  isRequired = false,
  isDisabled = false,
  isInvalid = false,
  error = '',
  helperText = '',
  direction = 'column',
  options = [],
  ...props
}) => {
  // Adapt onChange to match expected format
  const handleChange = (val) => {
    onChange({
      target: {
        name,
        value: val
      }
    });
  };

  return (
    <FormControl 
      id={id} 
      isRequired={isRequired} 
      isInvalid={isInvalid} 
      mb={4}
    >
      {label && <FormLabel>{label}</FormLabel>}
      
      <ChakraRadioGroup
        name={name}
        value={value}
        onChange={handleChange}
        isDisabled={isDisabled}
        {...props}
      >
        <Stack direction={direction} spacing={4}>
          {options.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Stack>
      </ChakraRadioGroup>
      
      {helperText && !isInvalid && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
      
      {isInvalid && error && (
        <FormErrorMessage>{error}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default RadioGroup;