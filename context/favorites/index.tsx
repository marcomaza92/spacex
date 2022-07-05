import { createContext, ReactElement, useState } from 'react';

const initialFavorites = [];

export const FavoritesContext = createContext({
  favorites: initialFavorites,
  setFavorites: (initialFavorites) => initialFavorites,
});

interface FavoritesProviderProps {
  children: ReactElement;
}

const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState(initialFavorites);
  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        setFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
