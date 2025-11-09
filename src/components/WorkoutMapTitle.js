import React from "react";
import { Heading, Text } from "@chakra-ui/react";

const WorkoutMapTitle = () => (
  <>
    <Heading as="h2" textAlign="center" mb={6} color="gray.700">
      Manny's Workout Map
    </Heading>
    <Text fontSize="md" color="gray.600" textAlign="left" mt={2} px={10} py={5}>
      The map below shows all the workouts Manny shared with the world.
    </Text>
  </>
);

export default WorkoutMapTitle;
