// src/backend/backend.js
import { auth, db } from "../firebaseConfig.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
 * Manual Register (Email, Password, Full Name, Age)
 */
export const register = async (fullName, email, age, password, confirmPassword) => {
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
      age,
      createdAt: new Date(),
    });

    console.log("Registration Success:", user);
    return user;
  } catch (error) {
    console.error("Registration Error:", error.message);
    throw error;
  }
};

export const getCurrentUser = async () => {
  const user = auth.currentUser;
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return { uid: user.uid, ...userSnap.data() };
    }
  }
  return null;
};

export const updateUserProfile = async (profession, tagline, linkedin, areasOfInterest) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updateProfile(user, {
        profession, tagline, linkedin, areasOfInterest
      });
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  } else {
    console.log("No user is signed in.");
  }
};