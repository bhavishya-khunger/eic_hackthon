// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";  // Firestore (Optional)
import { getDatabase } from "firebase/database";  // Realtime DB (Optional)
import { getAuth } from "firebase/auth";  // Firebase Authentication

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoacwg-IkV0n72fTsZft9HjarZX6v_IdE",
  authDomain: "hackathon-6052d.firebaseapp.com",
  projectId: "hackathon-6052d",
  storageBucket: "hackathon-6052d.firebasestorage.app",
  messagingSenderId: "173591530119",
  appId: "1:173591530119:web:8154b2682aa1f442480622",
  measurementId: "G-Y6JDR2PSHM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);  // Firestore
const rtdb = getDatabase(app); // Realtime Database
const auth = getAuth(app);  // Authentication

// Export Firebase services
export { app, analytics, db, rtdb, auth };
