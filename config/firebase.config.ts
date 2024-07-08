import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCaYgxhjF8sQTaThhhU0_rjVUOxaD81lXY",
  authDomain: "password-manager-24b37.firebaseapp.com",
  projectId: "password-manager-24b37",
  storageBucket: "password-manager-24b37.appspot.com",
  messagingSenderId: "423927351652",
  appId: "1:423927351652:web:b5fca91f1178436ac29271",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
