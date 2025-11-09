import React from "react";
import { Box, Text, Spinner, Center } from "@chakra-ui/react";
import WorkoutMapTitle from "./WorkoutMapTitle";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Select } from "antd";
import "antd/dist/reset.css";

import getWorkoutPolylines from "../utility/getWorkoutPolylines";
import workoutTypeColor from "../utility/workoutTypeColor";

const getType = (w) => w?.type ?? w?.sport_type ?? w?.workout_type ?? null;

const WorkoutMap = ({
  center = [47.298676735285866, -122.50927352084933],
  workouts = [],
  isMiles4mannyWorkoutFetching,
  mapHeight = 500,
}) => {
  // Detect unique types from multiple possible fields
  const types = React.useMemo(
    () => Array.from(new Set(workouts.map((w) => getType(w)).filter(Boolean))),
    [workouts],
  );

  // default select: all types currently present
  const [selectedTypes, setSelectedTypes] = React.useState([]);

  // when types change, include any new ones
  React.useEffect(() => {
    setSelectedTypes((prev) => {
      const s = new Set(prev ?? []);
      types.forEach((t) => s.add(t));
      return Array.from(s);
    });
  }, [types]);

  // precompute polyline data
  const workoutPolylines = React.useMemo(() => {
    return workouts.map((w, idx) => {
      const hasPolyline =
        w?.map?.summary_polyline && w.map.summary_polyline.length > 0;
      const positions = hasPolyline ? getWorkoutPolylines([w])[0] : null;
      return {
        id: w?.map?.id || w?.id || idx,
        positions,
        type: getType(w),
      };
    });
  }, [workouts]);

  const getColor = (type) => workoutTypeColor(type) || "#ff6600";

  const selectOptions = types.map((t) => ({
    label: (
      <span>
        <span
          style={{
            display: "inline-block",
            width: 12,
            height: 12,
            background: getColor(t),
            borderRadius: 3,
            marginRight: 6,
            border: "1px solid #ccc",
          }}
        />
        {t}
      </span>
    ),
    value: t,
  }));

  return (
    <>
      <WorkoutMapTitle />

      {isMiles4mannyWorkoutFetching ? (
        <Center height="100%" flexDirection="column" mt={8}>
          <Spinner size="xl" color="teal.500" thickness="4px" />
          <Text mt={4} color="gray.600" fontWeight="medium">
            Loading Manny&apos;s Workouts
          </Text>
        </Center>
      ) : (
        <>
          <Box mt={4} width="100%">
            <MapContainer
              center={center}
              zoom={10}
              style={{ height: mapHeight, width: "100%" }}
              scrollWheelZoom
            >
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {workoutPolylines.map((p) =>
                p.positions && (!p.type || selectedTypes.includes(p.type)) ? (
                  <Polyline
                    key={p.id}
                    positions={p.positions}
                    color={getColor(p.type)}
                    weight={3}
                    opacity={0.7}
                  />
                ) : null,
              )}
            </MapContainer>
          </Box>
          <Box mt={4}>
            <Text fontWeight="bold" mb={2} fontSize="sm">
              Workout Types
            </Text>
            {types.length > 0 ? (
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Workout Types"
                value={selectedTypes}
                onChange={(vals) => setSelectedTypes(vals || [])}
                options={selectOptions}
                maxTagCount="responsive"
                showSearch
                optionFilterProp="label"
                getPopupContainer={() => document.body}
                dropdownStyle={{ zIndex: 2000 }}
              />
            ) : (
              <Text color="gray.500" fontSize="sm">
                No workout types detected yet.
              </Text>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default WorkoutMap;
