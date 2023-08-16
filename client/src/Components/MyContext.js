import { createContext, useContext, useState } from "react";

export const MyContext = createContext();

const DrawStatusContext = createContext();

export function DrawStatusProvider({ children }) {
  const [drawStatus, setDrawStatus] = useState(false);

  return (
    <DrawStatusContext.Provider value={{ drawStatus, setDrawStatus }}>
      {children}
    </DrawStatusContext.Provider>
  );
}

export function useDrawStatus() {
  return useContext(DrawStatusContext);
}
