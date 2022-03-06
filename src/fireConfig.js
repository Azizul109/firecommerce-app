// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTWRrdmiKRl-VXaleuvMn-RisZ5hKDsmQ",
  authDomain: "firecommerce-app.firebaseapp.com",
  projectId: "firecommerce-app",
  storageBucket: "firecommerce-app.appspot.com",
  messagingSenderId: "856085347775",
  appId: "1:856085347775:web:1ca0d6ba2a2526ae75f50a",
  measurementId: "G-GVHMT3YKH5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const fireDB = getFirestore(app);

export default fireDB;