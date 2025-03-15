import React from 'react';
import { Box, Flex, Heading, Spacer, Button, HStack, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isDashboardActive = location.pathname === '/';
  
  const activeBg = useColorModeValue('blue.700', 'blue.700');
  const hoverBg = useColorModeValue('blue.500', 'blue.500');
  
  return (
    <Box bg="blue.600" px={4} py={3} color="white" shadow="md">
      <Flex alignItems="center" maxW="container.xl" mx="auto">
        <Heading size="md">Teamwork Compatibility Checker</Heading>
        <Spacer />
        <HStack spacing={3}>
          <Button
            as={RouterLink}
            to="/"
            bg={isDashboardActive ? activeBg : 'transparent'}
            color="white"
            _hover={{ bg: hoverBg }}
            borderRadius="md"
            fontWeight={isDashboardActive ? "bold" : "normal"}
            px={4}
            py={2}
            shadow={isDashboardActive ? "md" : "none"}
            leftIcon={<span role="img" aria-label="dashboard">📊</span>}
          >
            Dashboard
          </Button>
          
          {/* External link to the standalone questionnaire */}
          <Button
            as="a"
            href="/questionnaire"
            target="_blank" 
            rel="noopener noreferrer"
            bg="transparent"
            color="white"
            _hover={{ bg: hoverBg }}
            borderRadius="md"
            fontWeight="normal"
            px={4}
            py={2}
            leftIcon={<span role="img" aria-label="questionnaire">📋</span>}
          >
            Candidate Questionnaire
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;