import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCkDDsWFuP44jvoSjkGfUgwnVYh9h2dxt0",
  authDomain: "gift-31416.firebaseapp.com",
  projectId: "gift-31416",
  storageBucket: "gift-31416.appspot.com",
  messagingSenderId: "836234254908",
  appId: "1:836234254908:web:18588938a965dc45594139"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();