// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCI9DDzw2nOYgoROZ9nwtkb5ZrHNGxb7Nc",
  authDomain: "capstone-25e68.firebaseapp.com",
  projectId: "capstone-25e68",
  storageBucket: "capstone-25e68.appspot.com",
  messagingSenderId: "2679444060",
  appId: "1:2679444060:web:05a205e73c96d65f464c99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export default app 