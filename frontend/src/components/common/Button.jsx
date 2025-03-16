import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

/**
 * A reusable button component that wraps Chakra UI Button
 * 
 * @param {object} props - The component props
 * @param {string} [props.size='md'] - Button size (xs, sm, md, lg)
 * @param {string} [props.variant='solid'] - Button variant (solid, outline, ghost, link)
 * @param {string} [props.colorScheme='blue'] - Button color scheme
 * @param {boolean} [props.isFullWidth=false] - Whether button should take full width
 * @param {boolean} [props.isLoading=false] - Whether button is in loading state
 * @param {boolean} [props.isDisabled=false] - Whether button is disabled
 * @param {function} [props.onClick] - Click handler function
 * @param {React.ReactNode} props.children - Button content
 * @returns {JSX.Element} The Button component
 */
const Button = ({ 
  size = 'md',
  variant = 'solid',
  colorScheme = 'blue',
  isFullWidth = false,
  isLoading = false,
  isDisabled = false,
  onClick,
  children,
  ...props
}) => {
  return (
    <ChakraButton
      size={size}
      variant={variant}
      colorScheme={colorScheme}
      isFullWidth={isFullWidth}
      isLoading={isLoading}
      isDisabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;