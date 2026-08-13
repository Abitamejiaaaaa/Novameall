// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZwl5dFxHo-ZBLuhVmQ1XKWYw-rEIuAIU",
  authDomain: "novameall.firebaseapp.com",
  projectId: "novameall",
  storageBucket: "novameall.firebasestorage.app",
  messagingSenderId: "1068304607310",
  appId: "1:1068304607310:web:7a151948e8abbf34b5fb1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);