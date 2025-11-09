// App.jsx
import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";

import NavBar from "./components/navbar";
import { useMiles4MannyWorkouts } from "./providers/Miles4MannyWorkoutsProvider";
import WorkoutMap from "./components/WorkoutMap";

const DEFAULT_CENTER = [47.298676735285866, -122.50927352084933];

const Miles4Manny = () => {
  const { miles4mannyWorkouts, isMiles4mannyWorkoutFetching } =
    useMiles4MannyWorkouts();

  // Collect all unique workout types
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

        {/* --- GoFundMe Callout with Widget --- */}
        <Box
          mt={10}
          mb={8}
          p={6}
          bg="yellow.50"
          borderRadius="md"
          boxShadow="sm"
        >
          <VStack align="stretch" spacing={4}>
            <Heading as="h2" textAlign="center" mb={6} color="gray.700">
              Help honor Jemanual’s legacy
            </Heading>
            <Text
              fontSize="md"
              color="gray.600"
              textAlign="left"
              mt={2}
              px={10}
              py={5}
            >
              We’re raising funds for a memorial bench in Tacoma to celebrate
              Jemanual Concepcion—an inspiring runner, cyclist, and friend who
              always made sure no one was left behind. The bench will be a place
              to reflect, rest, and remember the joy and community he shared
              with everyone.
            </Text>

            {/* Embedded GoFundMe Widget */}
            <Box
              mt={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
              overflow="hidden"
              lineHeight="0"
            >
              <iframe
                title="GoFundMe - Support a Memorial Bench for Jemanual Concepcion"
                src="https://www.gofundme.com/f/support-a-memorial-bench-for-jemanual-concepcion/widget/large"
                style={{
                  width: "100%",
                  maxWidth: "480px",
                  height: "600px",
                  border: "none",
                  display: "block",
                  overflow: "hidden",
                }}
              />
            </Box>

            <Box textAlign="center" pt={2}>
              <Button
                as="a"
                href="https://www.gofundme.com/f/support-a-memorial-bench-for-jemanual-concepcion"
                target="_blank"
                rel="noopener noreferrer"
                colorScheme="teal"
                size="md"
              >
                Visit GoFundMe Page
              </Button>
            </Box>
          </VStack>
        </Box>

        {/* --- Map Section (no fixed height, no overflow) --- */}
        <Box mt={12} bg="white" borderRadius="lg" boxShadow="md" p={0}>
          <WorkoutMap
            center={mapCenter}
            workouts={filteredWorkouts}
            isMiles4mannyWorkoutFetching={isMiles4mannyWorkoutFetching}
            mapHeight={500} // control map height here
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Miles4Manny;
