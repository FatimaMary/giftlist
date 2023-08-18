import { createContext, useContext, useState } from "react";

export const MyContext = createContext();

const DrawStatusContext = createContext();

export const DrawStatusProvider = ({ children }) => {
  const [eventDrawStatus, setEventDrawStatus] = useState({}); // Use an object to store draw status for each event

  const setDrawStatus = (eventId, status) => {
    setEventDrawStatus((prevStatus) => ({
      ...prevStatus,
      [eventId]: status,
    }));
  };

  const getDrawStatus = (eventId) => {
    return eventDrawStatus[eventId] || false; // Return false if draw status is not set for the event
  };

  return (
    <DrawStatusContext.Provider value={{ setDrawStatus, getDrawStatus }}>
      {children}
    </DrawStatusContext.Provider>
  );
};

export const useDrawStatus = () => useContext(DrawStatusContext);
