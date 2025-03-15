import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Button,
  Text,
  Spinner,
  Center,
  useToast,
  SlideFade,
  Flex,
  Icon,
  useColorModeValue,
  Badge
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getAllTeams } from '../api';

// Team icon component
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

const TeamSelection = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  
  // Theme colors
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, gray.50)',
    'linear(to-br, gray.800, blue.900)'
  );
  const headingColor = useColorModeValue('blue.700', 'blue.300');
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardHoverBg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const teamsData = await getAllTeams();
        setTeams(teamsData);
      } catch (error) {
        console.error('Error fetching teams:', error);
        toast({
          title: 'Error',
          description: 'Failed to load teams. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchTeams();
  }, [toast]);
  
  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };
  
  const handleNext = () => {
    if (!selectedTeam) {
      toast({
        title: 'Selection required',
        description: 'Please select a team to continue',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    // Navigate to candidate selection with the selected team ID
    navigate(`/candidate-selection/${selectedTeam.id}`);
  };
  
  if (loading) {
    return (
      <Center height="calc(100vh - 200px)" bgGradient={bgGradient}>
        <Flex direction="column" align="center">
          <Spinner
            size="xl"
            mb={4}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
          />
          <Text fontSize="lg" fontWeight="medium">Loading teams...</Text>
        </Flex>
      </Center>
    );
  }
  
  return (
    <Box
      minH="calc(100vh - 150px)"
      py={8}
      px={4}
      bgGradient={bgGradient}
    >
      <SlideFade in={true} offsetY="-20px">
        <Flex direction="column" align="center" mb={8}>
          <Heading
            as="h1"
            size="xl"
            color={headingColor}
            fontWeight="bold"
            letterSpacing="tight"
            textAlign="center"
            display="flex"
            alignItems="center"
          >
            <Icon as={TeamIcon} mr={3} />
            Team Selection
          </Heading>
          <Text mt={4} mb={6} fontSize="lg" textAlign="center" color={textColor}>
            Choose a team to check candidate compatibility with
          </Text>
        </Flex>
      </SlideFade>
      
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        {teams.map(team => (
          <SlideFade key={team.id} in={true} offsetY="20px">
            <Card
              cursor="pointer"
              onClick={() => handleTeamSelect(team)}
              borderColor={selectedTeam?.id === team.id ? "blue.500" : borderColor}
              borderWidth={selectedTeam?.id === team.id ? "2px" : "1px"}
              boxShadow={selectedTeam?.id === team.id ? "md" : "base"}
              bg={cardBg}
              _hover={{ 
                transform: 'translateY(-5px)', 
                boxShadow: 'lg',
                bg: cardHoverBg
              }}
              transition="all 0.3s ease"
              position="relative"
              overflow="hidden"
            >
              {selectedTeam?.id === team.id && (
                <Badge 
                  position="absolute" 
                  top={0} 
                  right={0} 
                  colorScheme="blue" 
                  m={2}
                  px={2}
                  py={1}
                  borderRadius="md"
                >
                  Selected
                </Badge>
              )}
              <CardHeader pb={2}>
                <Heading size="md">{team.name}</Heading>
              </CardHeader>
              <CardBody>
                <Text mb={2}><strong>Department:</strong> {team.department}</Text>
                <Text><strong>Members:</strong> {team.members ? team.members.length : 0}</Text>
                {team.members && team.members.length > 0 && (
                  <Box mt={4}>
                    <Text fontSize="sm" fontWeight="medium" mb={1}>Team Roles:</Text>
                    <Flex flexWrap="wrap">
                      {team.members.slice(0, 3).map((member, idx) => (
                        <Badge key={idx} colorScheme="green" mr={2} mb={1}>
                          {member.role}
                        </Badge>
                      ))}
                      {team.members.length > 3 && (
                        <Badge colorScheme="green" variant="outline">
                          +{team.members.length - 3} more
                        </Badge>
                      )}
                    </Flex>
                  </Box>
                )}
              </CardBody>
            </Card>
          </SlideFade>
        ))}
      </SimpleGrid>
      
      <Box textAlign="center" mt={8}>
        <Button
          colorScheme="blue"
          size="lg"
          onClick={handleNext}
          isDisabled={!selectedTeam}
          px={8}
          boxShadow="md"
          _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }}
          transition="all 0.2s"
        >
          Next: Select Candidate
        </Button>
      </Box>
    </Box>
  );
};

export default TeamSelection;