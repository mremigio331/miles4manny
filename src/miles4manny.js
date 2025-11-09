// App.jsx
import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Input,
  Checkbox,
  CheckboxGroup,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";

import NavBar from "./components/navbar";
import { useMiles4MannyWorkouts } from "./providers/Miles4MannyWorkoutsProvider";

// Import the new WorkoutMap component
import WorkoutMap from "./components/WorkoutMap";

// Use the default center directly
const DEFAULT_CENTER = [47.298676735285866, -122.50927352084933];

const Miles4Manny = () => {
  const {
    miles4mannyWorkouts,
    isMiles4mannyWorkoutFetching,
    isMiles4mannyWorkoutError,
    miles4mannyWorkoutError,
  } = useMiles4MannyWorkouts();

  // Get all unique workout types from the data
  const workoutTypes = React.useMemo(() => {
    const types = new Set();
    miles4mannyWorkouts.forEach((w) => {
      if (w.type) types.add(w.type);
    });
    return Array.from(types);
  }, [miles4mannyWorkouts]);

  // Replace single selectedType string with an array of selected types
  const [selectedTypes, setSelectedTypes] = React.useState([]);

  // When workoutTypes load, default select all types
  React.useEffect(() => {
    if (workoutTypes.length > 0 && selectedTypes.length === 0) {
      setSelectedTypes(workoutTypes);
    }
  }, [workoutTypes, selectedTypes.length]);

  // Filtered workouts by selectedTypes (treat empty as all)
  const filteredWorkouts = React.useMemo(() => {
    if (!selectedTypes || selectedTypes.length === 0) return miles4mannyWorkouts;
    return miles4mannyWorkouts.filter((w) => selectedTypes.includes(w.type));
  }, [miles4mannyWorkouts, selectedTypes]);

  // Handler for Mantine MultiSelect
  // Search term for filtering types in the UI
  const [searchTerm, setSearchTerm] = React.useState("");

  // Handler for CheckboxGroup change (Chakra passes an array)
  const handleMultiSelectChange = (value) => {
    setSelectedTypes(value || []);
  };

  // Visible types after applying the search term
  const visibleTypes = React.useMemo(() => {
    if (!searchTerm) return workoutTypes;
    const q = searchTerm.toLowerCase();
    return workoutTypes.filter((t) => t.toLowerCase().includes(q));
  }, [workoutTypes, searchTerm]);

  const selectAllVisible = () => setSelectedTypes(visibleTypes.slice());
  const clearSelection = () => setSelectedTypes([]);

  const mapCenter = DEFAULT_CENTER;

  if (isMiles4mannyWorkoutFetching) {
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
            Loading workouts...
          </Text>
        </Container>
      </Box>
    );
  }

  if (isMiles4mannyWorkoutError) {
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
          <Text textAlign="center" color="red.500" fontSize="lg">
            Error loading workouts:{" "}
            {miles4mannyWorkoutError?.message || "Unknown error"}
          </Text>
        </Container>
      </Box>
    );
  }

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

        <Box
          mt={12}
          height="500px"
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          overflow="hidden"
        >
          <WorkoutMap center={mapCenter} workouts={filteredWorkouts} />
        </Box>
      </Container>
    </Box>
  );
};

export default Miles4Manny;

