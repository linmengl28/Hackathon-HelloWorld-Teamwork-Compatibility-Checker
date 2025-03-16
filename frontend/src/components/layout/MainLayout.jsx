import React from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <Flex direction="column" minHeight="100vh">
      <Header />
      <Box flex="1" bg="gray.50" py={8}>
        <Container maxW="container.xl">
          {children}
        </Container>
      </Box>
      <Footer />
    </Flex>
  );
};

export default MainLayout;