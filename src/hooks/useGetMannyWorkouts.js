import { useQuery } from "@tanstack/react-query";
import { useContext, useMemo } from "react";
import { useApi } from "../providers/ApiProvider";
import { apiRequestGet } from "../api/apiRequest";

const fetchAllWorkouts = async (apiEndpoint, idToken) => {
  let allWorkouts = [];
  let nextToken = null;
  let prevToken = null;
  const limit = 500;

  do {
    let endpoint = `/strava/miles4manny?limit=${limit}`;
    if (nextToken) endpoint += `&next_token=${encodeURIComponent(nextToken)}`;

    const response = await apiRequestGet(apiEndpoint, endpoint, idToken);
    const data = response.data;

    allWorkouts = allWorkouts.concat(data.workouts || []);
    prevToken = nextToken;
    nextToken = data.next_token;

    if (!nextToken || nextToken === prevToken) {
      if (!nextToken) {
        console.log("No new token, finished fetching all workouts.");
      } else {
        console.warn(
          "Same next_token received, breaking to avoid infinite loop.",
        );
      }
      break;
    }
  } while (true);

  return allWorkouts;
};

const useGetMiles4MannyWorkouts = () => {
  const api = useApi();
  const { apiEndpoint, stage } = api;

  const { data, isFetching, isError, status, error, refetch } = useQuery({
    queryKey: ["miles4manny"],
    queryFn: () => fetchAllWorkouts(apiEndpoint),
    keepPreviousData: true,
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    // Do NOT set refetchInterval
  });

  if (stage === "dev" || stage === "staging") {
    console.log("Strava Workouts Data:", data);
    console.log("Strava Workouts Status:", status);
    console.log("Strava Workouts Error:", error);
    console.log("Strava Workouts isFetching:", isFetching);
    console.log("Strava Workouts isError:", isError);
    if (error) {
      if (error.response && error.response.data) {
        console.log("Strava Workouts API Error Response:", error.response.data);
      } else {
        console.log("Strava Workouts API Error (no response.data):", error);
        if (error.status) {
          console.log("Strava Workouts API Error Status:", error.status);
        }
        if (error.message) {
          console.log("Strava Workouts API Error Message:", error.message);
        }
      }
    }
  }
  return {
    miles4mannyWorkouts: data ?? [],
    isMiles4mannyWorkoutFetching: isFetching,
    isMiles4mannyWorkoutError: isError,
    miles4mannyWorkoutStatus: status,
    miles4mannyWorkoutError: error ?? null,
    miles4mannyWorkoutRefetch: refetch,
  };
};

export default useGetMiles4MannyWorkouts;
