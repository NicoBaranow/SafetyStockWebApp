// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjSqpE4rTOlYYwBmz9lUfR-IV-Fy-0JD8",
  authDomain: "safety-stock.firebaseapp.com",
  databaseURL: "https://safety-stock-default-rtdb.firebaseio.com",
  projectId: "safety-stock",
  storageBucket: "safety-stock.appspot.com",
  messagingSenderId: "669087626102",
  appId: "1:669087626102:web:27d85135e9c48e56150057",
  measurementId: "G-TNJ9NPZ6Y4"
};


// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp)
export const firestore = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)