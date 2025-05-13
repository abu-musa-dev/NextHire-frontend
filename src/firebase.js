import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBUR0QfHqQ7mxBG7Rr_DBE9oApELKn7xwE",
  authDomain: "next-hire-48aaf.firebaseapp.com",
  projectId: "next-hire-48aaf",
  storageBucket: "next-hire-48aaf.appspot.com",
  messagingSenderId: "58353458792",
  appId: "1:58353458792:web:522322b6000ff5cf8d65dd",
  measurementId: "G-LF83SZJ546",
};

// Initialize Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
const auth = getAuth(app);
const storage = getStorage(app);

// ✅ Export everything you need
export { app, auth, storage };
