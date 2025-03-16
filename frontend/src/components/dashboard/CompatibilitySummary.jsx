import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Progress, 
  HStack, 
  VStack, 
  Badge, 
  Flex,
  Icon,
  Tooltip,
  useColorModeValue,
  Spacer,
  StackDivider
} from '@chakra-ui/react';

// Simple icons as React components
const ChartIcon = (props) => (
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
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </svg>
);

const ThumbsUpIcon = (props) => (
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
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
  </svg>
);

const ThumbsDownIcon = (props) => (
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
    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
  </svg>
);

const BrainIcon = (props) => (
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
    <path d="M9.5 2h5M4.5 8H2v4h2.5M4.5 16H2v4h2.5M19.5 8H22v4h-2.5M19.5 16H22v4h-2.5M12 22v-4.5"></path>
    <path d="M8 22h8"></path>
    <path d="M17.5 8a5.5 5.5 0 1 0 0 8 5.5 5.5 0 1 0 0-8Z"></path>
    <path d="M11.5 10.5a5.5 5.5 0 1 0 0 3 5.5 5.5 0 1 0 0-3Z"></path>
    <path d="M5.5, 8a5.5 5.5 0 1 1 0 8 5.5 5.5 0 1 1 0-8Z"></path>
  </svg>
);

const CompatibilitySummary = ({ compatibilityData, summary, showMoreInsights = false }) => {
  const [progressValue, setProgressValue] = useState(0);
  const [fadeInStrengths, setFadeInStrengths] = useState(false);
  const [fadeInChallenges, setFadeInChallenges] = useState(false);
  const [fadeInInsights, setFadeInInsights] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  
  // Color mode values
  const titleColor = useColorModeValue('blue.600', 'blue.300');
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  const valueColor = useColorModeValue('gray.800', 'white');
  const iconColor = useColorModeValue('blue.500', 'blue.300');
  const insightsBg = useColorModeValue('blue.50', 'blue.900');
  const insightsColor = useColorModeValue('gray.700', 'gray.100');
  const scrollbarTrack = useColorModeValue('gray.100', 'gray.700');
  const scrollbarThumb = useColorModeValue('blue.400', 'blue.600');
  
  // 滚动条指示器样式
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
  
  useEffect(() => {
    if (compatibilityData) {
      // Animate progress value from 0 to actual value
      const timer = setTimeout(() => {
        setProgressValue(compatibilityData.overall_score);
      }, 500);
      
      // Animate sections with staggered timing
      setTimeout(() => setFadeInStrengths(true), 800);
      setTimeout(() => setFadeInChallenges(true), 1100);
      setTimeout(() => setFadeInInsights(true), 1400);
      
      // Hide scroll indicator after 5 seconds
      setTimeout(() => setShowScrollIndicator(false), 5000);
      
      return () => clearTimeout(timer);
    }
  }, [compatibilityData]);
  
  if (!compatibilityData) {
    return (
      <Box p={5} h="100%">
        <Heading size="md" mb={4} color={titleColor}>Compatibility Summary</Heading>
        <Flex align="center" justify="center" h="calc(100% - 60px)">
          <Text color={labelColor}>Loading compatibility data...</Text>
        </Flex>
      </Box>
    );
  }
  
  const { overall_score, strengths, challenges } = compatibilityData;
  
  // Determine score color based on compatibility percentage
  const getScoreColor = (score) => {
    if (score >= 80) return "green";
    if (score >= 60) return "blue";
    if (score >= 40) return "yellow";
    return "red";
  };
  
  const scoreColor = getScoreColor(overall_score);

  return (
    <Box p={5} h="100%" display="flex" flexDirection="column" position="relative">
      <Heading size="md" mb={4} color={titleColor} display="flex" alignItems="center">
        <Icon as={ChartIcon} mr={2} color={iconColor} />
        Compatibility Summary
      </Heading>
      
      {/* 滚动条指示器 */}
      {showScrollIndicator && (
        <Box
          sx={scrollIndicatorStyles}
          animation="fadeOut 1s forwards 5s"
          _hover={{ opacity: 0 }}
          transition="opacity 0.3s ease"
        />
      )}
      
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
          <Box width="100%">
            <HStack justify="space-between" mb={1}>
              <Text fontWeight="bold" color={labelColor}>Overall Score:</Text>
              <Flex align="center">
                <Text
                  fontWeight="bold"
                  fontSize="xl"
                  color={`${scoreColor}.500`}
                  transition="color 0.3s ease"
                >
                  {Math.round(progressValue)}%
                </Text>
                <Badge
                  ml={2}
                  colorScheme={scoreColor}
                  borderRadius="full"
                  px={2}
                  fontSize="xs"
                >
                  {overall_score >= 80 ? "EXCELLENT" : 
                   overall_score >= 70 ? "GOOD" :
                   overall_score >= 60 ? "MODERATE" :
                   overall_score >= 50 ? "FAIR" : "POOR"}
                </Badge>
              </Flex>
            </HStack>
            
            <Progress
              value={progressValue}
              colorScheme={scoreColor}
              size="lg"
              borderRadius="md"
              hasStripe
              isAnimated
              sx={{
                "& > div": {
                  transition: "width 1s ease-in-out"
                }
              }}
            />
          </Box>
          
          <Box 
            width="100%" 
            opacity={fadeInStrengths ? 1 : 0} 
            transform={fadeInStrengths ? "translateY(0)" : "translateY(10px)"}
            transition="opacity 0.5s ease, transform 0.5s ease"
          >
            <Flex align="center" mb={2}>
              <Icon as={ThumbsUpIcon} color="green.500" mr={2} />
              <Text fontWeight="bold" color={labelColor}>Key Strengths:</Text>
            </Flex>
            
            <Box>
              {strengths && strengths.length > 0 ? (
                <Flex flexWrap="wrap">
                  {strengths.map((strength, index) => (
                    <Tooltip 
                      key={index}
                      label={`This is a significant area of compatibility with the team`}
                      placement="top"
                      hasArrow
                    >
                      <Badge 
                        colorScheme="green" 
                        mr={2} 
                        mb={2} 
                        px={3}
                        py={1}
                        borderRadius="full"
                        textTransform="capitalize"
                        fontWeight="medium"
                        boxShadow="sm"
                        _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                        transition="all 0.2s ease"
                        cursor="pointer"
                      >
                        {strength}
                      </Badge>
                    </Tooltip>
                  ))}
                </Flex>
              ) : (
                <Text fontSize="sm" color={labelColor}>No significant strengths identified</Text>
              )}
            </Box>
          </Box>
          
          <Box 
            width="100%"
            opacity={fadeInChallenges ? 1 : 0} 
            transform={fadeInChallenges ? "translateY(0)" : "translateY(10px)"}
            transition="opacity 0.5s ease, transform 0.5s ease"
          >
            <Flex align="center" mb={2}>
              <Icon as={ThumbsDownIcon} color="red.500" mr={2} />
              <Text fontWeight="bold" color={labelColor}>Potential Challenges:</Text>
            </Flex>
            
            <Box>
              {challenges && challenges.length > 0 ? (
                <Flex flexWrap="wrap">
                  {challenges.map((challenge, index) => (
                    <Tooltip 
                      key={index}
                      label={`This may require attention or adaptation`}
                      placement="top"
                      hasArrow
                    >
                      <Badge 
                        colorScheme="red" 
                        mr={2} 
                        mb={2} 
                        px={3}
                        py={1}
                        borderRadius="full"
                        textTransform="capitalize"
                        fontWeight="medium"
                        boxShadow="sm"
                        _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                        transition="all 0.2s ease"
                        cursor="pointer"
                      >
                        {challenge}
                      </Badge>
                    </Tooltip>
                  ))}
                </Flex>
              ) : (
                <Text fontSize="sm" color={labelColor}>No significant challenges identified</Text>
              )}
            </Box>
          </Box>
          
          {summary && (
            <Box 
              width="100%" 
              opacity={fadeInInsights ? 1 : 0} 
              transform={fadeInInsights ? "translateY(0)" : "translateY(10px)"}
              transition="opacity 0.5s ease, transform 0.5s ease"
            >
              <Flex align="center" mb={2}>
                <Icon as={BrainIcon} color={iconColor} mr={2} />
                <Text fontWeight="bold" color={labelColor}>AI Insights:</Text>
              </Flex>
              
              <Box 
                p={4} 
                bg={insightsBg} 
                borderRadius="md"
                borderLeft="4px solid"
                borderColor="blue.400"
                position="relative"
                _after={{
                  content: '""',
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  height: '1px',
                  background: 'linear-gradient(to right, blue.400, transparent)',
                }}
              >
                <Text color={insightsColor} fontSize="sm" lineHeight="1.6">
                  {summary.insights}
                </Text>
              </Box>
            </Box>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default CompatibilitySummary;