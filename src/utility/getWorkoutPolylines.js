import polyline from "polyline";

export default function getWorkoutPolylines(workouts) {
  return workouts
    .map((w) => {
      if (
        w.map &&
        w.map.summary_polyline &&
        w.map.summary_polyline.length > 0
      ) {
        try {
          return polyline.decode(w.map.summary_polyline);
        } catch (e) {
          console.warn("Failed to decode polyline", w.map.summary_polyline, e);
          return null;
        }
      }
      return null;
    })
    .filter(Boolean);
}
