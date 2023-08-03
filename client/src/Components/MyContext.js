import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged, // Import this from Firebase auth module
} from "firebase/auth";
import { auth } from "../firebase.js";

export const MyContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null); // Initialize as null for better handling

  useEffect(() => {
    // Add a listener to monitor changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser); // User is logged in
      } else {
        setUser(null); // User is logged out
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  async function logIn(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      // Handle login errors here
      console.error("Error logging in:", error.message);
      throw error; // Rethrow the error for the calling code to handle
    }
  }

  async function signUp(email, password) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      // Handle signup errors here
      console.error("Error signing up:", error.message);
      throw error; // Rethrow the error for the calling code to handle
    }
  }

  async function logOut() {
    try {
      await signOut(auth);
    } catch (error) {
      // Handle logout errors here
      console.error("Error logging out:", error.message);
      throw error; // Rethrow the error for the calling code to handle
    }
  }

  return (
    <MyContext.Provider value={{ user, logIn, signUp, logOut }}>
      {children}
    </MyContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(MyContext);
}
