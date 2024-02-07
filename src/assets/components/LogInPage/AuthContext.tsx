import React, { createContext, useContext, ReactNode, useState } from 'react';

interface IdContextType {
  id: string | null;
  setId: (id: string) => void;
}

const IdContext = createContext<IdContextType | undefined>(undefined);

interface IdProviderProps {
  children: ReactNode;
}

export const IdProvider: React.FC<IdProviderProps> = ({ children }) => {
  const [id, setId] = useState<string | null>(null);

  return (
    <IdContext.Provider value={{ id, setId }}>
      {children}
    </IdContext.Provider>
  );
};

export const useId = () => {
  const context = useContext(IdContext);
  if (!context) {
    throw new Error('useId must be used within an IdProvider');
  }
  return context;
}