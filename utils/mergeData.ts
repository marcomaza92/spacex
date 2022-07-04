import { monthsNames } from "./monthsNames";

export const mergeData = (launches, rockets) => {
  launches.forEach(launch => {
    const date = new Date(launch.launch_date_utc);
    launch.launch_date_utc = `${monthsNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    rockets.forEach(rocket => {
      if (launch.rocket.rocket_id === rocket.rocket_id) {
        launch.rocket = Object.assign(launch.rocket, rocket);
      }
    });
  });
}