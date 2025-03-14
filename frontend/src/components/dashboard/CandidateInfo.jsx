import React, { useState } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  Badge, 
  HStack, 
  Flex, 
  Tooltip, 
  Icon,
  useColorModeValue,
  Spacer,
  StackDivider
} from '@chakra-ui/react';

// Simple icons as React components
const UserIcon = (props) => (
  <svg 
    stroke="currentColor" 
    fill="none" 
    strokeWidth="2" 
    viewBox="0 0 24 24" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    height="1em" 
    width="1em" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const BriefcaseIcon = (props) => (
  <svg 
    stroke="currentColor" 
    fill="none" 
    strokeWidth="2" 
    viewBox="0 0 24 24" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    height="1em" 
    width="1em" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const EmailIcon = (props) => (
  <svg 
    stroke="currentColor" 
    fill="none" 
    strokeWidth="2" 
    viewBox="0 0 24 24" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    height="1em" 
    width="1em" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const CogIcon = (props) => (
  <svg 
    stroke="currentColor" 
    fill="none" 
    strokeWidth="2" 
    viewBox="0 0 24 24" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    height="1em" 
    width="1em" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const CandidateInfo = ({ candidate }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  
  // Color mode values
  const titleColor = useColorModeValue('blue.600', 'blue.300');
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  const valueColor = useColorModeValue('gray.800', 'white');
  const iconColor = useColorModeValue('blue.500', 'blue.300');
  const badgeBg = useColorModeValue('blue.50', 'blue.900');
  const badgeTextColor = useColorModeValue('blue.700', 'blue.200');
  const scrollbarTrack = useColorModeValue('gray.100', 'gray.700');
  const scrollbarThumb = useColorModeValue('blue.400', 'blue.600');
  
  if (!candidate) {
    return (
      <Box p={5} h="100%">
        <Heading size="md" mb={4} color={titleColor}>Candidate Information</Heading>
        <Flex align="center" justify="center" h="calc(100% - 60px)">
          <Text color={labelColor}>Loading candidate data...</Text>
        </Flex>
      </Box>
    );
  }
  
  // Skill descriptions - a mapping of skill to description
  const skillDescriptions = {
    'JavaScript': 'Front-end and back-end web development language',
    'React': 'JavaScript library for building user interfaces',
    'UI Design': 'User interface design principles and tools',
    'CSS': 'Styling language for web development',
    'TypeScript': 'Strongly typed programming language that builds on JavaScript'
  };

  return (
    <Box p={5} h="100%" display="flex" flexDirection="column">
      <Heading size="md" mb={4} color={titleColor} display="flex" alignItems="center">
        <Icon as={UserIcon} mr={2} color={iconColor} />
        Candidate Information
      </Heading>
      
      {/* Scrollable content area */}
      <Box 
        flex="1" 
        overflowY="auto" 
        pr={2}
        css={{
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: scrollbarTrack,
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: scrollbarThumb,
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'blue.500',
          },
        }}
      >
        <VStack align="start" spacing={4} divider={<StackDivider borderColor="gray.200" />}>
          <Flex width="100%" align="center">
            <Box width="100px" flexShrink={0}>
              <Text fontWeight="medium" color={labelColor}>Name:</Text>
            </Box>
            <Text fontWeight="bold" color={valueColor} fontSize="lg">
              {candidate.name}
            </Text>
          </Flex>
          
          <Flex width="100%" align="center">
            <Box width="100px" flexShrink={0}>
              <Text fontWeight="medium" color={labelColor} display="flex" alignItems="center">
                <Icon as={BriefcaseIcon} mr={1} fontSize="sm" color={iconColor} /> Position:
              </Text>
            </Box>
            <Text color={valueColor}>
              {candidate.position}
            </Text>
          </Flex>
          
          <Flex width="100%" align="center">
            <Box width="100px" flexShrink={0}>
              <Text fontWeight="medium" color={labelColor} display="flex" alignItems="center">
                <Icon as={EmailIcon} mr={1} fontSize="sm" color={iconColor} /> Email:
              </Text>
            </Box>
            <Text color={valueColor}>
              {candidate.email}
            </Text>
          </Flex>
          
          {candidate.skills && (
            <Box width="100%" pt={2}>
              <Text fontWeight="medium" color={labelColor} mb={2} display="flex" alignItems="center">
                <Icon as={CogIcon} mr={1} fontSize="sm" color={iconColor} /> Skills:
              </Text>
              <Flex flexWrap="wrap" mt={1}>
                {candidate.skills.map((skill, index) => (
                  <Tooltip 
                    key={index} 
                    label={skillDescriptions[skill] || `Skill in ${skill}`}
                    placement="top"
                    hasArrow
                  >
                    <Badge
                      mr={2}
                      mb={2}
                      px={3}
                      py={1}
                      borderRadius="full"
                      bg={hoveredSkill === skill ? 'blue.100' : badgeBg}
                      color={hoveredSkill === skill ? 'blue.800' : badgeTextColor}
                      fontWeight="medium"
                      boxShadow={hoveredSkill === skill ? 'sm' : 'none'}
                      transform={hoveredSkill === skill ? 'translateY(-2px)' : 'none'}
                      transition="all 0.2s ease"
                      cursor="pointer"
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      {skill}
                    </Badge>
                  </Tooltip>
                ))}
              </Flex>
            </Box>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default CandidateInfo;