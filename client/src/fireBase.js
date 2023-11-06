// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-fe768.firebaseapp.com",
  projectId: "mern-estate-fe768",
  storageBucket: "mern-estate-fe768.appspot.com",
  messagingSenderId: "515552780233",
  appId: "1:515552780233:web:5d3787a5fe3ce16ecbd218",
  measurementId: "G-3ZJ2QDVKPT"
};

export const app = initializeApp(firebaseConfig);


