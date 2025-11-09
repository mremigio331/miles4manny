import axios from "axios";

export const apiRequestGet = (apiEndpoint, route) => {
  return axios.get(encodeURI(`${apiEndpoint}${route}`));
};
