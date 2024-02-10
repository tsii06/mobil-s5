import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyALwD5zOQotMs5-ug24w3RVcnZuLF1lBZY",
  authDomain: "chat-32ded.firebaseapp.com",
  projectId: "chat-32ded",
  storageBucket: "chat-32ded.appspot.com",
  messagingSenderId: "723597681232",
  appId: "1:723597681232:web:c3ede7c1bdcf20d327e755"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();