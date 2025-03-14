import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Container,
  Card,
  CardBody,
  VStack,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useBreakpointValue,
  Badge
} from '@chakra-ui/react';
import QuestionnaireForm from '../components/forms/QuestionnaireForm';

/**
 * Questionnaire page component - Preview mode for HR
 * Displays the teamwork compatibility assessment as seen by candidates
 */
const Questionnaire = () => {
  const [searchParams] = useSearchParams();
  const isPreviewMode = searchParams.get('preview') === 'true';
  const navigate = useNavigate();
  const containerWidth = useBreakpointValue({ base: '100%', md: '90%', lg: '80%' });

  // Set default title for document
  useEffect(() => {
    document.title = 'Candidate Assessment Preview';
  }, []);

  return (
    <Box>
      <Container maxW={containerWidth} py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size="xl" mb={4}>
              Candidate Assessment Preview
              <Badge ml={3} colorScheme="blue" fontSize="md" verticalAlign="middle">
                HR View
              </Badge>
            </Heading>
            
            <Text fontSize="lg" color="gray.600">
              This is how candidates see the teamwork compatibility questionnaire
            </Text>
          </Box>

          <Alert status="info" borderRadius="md">
            <AlertIcon />
            <Box>
              <AlertTitle>HR Preview Mode</AlertTitle>
              <AlertDescription>
                You are viewing the assessment as it appears to candidates. This is a preview only - no data will be submitted.
              </AlertDescription>
            </Box>
          </Alert>

          <Card variant="outline" shadow="md">
            <CardBody p={{ base: 4, md: 6 }}>
              <VStack spacing={6} align="stretch">
                <Box>
                  <Heading as="h2" size="lg" mb={2}>
                    Welcome to the Compatibility Questionnaire
                  </Heading>
                  
                  <Text color="gray.600">
                    This questionnaire will help us understand your work style, communication preferences,
                    and teamwork approach. Your responses will be analyzed to determine compatibility with
                    existing teams. Please answer each question honestly - there are no right or wrong answers.
                  </Text>
                </Box>

                <Divider />

                <QuestionnaireForm isPreviewMode={true} />
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
};

export default Questionnaire;