import React from "react";
import { Box, Checkbox, VStack, HStack, Text, Button, Collapse, useDisclosure } from "@chakra-ui/react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import getWorkoutPolylines from "../utility/getWorkoutPolylines";
import workoutTypeColor from "../utility/workoutTypeColor";
import { useDeviceType } from "../providers/DeviceTypeProvider";

const WorkoutTypeFilters = ({ types, selectedTypes, toggleType, getColor }) => (
  <VStack spacing={1} align="stretch">
    {types.map((t) => (
      <HStack key={t} spacing={2}>
        <Checkbox isChecked={selectedTypes.includes(t)} onChange={() => toggleType(t)}>
          <HStack spacing={2}>
            <Box boxSize="12px" bg={getColor(t)} borderRadius="3px" />
            <Text fontSize="sm">{t}</Text>
          </HStack>
        </Checkbox>
      </HStack>
    ))}
  </VStack>
);

const WorkoutMap = ({ center = [47.298676735285866, -122.50927352084933], workouts = [] }) => {
  // derive unique types present in workouts
  const types = React.useMemo(
    () => Array.from(new Set(workouts.map((w) => w?.type).filter(Boolean))),
    [workouts]
  );

  // keep track of which types are selected; default includes all discovered types
  const [selectedTypes, setSelectedTypes] = React.useState(() => {
    return Array.from(new Set(workouts.map((w) => w?.type).filter(Boolean)));
  });

  // when new types appear, add them (don't remove user's existing selections)
  React.useEffect(() => {
    setSelectedTypes((prev = []) => {
      const s = new Set(prev);
      types.forEach((t) => s.add(t));
      return Array.from(s);
    });
  }, [types]);

  // Build polylines per workout (positions may be null if no polyline)
  const workoutPolylines = React.useMemo(() => {
    return workouts.map((w, idx) => {
      const hasPolyline = w?.map?.summary_polyline && w.map.summary_polyline.length > 0;
      const positions = hasPolyline ? getWorkoutPolylines([w])[0] : null;
      return {
        id: w?.map?.id || idx,
        positions,
        type: w?.type,
      };
    });
  }, [workouts]);

  const getColor = (type) => workoutTypeColor(type) || "#ff6600";

  const toggleType = (type) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  // Use device type context instead of Chakra's useMediaQuery
  const { isMobile } = useDeviceType();

  // For mobile filter dropdown
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box height="100%" width="100%" position="relative">
      <MapContainer center={center} zoom={10} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {workoutPolylines.map((p) =>
          p.positions && (!p.type || selectedTypes.includes(p.type)) ? (
            <Polyline key={p.id} positions={p.positions} color={getColor(p.type)} weight={3} opacity={0.7} />
          ) : null
        )}
        {/* Desktop filter overlay */}
        {types.length > 0 && !isMobile ? (
          <Box
            position="absolute"
            top="16px"
            left="16px"
            bg="whiteAlpha.900"
            p={3}
            borderRadius="md"
            boxShadow="md"
            zIndex={1000}
            maxW="220px"
          >
            <Text fontWeight="bold" mb={2} fontSize="sm">Filter Types</Text>
            <WorkoutTypeFilters
              types={types}
              selectedTypes={selectedTypes}
              toggleType={toggleType}
              getColor={getColor}
            />
          </Box>
        ) : null}
      </MapContainer>

      {/* Filters: Only show on mobile as dropdown, not on desktop */}
      {types.length > 0 && isMobile ? (
        <Box mt={3}>
          <Button size="sm" onClick={onToggle} mb={2} leftIcon={
            <Box boxSize="12px" bg={getColor(types[0])} borderRadius="3px" />
          }>
            Filter Types
          </Button>
          <Collapse in={isOpen} animateOpacity>
            <Box
              bg="whiteAlpha.900"
              p={2}
              borderRadius="md"
              boxShadow="md"
              maxW="220px"
              mt={1}
            >
              <WorkoutTypeFilters
                types={types}
                selectedTypes={selectedTypes}
                toggleType={toggleType}
                getColor={getColor}
              />
            </Box>
          </Collapse>
        </Box>
      ) : null}
    </Box>
  );
};

export default WorkoutMap;
