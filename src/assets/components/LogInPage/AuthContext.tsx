import React, { createContext, useContext, ReactNode, useState } from 'react';

interface IdContextType {
  id: string | null;
  barrio: string | null;
  nombre: string | null;
  setId: (id: string) => void;
  _setBarrio: (barrio: string) => void;
  setNombre: (nombre : string) => void;
}

const IdContext = createContext<IdContextType | undefined>(undefined);

interface IdProviderProps {
  children: ReactNode;
}

export const IdProvider: React.FC<IdProviderProps> = ({ children }) => {
  const [id, setId] = useState<string | null>(null);
  const [barrio, _setBarrio] = useState<string | null>(null);
  const [nombre, setNombre] = useState<string | null>(null);

  return (
    <IdContext.Provider value={{ id, barrio, nombre, setId, _setBarrio, setNombre }}>
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
};