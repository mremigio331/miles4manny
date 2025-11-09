import React from "react";
import { Box, VStack, Text } from "@chakra-ui/react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Select } from "antd";
import "antd/dist/reset.css";

import getWorkoutPolylines from "../utility/getWorkoutPolylines";
import workoutTypeColor from "../utility/workoutTypeColor";

const WorkoutMap = ({
  center = [47.298676735285866, -122.50927352084933],
  workouts = [],
}) => {
  // unique types found in workouts
  const types = React.useMemo(
    () => Array.from(new Set(workouts.map((w) => w?.type).filter(Boolean))),
    [workouts],
  );

  // default select: all types currently present
  const [selectedTypes, setSelectedTypes] = React.useState(() =>
    Array.from(new Set(workouts.map((w) => w?.type).filter(Boolean))),
  );

  // keep selections inclusive as new types appear
  React.useEffect(() => {
    setSelectedTypes((prev = []) => {
      const s = new Set(prev);
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
        id: w?.map?.id || idx,
        positions,
        type: w?.type,
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
    <VStack align="stretch" spacing={4} height="100%">
      <Box flex="1 1 auto" height="100%" width="100%">
        <MapContainer
          center={center}
          zoom={10}
          style={{ height: "100%", width: "100%", minHeight: 360 }}
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

      {types.length > 0 && (
        <Box>
          <Text fontWeight="bold" mb={2} fontSize="sm">
            Workout Types
          </Text>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Workout Types"
            value={selectedTypes}
            onChange={(vals) => setSelectedTypes(vals)}
            options={selectOptions}
            maxTagCount="responsive"
            showSearch
            optionFilterProp="label"
          />
        </Box>
      )}
    </VStack>
  );
};

export default WorkoutMap;
