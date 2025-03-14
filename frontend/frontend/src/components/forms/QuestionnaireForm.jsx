import React, { useState } from 'react';
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
  Select,
  Stack,
  Radio,
  RadioGroup as ChakraRadioGroup,
  Button,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react';

/**
 * Simplified QuestionnaireForm that doesn't depend on external hooks
 * This version works without requiring useForm and validators
 */
const QuestionnaireForm = ({ isPreviewMode = false }) => {
  const toast = useToast();
  
  // Form state
  const [values, setValues] = useState({
    name: '',
    email: '',
    role: '',
    experience: '',
    workStyle: '',
    communicationStyle: '',
    workEnvironment: '',
    decisionMaking: '',
    feedbackPreference: '',
    stressResponse: '',
    conflictResolution: '',
    adaptability: ''
  });
  
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
  
  // Handle radio change
  const handleRadioChange = (name, value) => {
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
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    
    setTouched(allTouched);
    
    // Validate all fields
    Object.keys(values).forEach(name => {
      const error = validateField(name, values[name]);
      if (error) {
        formErrors[name] = error;
        isValid = false;
      }
    });
    
    setErrors(formErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isPreviewMode) {
      toast({
        title: 'Preview Mode',
        description: 'Form submission is disabled in preview mode',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const isValid = validateForm();
    
    if (isValid) {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success toast
        toast({
          title: 'Questionnaire submitted',
          description: 'Thank you for completing the questionnaire!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        
        // Reset form
        setValues({
          name: '',
          email: '',
          role: '',
          experience: '',
          workStyle: '',
          communicationStyle: '',
          workEnvironment: '',
          decisionMaking: '',
          feedbackPreference: '',
          stressResponse: '',
          conflictResolution: '',
          adaptability: ''
        });
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
      experience: '',
      workStyle: '',
      communicationStyle: '',
      workEnvironment: '',
      decisionMaking: '',
      feedbackPreference: '',
      stressResponse: '',
      conflictResolution: '',
      adaptability: ''
    });
    setTouched({});
    setErrors({});
  };

  // Custom Radio Group Component
  const CustomRadioGroup = ({ id, name, label, options, value, helperText, isRequired, isInvalid, error }) => (
    <FormControl id={id} isRequired={isRequired} isInvalid={isInvalid} mb={6}>
      <FormLabel>{label}</FormLabel>
      <ChakraRadioGroup name={name} value={value} onChange={(val) => handleRadioChange(name, val)}>
        <Stack direction="column" spacing={3}>
          {options.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Stack>
      </ChakraRadioGroup>
      
      {helperText && !isInvalid && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
      
      {isInvalid && (
        <FormErrorMessage>{error}</FormErrorMessage>
      )}
    </FormControl>
  );

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
              <Select
                name="experience"
                value={values.experience}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Select years of experience"
              >
                {experienceOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </Select>
              {touched.experience && errors.experience && (
                <FormErrorMessage>{errors.experience}</FormErrorMessage>
              )}
            </FormControl>
          </VStack>
        </Box>
        
        <Divider />
        
        {/* Work Style Section */}
        <Box>
          <Heading as="h3" size="md" mb={4}>Work Style Assessment</Heading>
          <Text mb={4} color="gray.600">
            The following questions help us understand your work preferences and style.
            There are no right or wrong answers - please choose the option that best
            represents your natural approach.
          </Text>
          
          <VStack spacing={6} align="stretch">
            {/* Work Style */}
            <CustomRadioGroup
              id="workStyle"
              name="workStyle"
              label="1. How do you prefer to approach your work tasks?"
              value={values.workStyle}
              isRequired
              isInvalid={touched.workStyle && errors.workStyle}
              error={errors.workStyle}
              options={[
                { value: 'structured', label: 'I prefer a structured approach with clear guidelines and processes' },
                { value: 'flexible', label: 'I prefer flexibility to determine my own approach to tasks' },
                { value: 'mixed', label: 'I adapt between structured and flexible approaches depending on the task' }
              ]}
            />
            
            {/* Communication Style */}
            <CustomRadioGroup
              id="communicationStyle"
              name="communicationStyle"
              label="2. How would you describe your communication style?"
              value={values.communicationStyle}
              isRequired
              isInvalid={touched.communicationStyle && errors.communicationStyle}
              error={errors.communicationStyle}
              options={[
                { value: 'direct', label: 'Direct and straightforward - I get to the point quickly' },
                { value: 'detailed', label: 'Detailed and thorough - I provide comprehensive information' },
                { value: 'diplomatic', label: 'Diplomatic and tactful - I focus on how my message is received' }
              ]}
            />
            
            {/* Work Environment */}
            <CustomRadioGroup
              id="workEnvironment"
              name="workEnvironment"
              label="3. What type of work environment do you prefer?"
              value={values.workEnvironment}
              isRequired
              isInvalid={touched.workEnvironment && errors.workEnvironment}
              error={errors.workEnvironment}
              options={[
                { value: 'collaborative', label: 'Highly collaborative with frequent team interaction' },
                { value: 'independent', label: 'Primarily independent work with occasional collaboration' },
                { value: 'balanced', label: 'A balance between collaboration and independent work' }
              ]}
            />
            
            {/* Decision Making */}
            <CustomRadioGroup
              id="decisionMaking"
              name="decisionMaking"
              label="4. How do you typically approach decision making?"
              value={values.decisionMaking}
              isRequired
              isInvalid={touched.decisionMaking && errors.decisionMaking}
              error={errors.decisionMaking}
              options={[
                { value: 'analytical', label: 'Analytical - I carefully weigh all options based on data' },
                { value: 'intuitive', label: 'Intuitive - I often trust my gut feeling and experience' },
                { value: 'collaborative', label: 'Collaborative - I prefer to consult with others before deciding' }
              ]}
            />
            
            {/* Feedback Preference */}
            <CustomRadioGroup
              id="feedbackPreference"
              name="feedbackPreference"
              label="5. How do you prefer to receive feedback?"
              value={values.feedbackPreference}
              isRequired
              isInvalid={touched.feedbackPreference && errors.feedbackPreference}
              error={errors.feedbackPreference}
              options={[
                { value: 'direct', label: 'Direct and straightforward, even if critical' },
                { value: 'positive', label: 'Focusing first on positives before addressing areas for improvement' },
                { value: 'private', label: 'Privately and with specific suggestions for improvement' }
              ]}
            />
            
            {/* Stress Response */}
            <CustomRadioGroup
              id="stressResponse"
              name="stressResponse"
              label="6. How do you typically respond to high-pressure situations?"
              value={values.stressResponse}
              isRequired
              isInvalid={touched.stressResponse && errors.stressResponse}
              error={errors.stressResponse}
              options={[
                { value: 'focus', label: 'I become more focused and driven under pressure' },
                { value: 'plan', label: 'I slow down and carefully plan to avoid mistakes' },
                { value: 'collaborate', label: 'I reach out to others for support and collaboration' }
              ]}
            />
            
            {/* Conflict Resolution */}
            <CustomRadioGroup
              id="conflictResolution"
              name="conflictResolution"
              label="7. How do you typically handle conflicts at work?"
              value={values.conflictResolution}
              isRequired
              isInvalid={touched.conflictResolution && errors.conflictResolution}
              error={errors.conflictResolution}
              options={[
                { value: 'address', label: 'I address conflicts directly as soon as they arise' },
                { value: 'mediate', label: 'I prefer to find compromise and middle ground' },
                { value: 'avoid', label: 'I tend to avoid direct confrontation and find alternative solutions' }
              ]}
            />
            
            {/* Adaptability */}
            <CustomRadioGroup
              id="adaptability"
              name="adaptability"
              label="8. How do you respond to changes in plans or processes?"
              value={values.adaptability}
              isRequired
              isInvalid={touched.adaptability && errors.adaptability}
              error={errors.adaptability}
              options={[
                { value: 'embrace', label: 'I embrace change and quickly adapt' },
                { value: 'cautious', label: 'I\'m cautious about change and need time to adjust' },
                { value: 'evaluate', label: 'I evaluate the purpose and benefits before accepting changes' }
              ]}
            />
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
            {isPreviewMode ? 'Submit (Preview Only)' : 'Submit Questionnaire'}
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default QuestionnaireForm;