// App.jsx
import React from "react";
import { Box, Container, Heading, Text } from "@chakra-ui/react";

import NavBar from "./components/navbar";
import { useMiles4MannyWorkouts } from "./providers/Miles4MannyWorkoutsProvider";

// Import react-leaflet and leaflet CSS
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Import utility functions
import getWorkoutPolylines from "./utility/getWorkoutPolylines";

// Use the default center directly
const DEFAULT_CENTER = [47.298676735285866, -122.50927352084933];

const Miles4Manny = () => {
  const {
    miles4mannyWorkouts,
    isMiles4mannyWorkoutFetching,
    isMiles4mannyWorkoutError,
    miles4mannyWorkoutError,
  } = useMiles4MannyWorkouts();

  const polylines = React.useMemo(
    () => getWorkoutPolylines(miles4mannyWorkouts),
    [miles4mannyWorkouts],
  );

  // Always use the default center
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
          <MapContainer
            center={mapCenter}
            zoom={10}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {polylines.map((coords, idx) => (
              <Polyline
                key={idx}
                positions={coords}
                color="#ff6600"
                weight={3}
                opacity={0.7}
              />
            ))}
          </MapContainer>
        </Box>
      </Container>
    </Box>
  );
};

export default Miles4Manny;
