import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heading,
  SimpleGrid,
  Box,
  Flex,
  Spinner,
  Center,
  Text,
  useColorModeValue,
  SlideFade,
  Divider,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
  Button
} from '@chakra-ui/react';

import CandidateInfo from '../components/dashboard/CandidateInfo';
import TeamInfo from '../components/dashboard/TeamInfo';
import CompatibilityChart from '../components/dashboard/CompatibilityChart';
import CompatibilitySummary from '../components/dashboard/CompatibilitySummary';

import { getTeam, getCandidate, getCompatibilityData } from '../api';

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

// Animation delays for staggered appearance
const ANIMATION_DELAYS = {
  title: 0.2,
  candidate: 0.4,
  team: 0.6,
  chart: 0.8,
  summary: 1.0
};

const CARD_HEIGHT = "450px";

const Dashboard = () => {
  const { teamId, candidateId } = useParams();
  const [team, setTeam] = useState(null);
  const [candidate, setCandidate] = useState(null);
  const [compatibilityData, setCompatibilityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Animation states for elements
  const [showElements, setShowElements] = useState({
    title: false,
    candidate: false,
    team: false,
    chart: false,
    summary: false
  });

  // Theme colors
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, gray.50)',
    'linear(to-br, gray.800, blue.900)'
  );
  const headingColor = useColorModeValue('blue.700', 'blue.300');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const breadcrumbColor = useColorModeValue('gray.500', 'gray.400');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Parse IDs, defaulting to 1 if not provided (for backward compatibility)
        const parsedTeamId = teamId ? parseInt(teamId) : 1;
        const parsedCandidateId = candidateId ? parseInt(candidateId) : 1;
        
        // Fetch all data in parallel, using the IDs from the URL
        // Now using the new getCompatibilityData function that makes a single API call
        const [teamData, candidateData, compatData] = await Promise.all([
          getTeam(parsedTeamId),
          getCandidate(parsedCandidateId),
          getCompatibilityData(parsedTeamId, parsedCandidateId)
        ]);
        
        setTeam(teamData);
        setCandidate(candidateData);
        setCompatibilityData(compatData);
        
        // Set loading to false
        setLoading(false);

        // Start animations after data is loaded
        setTimeout(() => setShowElements(prev => ({ ...prev, title: true })), ANIMATION_DELAYS.title * 1000);
        setTimeout(() => setShowElements(prev => ({ ...prev, candidate: true })), ANIMATION_DELAYS.candidate * 1000);
        setTimeout(() => setShowElements(prev => ({ ...prev, team: true })), ANIMATION_DELAYS.team * 1000);
        setTimeout(() => setShowElements(prev => ({ ...prev, chart: true })), ANIMATION_DELAYS.chart * 1000);
        setTimeout(() => setShowElements(prev => ({ ...prev, summary: true })), ANIMATION_DELAYS.summary * 1000);
        
        // Mark all animations as complete after all elements are shown
        setTimeout(() => setAnimationComplete(true), (ANIMATION_DELAYS.summary + 0.5) * 1000);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [teamId, candidateId]);

  if (loading) {
    return (
      <Center height="calc(100vh - 150px)" bgGradient={bgGradient}>
        <Flex direction="column" align="center">
          <Spinner 
            size="xl" 
            mb={4} 
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
          />
          <Text fontSize="lg" fontWeight="medium">Loading compatibility dashboard...</Text>
          <Text fontSize="sm" color="gray.500" mt={2}>Analyzing candidate-team fit</Text>
        </Flex>
      </Center>
    );
  }

  if (error) {
    return (
      <Box 
        p={6} 
        bg="red.50" 
        color="red.700" 
        borderRadius="md" 
        maxW="container.lg" 
        mx="auto" 
        my={8}
        borderLeft="4px solid" 
        borderColor="red.500"
      >
        <Heading size="md" mb={2}>Error Loading Dashboard</Heading>
        <Text>{error}</Text>
      </Box>
    );
  }

  // Calculate overall fit category
  const getOverallFitCategory = () => {
    const score = compatibilityData.overall_score;
    if (score >= 80) return { label: "Excellent Fit", color: "green" };
    if (score >= 70) return { label: "Good Fit", color: "teal" };
    if (score >= 60) return { label: "Moderate Fit", color: "blue" };
    if (score >= 50) return { label: "Fair Fit", color: "yellow" };
    return { label: "Poor Fit", color: "red" };
  };

  const fitCategory = getOverallFitCategory();

  // Create legacy summary structure for backward compatibility
  // This is no longer needed since we've updated the CompatibilitySummary component
  // but keeping it for safety
  const summaryData = {
    insights: compatibilityData.summary || "No detailed insights available."
  };

  const cardStyle = {
    borderWidth: "1px",
    borderRadius: "lg",
    overflow: "hidden",
    bg: cardBg,
    borderColor: borderColor,
    boxShadow: "md",
    height: CARD_HEIGHT,
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    _hover: { 
      transform: 'translateY(-5px)', 
      boxShadow: 'lg' 
    }
  };

  return (
    <Box 
      minH="calc(100vh - 150px)" 
      py={8} 
      px={4}
      bgGradient={bgGradient}
      transition="background 0.3s ease"
    >
      {/* Breadcrumbs navigation */}
      {teamId && candidateId && (
        <Breadcrumb 
          separator={<Icon as={ChevronRightIcon} color={breadcrumbColor} />} 
          mb={6}
        >
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/" color={breadcrumbColor}>
              Team Selection
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink 
              as={Link} 
              to={`/candidate-selection/${teamId}`} 
              color={breadcrumbColor}
            >
              Candidate Selection
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color={headingColor} fontWeight="semibold">
              Compatibility Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      )}
      
      <SlideFade in={showElements.title} offsetY="-20px">
        <Flex direction="column" align="center" mb={8}>
          <Heading 
            as="h1" 
            size="xl" 
            color={headingColor}
            fontWeight="bold"
            letterSpacing="tight"
            textAlign="center"
          >
            Teamwork Compatibility Dashboard
          </Heading>
          
          <Divider my={4} maxW="200px" borderWidth="2px" borderColor="blue.500" opacity="0.6" />
          
          <Flex align="center" mt={2}>
            <Text fontSize="lg" fontWeight="medium" mr={2}>Overall Compatibility:</Text>
            <Badge 
              colorScheme={fitCategory.color} 
              fontSize="md" 
              px={3} 
              py={1} 
              borderRadius="full"
              animation={animationComplete ? "pulse 2s infinite" : "none"}
              sx={{
                "@keyframes pulse": {
                  "0%": { boxShadow: "0 0 0 0 rgba(66, 153, 225, 0.4)" },
                  "70%": { boxShadow: "0 0 0 10px rgba(66, 153, 225, 0)" },
                  "100%": { boxShadow: "0 0 0 0 rgba(66, 153, 225, 0)" }
                }
              }}
            >
              {fitCategory.label} - {Math.round(compatibilityData.overall_score)}%
            </Badge>
          </Flex>
        </Flex>
      </SlideFade>
      
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
        <SlideFade in={showElements.candidate} offsetY="20px" delay={0.1}>
          <Box {...cardStyle}>
            <CandidateInfo candidate={candidate} />
          </Box>
        </SlideFade>
        
        <SlideFade in={showElements.team} offsetY="20px" delay={0.2}>
          <Box {...cardStyle}>
            <TeamInfo team={team} />
          </Box>
        </SlideFade>
      </SimpleGrid>
      
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
        <SlideFade in={showElements.chart} offsetY="20px" delay={0.3}>
          <Box {...cardStyle}>
            <CompatibilityChart compatibilityData={compatibilityData} />
          </Box>
        </SlideFade>
        
        <SlideFade in={showElements.summary} offsetY="20px" delay={0.4}>
          <Box {...cardStyle}>
            <CompatibilitySummary 
              compatibilityData={compatibilityData} 
              summary={summaryData}
              showMoreInsights={true} 
            />
          </Box>
        </SlideFade>
      </SimpleGrid>
      
      {/* Back to selection buttons */}
      <Flex justifyContent="center" mt={8}>
        <Button
          as={Link}
          to="/"
          colorScheme="gray"
          mr={4}
        >
          Select Different Team
        </Button>
        
        {teamId && (
          <Button
            as={Link}
            to={`/candidate-selection/${teamId}`}
            colorScheme="blue"
          >
            Select Different Candidate
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Dashboard;