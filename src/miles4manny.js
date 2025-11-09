// App.jsx
import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Link,
  Container,
  Text,
} from '@chakra-ui/react';

import NavBar from "./components/navbar";

const Miles4Manny = () => {
  return (
    <Box minH="100vh" bg="gray.50">
      <NavBar />

      <Container maxW="6xl" py={12}>
        <Heading
          as="h1"
          size="2xl"
          textAlign="center"
          mb={6}
          color="gray.700"
        >
          Miles 4 Manny
        </Heading>
        <Text textAlign="center" color="gray.500" fontSize="lg">
          Celebrating a life full of motion, community, and endurance.
        </Text>

        {/* Map or content goes here */}
        <Box
          mt={12}
          height="500px"
          bg="white"
          borderRadius="lg"
          boxShadow="md"
        >
          {/* Example placeholder for your map */}
          <Text textAlign="center" color="gray.400" pt={48}>
            Map or visualization will appear here
          </Text>
        </Box>
      </Container>
    </Box>
  );
}

export default Miles4Manny;

