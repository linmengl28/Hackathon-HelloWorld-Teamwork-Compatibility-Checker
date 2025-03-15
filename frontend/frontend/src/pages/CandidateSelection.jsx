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
  Badge,
  Stack,
  useToast,
  SlideFade 
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllCandidates, getTeam } from '../api';

const CandidateSelection = () => {
  const { teamId } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch candidates and team info in parallel
        const [candidatesData, teamData] = await Promise.all([
          getAllCandidates(),
          getTeam(parseInt(teamId))
        ]);
        
        setCandidates(candidatesData);
        setTeam(teamData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load data. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [teamId, toast]);
  
  const handleCandidateSelect = (candidate) => {
    setSelectedCandidate(candidate);
  };
  
  const handleViewResults = () => {
    if (!selectedCandidate) {
      toast({
        title: 'Selection required',
        description: 'Please select a candidate to continue',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    // Navigate to the dashboard with team and candidate IDs
    navigate(`/dashboard/${teamId}/${selectedCandidate.id}`);
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
        <Heading as="h1" mb={6} textAlign="center" color="blue.700">Select a Candidate</Heading>
        <Text mb={6} textAlign="center">
          Selected Team: <b>{team?.name}</b> - Choose a candidate to check compatibility
        </Text>
      </SlideFade>
      
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        {candidates.map(candidate => (
          <SlideFade key={candidate.id} in={true} offsetY="20px">
            <Card 
              cursor="pointer"
              onClick={() => handleCandidateSelect(candidate)}
              borderColor={selectedCandidate?.id === candidate.id ? "blue.500" : "gray.200"}
              borderWidth={selectedCandidate?.id === candidate.id ? "2px" : "1px"}
              boxShadow={selectedCandidate?.id === candidate.id ? "md" : "base"}
              _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
              transition="all 0.3s"
            >
              <CardHeader pb={2}>
                <Heading size="md">{candidate.name}</Heading>
                <Text fontSize="sm" color="gray.600">{candidate.email}</Text>
              </CardHeader>
              <CardBody>
                <Text fontWeight="bold" mb={2}>{candidate.position}</Text>
                <Stack direction="row" flexWrap="wrap">
                  {candidate.skills && candidate.skills.map((skill, index) => (
                    <Badge key={index} colorScheme="blue" mb={1}>
                      {skill}
                    </Badge>
                  ))}
                </Stack>
              </CardBody>
            </Card>
          </SlideFade>
        ))}
      </SimpleGrid>
      
      <Box textAlign="center" mt={8}>
        <Button 
          colorScheme="blue" 
          size="lg"
          onClick={handleViewResults}
          isDisabled={!selectedCandidate}
        >
          View Compatibility Results
        </Button>
      </Box>
    </Box>
  );
};

export default CandidateSelection;