import { initializeApp } from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "revents-ba940.firebaseapp.com",
  projectId: "revents-ba940",
  storageBucket: "revents-ba940.appspot.com",
  messagingSenderId: "798301344389",
  appId: "1:798301344389:web:e5f2544be242cc92674fec",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
