// src/firebase.js ✅

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBUR0QfHqQ7mxBG7Rr_DBE9oApELKn7xwE",
  authDomain: "next-hire-48aaf.firebaseapp.com",
  projectId: "next-hire-48aaf",
  storageBucket: "next-hire-48aaf.firebasestorage.app",
  messagingSenderId: "58353458792",
  appId: "1:58353458792:web:522322b6000ff5cf8d65dd",
  measurementId: "G-LF83SZJ546"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app); // Optional

// Export
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
