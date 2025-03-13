import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const TeamInfo = ({ team }) => {
  if (!team) {
    return <Box p={5} borderWidth="1px" borderRadius="lg">Loading team data...</Box>;
  }

  return (
    <Box p={5} borderWidth="1px" borderRadius="lg" bg="white" shadow="md">
      <VStack align="start" spacing={3}>
        <Heading size="md">Team Information</Heading>
        <Box>
          <Text fontWeight="bold">Name:</Text>
          <Text>{team.name}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Department:</Text>
          <Text>{team.department}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Team Size:</Text>
          <Text>{team.members ? team.members.length : 0} members</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default TeamInfo;