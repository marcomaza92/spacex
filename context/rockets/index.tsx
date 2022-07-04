import { createContext, ReactElement, useState } from 'react';

const initialRockets = [
  {
    id: 0,
    rocket_id: ''
  }
];

export const RocketsContext = createContext({
  rockets: initialRockets,
  setRockets: (initialRockets) => initialRockets,
});

interface LaunchesProviderProps {
  children: ReactElement;
}

const LaunchesProvider: React.FC<LaunchesProviderProps> = ({ children }) => {
  const [rockets, setRockets] = useState(initialRockets);
  return (
    <RocketsContext.Provider
      value={{
        rockets,
        setRockets,
      }}
    >
      {children}
    </RocketsContext.Provider>
  );
};

export default LaunchesProvider;
