import React from 'react';
import { Box, Text, Center } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box bg="gray.100" py={4}>
      <Center>
        <Text fontSize="sm" color="gray.500">
          © {new Date().getFullYear()} Teamwork Compatibility Checker
        </Text>
      </Center>
    </Box>
  );
};

export default Footer;