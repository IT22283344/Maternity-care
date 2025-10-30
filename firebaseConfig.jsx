// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';  // Updated to initialize auth with persistence
import AsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDncLOPOA8uJdYpDfCvI42fesfwavlJPps',
  authDomain: 'market-place-7d7eb.firebaseapp.com',
  projectId: 'market-place-7d7eb',
  storageBucket: 'market-place-7d7eb.appspot.com',
  messagingSenderId: '452357259329',
  appId: '1:452357259329:web:10e4d316c646e54fb1c6c0',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it
export const firestore = getFirestore(app);

// Initialize Firebase Authentication with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
