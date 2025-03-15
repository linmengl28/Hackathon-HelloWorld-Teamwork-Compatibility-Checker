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
  SlideFade
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getAllTeams } from '../api';

const TeamSelection = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  
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
      <Center height="calc(100vh - 200px)">
        <Spinner 
          size="xl" 
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
        />
      </Center>
    );
  }
  
  return (
    <Box 
      minH="calc(100vh - 150px)" 
      py={8} 
      px={4}
      bgGradient="linear(to-br, blue.50, gray.50)"
    >
      <SlideFade in={true} offsetY="-20px">
        <Heading as="h1" mb={6} textAlign="center" color="blue.700">Select a Team</Heading>
        <Text mb={6} textAlign="center">
          Choose a team to check candidate compatibility with
        </Text>
      </SlideFade>
      
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        {teams.map(team => (
          <SlideFade key={team.id} in={true} offsetY="20px">
            <Card 
              cursor="pointer"
              onClick={() => handleTeamSelect(team)}
              borderColor={selectedTeam?.id === team.id ? "blue.500" : "gray.200"}
              borderWidth={selectedTeam?.id === team.id ? "2px" : "1px"}
              boxShadow={selectedTeam?.id === team.id ? "md" : "base"}
              _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
              transition="all 0.3s"
            >
              <CardHeader pb={2}>
                <Heading size="md">{team.name}</Heading>
              </CardHeader>
              <CardBody>
                <Text>Department: {team.department}</Text>
                <Text>Members: {team.members ? team.members.length : 0}</Text>
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
        >
          Next: Select Candidate
        </Button>
      </Box>
    </Box>
  );
};

export default TeamSelection;