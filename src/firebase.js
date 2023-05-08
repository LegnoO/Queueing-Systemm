/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDqUST967846U9euuKEoNoxGZ19kHHUcA",
  authDomain: "queuing-system-a7cd9.firebaseapp.com",
  projectId: "queuing-system-a7cd9",
  storageBucket: "queuing-system-a7cd9.appspot.com",
  messagingSenderId: "282006586940",
  appId: "1:282006586940:web:58f199bc3d07f7ba222539",
  measurementId: "G-3KVL7HLVQF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
