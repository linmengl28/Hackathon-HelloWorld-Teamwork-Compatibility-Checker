import React from 'react';
import { Box, Heading, Text, Progress, HStack, VStack, Badge } from '@chakra-ui/react';

const CompatibilitySummary = ({ compatibilityData, summary }) => {
  if (!compatibilityData) {
    return <Box p={5} borderWidth="1px" borderRadius="lg">Loading compatibility data...</Box>;
  }

  const { overall_score, strengths, challenges } = compatibilityData;
  
  // Determine score color based on compatibility percentage
  const getScoreColor = (score) => {
    if (score >= 80) return "green";
    if (score >= 60) return "blue";
    if (score >= 40) return "yellow";
    return "red";
  };

  return (
    <Box p={5} borderWidth="1px" borderRadius="lg" bg="white" shadow="md">
      <VStack align="start" spacing={4}>
        <Heading size="md">Compatibility Summary</Heading>
        
        <Box width="100%">
          <HStack justify="space-between">
            <Text fontWeight="bold">Overall Score:</Text>
            <Text fontWeight="bold" color={getScoreColor(overall_score)}>
              {Math.round(overall_score)}%
            </Text>
          </HStack>
          <Progress 
            value={overall_score} 
            colorScheme={getScoreColor(overall_score)} 
            size="lg" 
            borderRadius="md" 
            mt={2} 
          />
        </Box>
        
        <Box width="100%">
          <Text fontWeight="bold" mb={2}>Key Strengths:</Text>
          <Box>
            {strengths && strengths.length > 0 ? (
              strengths.map((strength, index) => (
                <Badge key={index} colorScheme="green" mr={2} mb={2} px={2} py={1}>
                  {strength}
                </Badge>
              ))
            ) : (
              <Text fontSize="sm">No significant strengths identified</Text>
            )}
          </Box>
        </Box>
        
        <Box width="100%">
          <Text fontWeight="bold" mb={2}>Potential Challenges:</Text>
          <Box>
            {challenges && challenges.length > 0 ? (
              challenges.map((challenge, index) => (
                <Badge key={index} colorScheme="red" mr={2} mb={2} px={2} py={1}>
                  {challenge}
                </Badge>
              ))
            ) : (
              <Text fontSize="sm">No significant challenges identified</Text>
            )}
          </Box>
        </Box>
        
        {summary && (
          <Box width="100%" mt={2}>
            <Text fontWeight="bold" mb={2}>AI Insights:</Text>
            <Box p={3} bg="gray.50" borderRadius="md">
              <Text>{summary.insights}</Text>
            </Box>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default CompatibilitySummary;