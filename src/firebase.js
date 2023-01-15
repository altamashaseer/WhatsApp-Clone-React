import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBO7jVh90H7QwuJWa64ghFoPGwUJ9zHoSA",
  authDomain: "chatapp-998af.firebaseapp.com",
  projectId: "chatapp-998af",
  storageBucket: "chatapp-998af.appspot.com",
  messagingSenderId: "756928388784",
  appId: "1:756928388784:web:e079e1d7df933adb7ee575"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();

