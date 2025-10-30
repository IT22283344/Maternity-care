// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';  // Updated to initialize auth with persistence
import AsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage

// Your web app's Firebase configuration
const firebaseConfig = {
 
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it
export const firestore = getFirestore(app);

// Initialize Firebase Authentication with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
