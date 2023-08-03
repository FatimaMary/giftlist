import { createContext, useContext } from "react";

export const MyContext = createContext();

export function useUserAuth() {
  return useContext(MyContext);
}
