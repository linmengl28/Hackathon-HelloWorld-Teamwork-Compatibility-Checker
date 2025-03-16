import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Heading,
  Divider,
  Text,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Radio,
  RadioGroup as ChakraRadioGroup,
  Button,
  FormHelperText,
  FormErrorMessage,
  Spinner,
  Center,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

/**
 * Dynamic Questionnaire Form that loads questions from the backend
 */
const DynamicQuestionnaireForm = () => {
  const toast = useToast();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state
  const [values, setValues] = useState({
    name: '',
    email: '',
    role: '',
    experience: '',
  });
  
  // Answers state for questions
  const [answers, setAnswers] = useState({});
  
  // Form errors state
  const [errors, setErrors] = useState({});
  
  // Touched fields state
  const [touched, setTouched] = useState({});
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Options for select fields
  const experienceOptions = [
    { value: 'less-than-1', label: 'Less than 1 year' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5-10', label: '5-10 years' },
    { value: 'more-than-10', label: 'More than 10 years' }
  ];

  // Fetch questionnaire from backend
  useEffect(() => {
    // Import mock data from mockData.js
    import('../../mockData').then(({ mockQuestionnaire }) => {
      // Simulate API call
      setTimeout(() => {
        setQuestionnaire(mockQuestionnaire);
        setLoading(false);
      }, 1000);
    }).catch(err => {
      console.error('Error loading questionnaire data:', err);
      setError('Failed to load questionnaire. Please try again later.');
      setLoading(false);
    });

    // In a real implementation, you would fetch from the backend:
    // const fetchQuestionnaire = async () => {
    //   try {
    //     const response = await fetch('http://localhost:8000/api/v1/questionnaire');
    //     const data = await response.json();
    //     setQuestionnaire(data);
    //   } catch (err) {
    //     console.error('Error fetching questionnaire:', err);
    //     setError('Failed to load questionnaire. Please try again later.');
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchQuestionnaire();
  }, []);
  
  // Basic validation
  const validateField = (name, value) => {
    if (!value) {
      return 'This field is required';
    }
    
    if (name === 'email' && value) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(value)) {
        return 'Invalid email address';
      }
    }
    
    return null;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setValues({
      ...values,
      [name]: value
    });
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({
        ...errors,
        [name]: error
      });
    }
  };
  
  // Handle radio change for questions
  const handleQuestionChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
    
    const fieldName = `question_${questionId}`;
    if (touched[fieldName]) {
      setErrors({
        ...errors,
        [fieldName]: !value ? 'Please select an answer' : null
      });
    }
  };

  // Handle blur event (for validation)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    setTouched({
      ...touched,
      [name]: true
    });
    
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error
    });
  };

  // Validate all fields
  const validateForm = () => {
    const formErrors = {};
    let isValid = true;
    
    // Mark all fields as touched
    const allTouched = {
      name: true,
      email: true,
      role: true,
      experience: true
    };
    
    // Mark all questions as touched
    if (questionnaire) {
      questionnaire.questions.forEach(q => {
        allTouched[`question_${q.id}`] = true;
      });
    }
    
    setTouched(allTouched);
    
    // Validate personal info fields
    Object.keys(values).forEach(name => {
      const error = validateField(name, values[name]);
      if (error) {
        formErrors[name] = error;
        isValid = false;
      }
    });
    
    // Validate question answers
    if (questionnaire) {
      questionnaire.questions.forEach(q => {
        const fieldName = `question_${q.id}`;
        if (!answers[q.id]) {
          formErrors[fieldName] = 'Please select an answer';
          isValid = false;
        }
      });
    }
    
    setErrors(formErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const isValid = validateForm();
    
    if (isValid) {
      try {
        // Prepare submission data
        const submissionData = {
          candidate: {
            name: values.name,
            email: values.email,
            role: values.role,
            experience: values.experience
          },
          answers: answers
        };
        
        // Log data that would be sent to backend
        console.log('Submission data:', submissionData);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success toast
        toast({
          title: 'Questionnaire submitted successfully',
          description: 'Thank you for completing the questionnaire! The team will review your compatibility.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        
        // Reset form
        setValues({
          name: '',
          email: '',
          role: '',
          experience: ''
        });
        setAnswers({});
        setTouched({});
        setErrors({});
      } catch (error) {
        console.error('Error submitting form:', error);
        toast({
          title: 'Submission error',
          description: 'There was an error submitting the form. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
    
    setIsSubmitting(false);
  };

  // Handle form reset
  const handleReset = () => {
    setValues({
      name: '',
      email: '',
      role: '',
      experience: ''
    });
    setAnswers({});
    setTouched({});
    setErrors({});
  };

  if (loading) {
    return (
      <Center h="300px">
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" thickness="4px" />
          <Text>Loading questionnaire...</Text>
        </VStack>
      </Center>
    );
  }

  if (error) {
    return (
      <Alert status="error" borderRadius="md">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%">
      <VStack spacing={6} align="stretch">
        {/* Personal Information Section */}
        <Box>
          <Heading as="h3" size="md" mb={4}>Personal Information</Heading>
          <VStack spacing={4} align="stretch">
            <FormControl id="name" isRequired isInvalid={touched.name && errors.name}>
              <FormLabel>Full Name</FormLabel>
              <Input
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your full name"
              />
              {touched.name && errors.name && (
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              )}
            </FormControl>
            
            <FormControl id="email" isRequired isInvalid={touched.email && errors.email}>
              <FormLabel>Email Address</FormLabel>
              <Input
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your email address"
              />
              {touched.email && errors.email && (
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              )}
            </FormControl>
            
            <FormControl id="role" isRequired isInvalid={touched.role && errors.role}>
              <FormLabel>Current Role/Position</FormLabel>
              <Input
                name="role"
                value={values.role}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your current role"
              />
              {touched.role && errors.role && (
                <FormErrorMessage>{errors.role}</FormErrorMessage>
              )}
            </FormControl>
            
            <FormControl id="experience" isRequired isInvalid={touched.experience && errors.experience}>
              <FormLabel>Years of Experience</FormLabel>
              <ChakraRadioGroup
                name="experience"
                value={values.experience}
                onChange={(val) => {
                  handleChange({ target: { name: 'experience', value: val } });
                }}
              >
                <Stack direction="column" spacing={3}>
                  {experienceOptions.map((option) => (
                    <Radio key={option.value} value={option.value}>
                      {option.label}
                    </Radio>
                  ))}
                </Stack>
              </ChakraRadioGroup>
              {touched.experience && errors.experience && (
                <FormErrorMessage>{errors.experience}</FormErrorMessage>
              )}
            </FormControl>
          </VStack>
        </Box>
        
        <Divider />
        
        {/* Questionnaire Section */}
        <Box>
          <Heading as="h3" size="md" mb={4}>Work Style Assessment</Heading>
          <Text mb={4} color="gray.600">
            {questionnaire.description}
          </Text>
          
          <VStack spacing={6} align="stretch">
            {questionnaire.questions.map((question) => (
              <FormControl 
                key={question.id} 
                id={`question_${question.id}`}
                isRequired 
                isInvalid={touched[`question_${question.id}`] && errors[`question_${question.id}`]}
                mb={6}
              >
                <FormLabel fontWeight="medium">
                  {question.id}. {question.text}
                </FormLabel>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  Category: {question.category.replace('_', ' ')}
                </Text>
                <ChakraRadioGroup
                  name={`question_${question.id}`}
                  value={answers[question.id] || ''}
                  onChange={(val) => handleQuestionChange(question.id, val)}
                >
                  <Stack direction="column" spacing={3}>
                    {question.options.map((option, idx) => (
                      <Radio key={idx} value={option}>
                        {option}
                      </Radio>
                    ))}
                  </Stack>
                </ChakraRadioGroup>
                
                {touched[`question_${question.id}`] && errors[`question_${question.id}`] && (
                  <FormErrorMessage>{errors[`question_${question.id}`]}</FormErrorMessage>
                )}
              </FormControl>
            ))}
          </VStack>
        </Box>
        
        <Box pt={4} display="flex" justifyContent="space-between">
          <Button
            variant="outline"
            onClick={handleReset}
            isDisabled={isSubmitting}
          >
            Reset
          </Button>
          
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isSubmitting}
            loadingText="Submitting"
          >
            Submit Questionnaire
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default DynamicQuestionnaireForm;