import { baseUrl, paths } from "../common";

export const getRockets = async () => {
  const response = await fetch(`${baseUrl}${paths.rockets}`);
  const data = await response.json();
  return data;
}

export const getRocket = async (rocket_id) => {
  const response = await fetch(`${baseUrl}${paths.rockets}${rocket_id}`);
  const data = await response.json();
  return data;
}