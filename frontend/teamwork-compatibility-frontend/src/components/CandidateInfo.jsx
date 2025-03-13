import React from 'react';
import { Box, Heading, Text, VStack, Badge } from '@chakra-ui/react';

const CandidateInfo = ({ candidate }) => {
  if (!candidate) {
    return <Box p={5} borderWidth="1px" borderRadius="lg">Loading candidate data...</Box>;
  }

  return (
    <Box p={5} borderWidth="1px" borderRadius="lg" bg="white" shadow="md">
      <VStack align="start" spacing={3}>
        <Heading size="md">Candidate Information</Heading>
        <Box>
          <Text fontWeight="bold">Name:</Text>
          <Text>{candidate.name}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Position:</Text>
          <Text>{candidate.position}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Email:</Text>
          <Text>{candidate.email}</Text>
        </Box>
        {candidate.skills && (
          <Box>
            <Text fontWeight="bold">Skills:</Text>
            <Box mt={2}>
              {candidate.skills.map((skill, index) => (
                <Badge key={index} mr={2} mb={2} colorScheme="blue">
                  {skill}
                </Badge>
              ))}
            </Box>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default CandidateInfo;