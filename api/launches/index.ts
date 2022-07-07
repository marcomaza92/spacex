import { baseUrl, paths } from "../common";

export const getLaunches = async () => {
  const response = await fetch(`${baseUrl}${paths.launches}`);
  const data = await response.json();
  return data;
}

export const getLaunch = async (flight_number) => {
  const response = await fetch(`${baseUrl}${paths.launches}${flight_number}`);
  const data = await response.json();
  return data;
}