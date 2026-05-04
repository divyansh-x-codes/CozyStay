import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDv_LLieKTD0Eh9LMZ4WvMCq3sRrmkMmKI",
  authDomain: "cozystay-8e352.firebaseapp.com",
  projectId: "cozystay-8e352",
  storageBucket: "cozystay-8e352.firebasestorage.app",
  messagingSenderId: "667342530009",
  appId: "1:667342530009:web:875c9a265c00b5805a25c8",
  measurementId: "G-G8X6C4SHM9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
