import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

/*
// Please don´t touch here!!!
// Just create a .env file in root folder and define variables there.
// Sample .env file
  REACT_APP_FIREBASE_API_KEY=""
  REACT_APP_FIREBASE_AUTH_DOMAN=""
  REACT_APP_FIREBASE_DATABASE_URL=""
  REACT_APP_FIREBASE_PROJECT_ID=""
  REACT_APP_FIREBASE_STORAGE_BUCKET=""
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID=""
  REACT_APP_FIREBASE_APP_ID=""
  REACT_APP_FIREBASE_MEASUREMENT_ID=""
*/

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
export const firestore = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)
