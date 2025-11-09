import React, { createContext, useContext, useMemo } from "react";
// If your hook file is actually named useGetMannyWorkouts.js, keep that path.
// Otherwise, this path is the likely intended one:
import useGetMiles4MannyWorkouts from "../hooks/useGetMannyWorkouts";

const Miles4MannyWorkoutsContext = createContext(null);

export const Miles4MannyWorkoutsProvider = ({ children }) => {
  const {
    miles4mannyWorkouts,
    isMiles4mannyWorkoutFetching,
    isMiles4mannyWorkoutError,
    miles4mannyWorkoutStatus,
    miles4mannyWorkoutError,
    miles4mannyWorkoutRefetch,
  } = useGetMiles4MannyWorkouts();

  const value = useMemo(
    () => ({
      miles4mannyWorkouts,
      isMiles4mannyWorkoutFetching,
      isMiles4mannyWorkoutError,
      miles4mannyWorkoutStatus,
      miles4mannyWorkoutError,
      miles4mannyWorkoutRefetch,
    }),
    [
      miles4mannyWorkouts,
      isMiles4mannyWorkoutFetching,
      isMiles4mannyWorkoutError,
      miles4mannyWorkoutStatus,
      miles4mannyWorkoutError,
      miles4mannyWorkoutRefetch,
    ],
  );

  return (
    <Miles4MannyWorkoutsContext.Provider value={value}>
      {children}
    </Miles4MannyWorkoutsContext.Provider>
  );
};

export const useMiles4MannyWorkouts = () => {
  const ctx = useContext(Miles4MannyWorkoutsContext);
  if (!ctx) {
    throw new Error(
      "useMiles4MannyWorkouts must be used within a Miles4MannyWorkoutsProvider",
    );
  }
  return ctx;
};
