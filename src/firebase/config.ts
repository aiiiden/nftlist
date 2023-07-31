import { initializeApp } from "firebase/app";
import { getFirestore, setLogLevel } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  // apiKey: "AIzaSyAVzW43lbnAr086dAB441RKXxRZGla8Qa4",
  // authDomain: "nftlist-c1026.firebaseapp.com",
  // projectId: "nftlist-c1026",
  // storageBucket: "nftlist-c1026.appspot.com",
  // messagingSenderId: "358750134734",
  // appId: "1:358750134734:web:06502198e242ecbdedcb9f",
  // measurementId: "G-VLEJ3N677E",
};

setLogLevel("debug");

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
