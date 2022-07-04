export const getLaunches = async () => {
  const response = await fetch('https://api.spacexdata.com/v3/launches');
  const data = await response.json();
  return data;
}

export const getLaunch = async (flight_number) => {
  const response = await fetch(`https://api.spacexdata.com/v3/launches/${flight_number}`);
  const data = await response.json();
  return data;
}