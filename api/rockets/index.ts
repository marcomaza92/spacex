export const getRockets = async () => {
  const response = await fetch('https://api.spacexdata.com/v3/rockets');
  const data = await response.json();
  return data;
}

export const getRocket = async (rocket_id) => {
  const response = await fetch(`https://api.spacexdata.com/v3/rockets/${rocket_id}`);
  const data = await response.json();
  return data;
}