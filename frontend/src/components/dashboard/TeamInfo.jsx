import React from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  UnorderedList, 
  ListItem, 
  Icon, 
  Flex,
  useColorModeValue,
  Spacer,
  StackDivider
} from '@chakra-ui/react';

// Team icon
const TeamIcon = (props) => (
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
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

// Building icon
const BuildingIcon = (props) => (
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
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="6" x2="12.01" y2="6"></line>
    <line x1="12" y1="10" x2="12.01" y2="10"></line>
    <line x1="12" y1="14" x2="12.01" y2="14"></line>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
);

// Users icon
const UsersIcon = (props) => (
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
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

// List icon
const ListIcon = (props) => (
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
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
);

const TeamInfo = ({ team }) => {
  // Color mode values
  const titleColor = useColorModeValue('blue.600', 'blue.300');
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  const valueColor = useColorModeValue('gray.800', 'white');
  const iconColor = useColorModeValue('blue.500', 'blue.300');
  const listItemBg = useColorModeValue('blue.50', 'blue.900');
  const scrollbarTrack = useColorModeValue('gray.100', 'gray.700');
  const scrollbarThumb = useColorModeValue('blue.400', 'blue.600');
  

  const scrollIndicatorStyles = {
    position: "absolute",
    right: "5px",
    bottom: "20px",
    width: "10px",
    height: "40px",
    borderRadius: "5px",
    background: "blue.400",
    opacity: 0.7,
    animation: "pulse 2s infinite",
  };
  
  if (!team) {
    return (
      <Box p={5} h="100%">
        <Heading size="md" mb={4} color={titleColor}>Team Information</Heading>
        <Flex align="center" justify="center" h="calc(100% - 60px)">
          <Text color={labelColor}>Loading team data...</Text>
        </Flex>
      </Box>
    );
  }

  return (
    <Box p={5} h="100%" display="flex" flexDirection="column" position="relative">
      <Heading size="md" mb={4} color={titleColor} display="flex" alignItems="center">
        <Icon as={TeamIcon} mr={2} color={iconColor} />
        Team Information
      </Heading>
      

      <Box
        sx={scrollIndicatorStyles}
        animation="fadeOut 1s forwards 5s"
        _hover={{ opacity: 0 }}
        transition="opacity 0.3s ease"
      />
      
      {/* Scrollable content area */}
      <Box 
        flex="1" 
        overflowY="auto" 
        pr={2}
        css={{
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-track': {
            background: scrollbarTrack,
            borderRadius: '6px',
            margin: '4px 0',
          },
          '&::-webkit-scrollbar-thumb': {
            background: scrollbarThumb,
            borderRadius: '6px',
            border: '2px solid transparent',
            backgroundClip: 'padding-box',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'blue.500',
            borderWidth: '1px',
          },
          '@keyframes fadeOut': {
            'from': { opacity: 0.7 },
            'to': { opacity: 0 }
          },
          '@keyframes pulse': {
            '0%': { opacity: 0.4 },
            '50%': { opacity: 0.7 },
            '100%': { opacity: 0.4 }
          }
        }}
      >
        <VStack align="start" spacing={4} divider={<StackDivider borderColor="gray.200" />}>
          <Flex width="100%" align="center">
            <Box width="120px" flexShrink={0}>
              <Text fontWeight="medium" color={labelColor}>Name:</Text>
            </Box>
            <Text fontWeight="bold" color={valueColor} fontSize="lg">
              {team.name}
            </Text>
          </Flex>
          
          <Flex width="100%" align="center">
            <Box width="120px" flexShrink={0}>
              <Text fontWeight="medium" color={labelColor} display="flex" alignItems="center">
                <Icon as={BuildingIcon} mr={1} fontSize="sm" color={iconColor} /> Department:
              </Text>
            </Box>
            <Text color={valueColor}>
              {team.department}
            </Text>
          </Flex>
          
          <Flex width="100%" align="center">
            <Box width="120px" flexShrink={0}>
              <Text fontWeight="medium" color={labelColor} display="flex" alignItems="center">
                <Icon as={UsersIcon} mr={1} fontSize="sm" color={iconColor} /> Team Size:
              </Text>
            </Box>
            <Text color={valueColor}>
              {team.members ? team.members.length : 0} members
            </Text>
          </Flex>
          
          {team.members && team.members.length > 0 && (
            <Box width="100%" pt={2}>
              <Text fontWeight="medium" color={labelColor} mb={2} display="flex" alignItems="center">
                <Icon as={ListIcon} mr={1} fontSize="sm" color={iconColor} /> Members:
              </Text>
              <UnorderedList styleType="none" ml={0} spacing={2}>
                {team.members.map((member) => (
                  <ListItem 
                    key={member.id}
                    p={2}
                    borderRadius="md"
                    bg={listItemBg}
                    transition="transform 0.2s ease, box-shadow 0.2s ease"
                    _hover={{ transform: 'translateX(5px)', boxShadow: 'sm' }}
                  >
                    <Text fontWeight="medium">{member.name}</Text>
                    <Text fontSize="sm" color={labelColor}>{member.role}</Text>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default TeamInfo;