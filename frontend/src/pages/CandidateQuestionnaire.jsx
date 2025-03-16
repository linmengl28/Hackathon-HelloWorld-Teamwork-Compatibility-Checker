import React, { useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Container,
  Card,
  CardBody,
  VStack,
  useBreakpointValue,
  Image,
  Flex,
} from '@chakra-ui/react';
import DynamicQuestionnaireForm from '../components/forms/DynamicQuestionnaireForm';

/**
 * Candidate questionnaire page component
 * This is the independent page for candidates to fill out the questionnaire
 */
const CandidateQuestionnaire = () => {
  const containerWidth = useBreakpointValue({ base: '100%', md: '90%', lg: '80%' });

  // Set title for document
  useEffect(() => {
    document.title = 'Team Compatibility Assessment';
  }, []);

  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW={containerWidth} py={8}>
        <VStack spacing={8} align="stretch">
          <Flex 
            justify="center" 
            direction="column" 
            align="center" 
            textAlign="center"
            bg="white"
            p={6}
            borderRadius="md"
            boxShadow="sm"
          >
            <Heading as="h1" size="xl" mb={4} color="blue.600">
              Team Compatibility Assessment
            </Heading>
            
            <Text fontSize="lg" color="gray.600" maxW="800px">
              Thank you for your interest in joining our team! Please complete this questionnaire to help us understand your 
              work style and preferences. Your responses will be analyzed to assess team compatibility.
            </Text>
          </Flex>

          <Card variant="outline" shadow="md">
            <CardBody p={{ base: 4, md: 6 }}>
              <VStack spacing={6} align="stretch">
                <Box>
                  <Heading as="h2" size="lg" mb={2} color="blue.600">
                    Compatibility Questionnaire
                  </Heading>
                  
                  <Text color="gray.600" mb={4}>
                    This questionnaire will help us understand your work style, communication preferences,
                    and teamwork approach. Please answer each question honestly - there are no right or wrong answers.
                    Your answers will be kept confidential and used only for team fit analysis.
                  </Text>
                </Box>

                <DynamicQuestionnaireForm />
              </VStack>
            </CardBody>
          </Card>
          
          {/* Footer */}
          <Box textAlign="center" p={4}>
            <Text fontSize="sm" color="gray.500">
              © {new Date().getFullYear()} Teamwork Compatibility Checker
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default CandidateQuestionnaire;