import { createContext, ReactElement, useState } from 'react';

const initialLaunches = [
  {
    mission_name: '',
    flight_number: 1,
    launch_date_utc: '',
    details: '',
    rocket: {
      rocket_id: '',
      flickr_images: [],
    },
    isFavorite: false,
  }
];

export const LaunchesContext = createContext({
  launches: initialLaunches,
  setLaunches: (initialLaunches) => initialLaunches,
});

interface LaunchesProviderProps {
  children: ReactElement;
}

const LaunchesProvider: React.FC<LaunchesProviderProps> = ({ children }) => {
  const [launches, setLaunches] = useState(initialLaunches);
  return (
    <LaunchesContext.Provider
      value={{
        launches,
        setLaunches,
      }}
    >
      {children}
    </LaunchesContext.Provider>
  );
};

export default LaunchesProvider;
