import React from 'react';
import {
  Box,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

/**
 * A reusable card component with consistent styling
 * 
 * @param {object} props - The component props
 * @param {string} [props.title] - Card title
 * @param {string} [props.subtitle] - Card subtitle
 * @param {boolean} [props.hasHover=false] - Whether card has hover effect
 * @param {React.ReactNode} props.children - Card content
 * @returns {JSX.Element} The Card component
 */
const Card = ({ 
  title, 
  subtitle, 
  hasHover = false, 
  children, 
  ...props 
}) => {
  // Dynamic styles
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Hover styles
  const hoverStyles = hasHover ? {
    transform: 'translateY(-5px)',
    boxShadow: 'lg',
    transition: 'all 0.3s ease'
  } : {};

  return (
    <Box
      bg={bg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      shadow="md"
      transition="all 0.2s ease"
      _hover={hoverStyles}
      {...props}
    >
      {title && (
        <Box p={4} borderBottomWidth={subtitle || children ? "1px" : "0"}>
          <Heading size="md">{title}</Heading>
          {subtitle && <Text mt={1} color="gray.600">{subtitle}</Text>}
        </Box>
      )}
      
      {children && (
        <Box p={4}>
          {children}
        </Box>
      )}
    </Box>
  );
};

export default Card;