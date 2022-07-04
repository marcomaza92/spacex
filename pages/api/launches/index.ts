export const getLaunches = async () => {
  const response = await fetch('https://api.spacexdata.com/v3/launches');
  const data = await response.json();
  return data;
}