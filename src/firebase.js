// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDM1YxBhlFhb9JpaCaU0S9YCqgLQNlfJ0g",
  authDomain: "shopping-cart-b041e.firebaseapp.com",
  projectId: "shopping-cart-b041e",
  storageBucket: "shopping-cart-b041e.appspot.com",
  messagingSenderId: "4822740292",
  appId: "1:4822740292:web:5c50f3d97fe2fbcef67b11",
  measurementId: "G-040RC2X2ME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);