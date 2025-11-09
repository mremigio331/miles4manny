import { STAGING, PROD, DEV } from "../constants/stages";

const getStage = () => {
  const domain = window.location.hostname.trim();

  if (domain === "staging.miles4manny.com") {
    return STAGING;
  } else if (domain === "miles4manny.com") {
    return PROD;
  }

  return DEV;
};

export default getStage;
