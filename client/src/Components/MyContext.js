import { createContext, useContext, useState } from "react";

export const MyContext = createContext();

const DrawStatusContext = createContext();

// export const DrawStatusProvider = ({ children }) => {
//   const [eventDrawStatus, setEventDrawStatus] = useState({}); // Use an object to store draw status for each event

//   const setDrawStatus = (eventId, status) => {
//     setEventDrawStatus((prevStatus) => ({
//       ...prevStatus,
//       [eventId]: status,
//     }));
//   };

//   const getDrawStatus = (eventId) => {
//     return eventDrawStatus[eventId] || false; // Return false if draw status is not set for the event
//   };

//   return (
//     <DrawStatusContext.Provider value={{ setDrawStatus, getDrawStatus }}>
//       {children}
//     </DrawStatusContext.Provider>
//   );
// };

export const DrawStatusProvider = ({ children }) => {
  const [eventDrawStatus, setEventDrawStatus] = useState(() => {
    const storedDrawStatus = localStorage.getItem("eventDrawStatus");
    return storedDrawStatus ? JSON.parse(storedDrawStatus) : {};
  });

  const setDrawStatus = (eventId, status) => {
    const updatedStatus = {
      ...eventDrawStatus,
      [eventId]: status,
    };
    setEventDrawStatus(updatedStatus);
    localStorage.setItem("eventDrawStatus", JSON.stringify(updatedStatus));
  };

  const getDrawStatus = (eventId) => {
    return eventDrawStatus[eventId] || false;
  };

  return (
    <DrawStatusContext.Provider value={{ setDrawStatus, getDrawStatus }}>
      {children}
    </DrawStatusContext.Provider>
  );
};

export const useDrawStatus = () => useContext(DrawStatusContext);
