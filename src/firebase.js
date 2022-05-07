// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCrvcx9lyM8EYrkTRi5e_8cgdHawHHlqL0",
  authDomain: "thinkin-9d887.firebaseapp.com",
  projectId: "thinkin-9d887",
  storageBucket: "thinkin-9d887.appspot.com",
  messagingSenderId: "581331467550",
  appId: "1:581331467550:web:c89517838a4cdf25ca5d0f",
  measurementId: "G-XXEY8F29HN",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
