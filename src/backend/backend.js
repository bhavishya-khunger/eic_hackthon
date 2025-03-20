// src/backend/backend.js
import { auth, db } from "../firebaseConfig.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Google Provider
const googleProvider = new GoogleAuthProvider();

/**
 * Sign in with Google
 */
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google Sign-In Success:", result.user);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error.message);
    throw error;
  }
};

/**
 * Register with Google (Same as login, but can be used separately if needed)
 */
export const registerWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Store additional user data in Firestore if needed
    await setDoc(doc(db, "users", user.uid), {
      name: user.displayName,
      email: user.email,
      industry: "Unknown",
      createdAt: new Date(),
    });

    console.log("Google Registration Success:", user);
    return user;
  } catch (error) {
    console.error("Google Registration Error:", error.message);
    throw error;
  }
};

/**
 * Manual Login (Email & Password)
 */
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Manual Login Success:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Manual Login Error:", error.message);
    throw error;
  }
};

/**
 * Manual Register (Email, Password, Full Name, Industry)
 */
export const register = async (fullName, email, industry, password, confirmPassword) => {
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match!");
  }

  try {
    // Create user with email/password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update profile with full name
    await updateProfile(user, { displayName: fullName });

    // Store additional user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: fullName,
      email,
      industry,
      createdAt: new Date(),
    });

    console.log("Registration Success:", user);
    return user;
  } catch (error) {
    console.error("Registration Error:", error.message);
    throw error;
  }
};
