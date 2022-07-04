import { createContext, ReactElement, useState } from 'react';

const initialOptions = {
  searchValue: '',
};

export const SearchContext = createContext({
  options: initialOptions,
  setOptions: (initialOptions) => initialOptions,
});

interface SearchProviderProps {
  children: ReactElement[];
}

const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [options, setOptions] = useState(initialOptions);
  return (
    <SearchContext.Provider
      value={{
        options,
        setOptions,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
