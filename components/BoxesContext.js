import React, { createContext, useContext, useState } from 'react';

const BoxesContext = createContext();

export function BoxesProvider({ children }) {
  const [boxes, setBoxes] = useState([]);
  return (
    <BoxesContext.Provider value={{ boxes, setBoxes }}>
      {children}
    </BoxesContext.Provider>
  );
}

export function useBoxes() {
  return useContext(BoxesContext);
} 