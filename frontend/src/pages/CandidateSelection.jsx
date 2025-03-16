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
  SlideFade,
  Flex,
  Icon,
  HStack,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getAllCandidates, getTeam } from '../api';

// User icon component
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

// ChevronRight icon component
const ChevronRightIcon = (props) => (
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
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const CandidateSelection = () => {
  const { teamId } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
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
  const breadcrumbColor = useColorModeValue('gray.500', 'gray.400');
  
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
          <Text fontSize="lg" fontWeight="medium">Loading candidates...</Text>
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
      <Breadcrumb separator={<Icon as={ChevronRightIcon} color={breadcrumbColor} />} mb={6}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/" color={breadcrumbColor}>
            Team Selection
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color={headingColor} fontWeight="semibold">
            Candidate Selection
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    
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
            <Icon as={UserIcon} mr={3} />
            Select a Candidate
          </Heading>
          <Text mt={4} mb={1} fontSize="lg" textAlign="center" color={textColor}>
            Selected Team: <b>{team?.name}</b>
          </Text>
          <Text fontSize="md" textAlign="center" color={textColor}>
            Choose a candidate to check compatibility
          </Text>
        </Flex>
      </SlideFade>
      
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        {candidates.map(candidate => (
          <SlideFade key={candidate.id} in={true} offsetY="20px">
            <Card
              cursor="pointer"
              onClick={() => handleCandidateSelect(candidate)}
              borderColor={selectedCandidate?.id === candidate.id ? "blue.500" : borderColor}
              borderWidth={selectedCandidate?.id === candidate.id ? "2px" : "1px"}
              boxShadow={selectedCandidate?.id === candidate.id ? "md" : "base"}
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
              {selectedCandidate?.id === candidate.id && (
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
                <Heading size="md">{candidate.name}</Heading>
                <Text fontSize="sm" color={textColor}>{candidate.email}</Text>
              </CardHeader>
              <CardBody>
                <Text fontWeight="bold" mb={3}>{candidate.position}</Text>
                <Text fontSize="sm" fontWeight="medium" mb={1}>Skills:</Text>
                <HStack spacing={2} flexWrap="wrap">
                  {candidate.skills && candidate.skills.map((skill, index) => (
                    <Badge key={index} colorScheme="blue" mb={1}>
                      {skill}
                    </Badge>
                  ))}
                </HStack>
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
          px={8}
          boxShadow="md"
          _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }}
          transition="all 0.2s"
        >
          View Compatibility Results
        </Button>
      </Box>
    </Box>
  );
};

export default CandidateSelection;