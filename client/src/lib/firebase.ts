import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4CVilXF6XVkXaCt39nILdR1D4xu9PMA0",
  authDomain: "bihardarshan-26916.firebaseapp.com",
  projectId: "bihardarshan-26916",
  storageBucket: "bihardarshan-26916.firebasestorage.app",
  messagingSenderId: "500023080659",
  appId: "1:500023080659:web:e8d1a8dfe8449ce0144626",
  measurementId: "G-1KNXZ6PPCV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
