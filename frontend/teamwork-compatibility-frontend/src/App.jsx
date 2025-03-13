import { useState, useEffect } from 'react';
import { 
  ChakraProvider, 
  Container, 
  Heading, 
  SimpleGrid, 
  Box, 
  Flex, 
  Spinner,
  Center,
  Text,
  Alert
} from '@chakra-ui/react';
import CandidateInfo from './components/CandidateInfo';
import TeamInfo from './components/TeamInfo';
import CompatibilityChart from './components/CompatibilityChart';
import CompatibilitySummary from './components/CompatibilitySummary';

import { getTeam, getCandidate, getCompatibilityScore, getCompatibilitySummary } from './api/api';

function App() {
  const [team, setTeam] = useState(null);
  const [candidate, setCandidate] = useState(null);
  const [compatibilityData, setCompatibilityData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [teamData, candidateData, compatibilityData, summaryData] = await Promise.all([
          getTeam(),
          getCandidate(),
          getCompatibilityScore(),
          getCompatibilitySummary()
        ]);
        
        setTeam(teamData);
        setCandidate(candidateData);
        setCompatibilityData(compatibilityData);
        setSummary(summaryData);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <ChakraProvider>
        <Center height="100vh">
          <Flex direction="column" align="center">
            <Spinner size="xl" mb={4} />
            <Text>Loading compatibility data...</Text>
          </Flex>
        </Center>
      </ChakraProvider>
    );
  }

  if (error) {
    return (
      <ChakraProvider>
        <Container maxW="container.xl" py={10}>
          <Box p={4} borderRadius="md" bg="red.100" color="red.700">
            {error}
          </Box>
        </Container>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      <Container maxW="container.xl" py={8}>
        <Heading as="h1" mb={8} textAlign="center">Teamwork Compatibility Dashboard</Heading>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
          <CandidateInfo candidate={candidate} />
          <TeamInfo team={team} />
        </SimpleGrid>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <CompatibilityChart compatibilityData={compatibilityData} />
          <CompatibilitySummary 
            compatibilityData={compatibilityData} 
            summary={summary} 
          />
        </SimpleGrid>
      </Container>
    </ChakraProvider>
  );
}

export default App;