import React from "react";
import { Box, Container, Heading, Text } from "@chakra-ui/react";

import NavBar from "./components/navbar";
import { useMiles4MannyWorkouts } from "./providers/Miles4MannyWorkoutsProvider";
import WorkoutMap from "./components/WorkoutMap";
import GoFundMe from "./components/GoFundMe";

const DEFAULT_CENTER = [47.298676735285866, -122.50927352084933];

const Miles4Manny = () => {
  const { miles4mannyWorkouts, isMiles4mannyWorkoutFetching } =
    useMiles4MannyWorkouts();

  const workoutTypes = React.useMemo(() => {
    const types = new Set();
    miles4mannyWorkouts.forEach((w) => {
      if (w.type) types.add(w.type);
    });
    return Array.from(types);
  }, [miles4mannyWorkouts]);

  const [selectedTypes, setSelectedTypes] = React.useState([]);

  React.useEffect(() => {
    if (workoutTypes.length > 0 && selectedTypes.length === 0) {
      setSelectedTypes(workoutTypes);
    }
  }, [workoutTypes, selectedTypes.length]);

  const filteredWorkouts = React.useMemo(() => {
    if (!selectedTypes || selectedTypes.length === 0)
      return miles4mannyWorkouts;
    return miles4mannyWorkouts.filter((w) => selectedTypes.includes(w.type));
  }, [miles4mannyWorkouts, selectedTypes]);

  const mapCenter = DEFAULT_CENTER;

  return (
    <Box minH="100vh" bg="gray.50">
      <NavBar />
      <Container maxW="6xl" py={12}>
        <Heading as="h1" size="2xl" textAlign="center" mb={6} color="gray.700">
          Miles 4 Manny
        </Heading>
        <Text textAlign="center" color="gray.500" fontSize="lg">
          Celebrating a life full of motion, community, and endurance.
        </Text>
        <GoFundMe />
        <Box mt={12} bg="white" borderRadius="lg" boxShadow="md" p={0}>
          <WorkoutMap
            center={mapCenter}
            workouts={filteredWorkouts}
            isMiles4mannyWorkoutFetching={isMiles4mannyWorkoutFetching}
            mapHeight={500}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Miles4Manny;
