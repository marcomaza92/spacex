import { createContext, ReactElement, useState } from 'react';

const initialSections = {
  main: 'all', 
};

export const SectionsContext = createContext({
  sections: initialSections,
  setSections: (initialSections) => initialSections,
});

interface SectionsProviderProps {
  children: ReactElement;
}

const SectionsProvider: React.FC<SectionsProviderProps> = ({ children }) => {
  const [sections, setSections] = useState(initialSections);
  return (
    <SectionsContext.Provider
      value={{
        sections,
        setSections,
      }}
    >
      {children}
    </SectionsContext.Provider>
  );
};

export default SectionsProvider;
