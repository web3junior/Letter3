import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FBC_APIKEY,
  authDomain: process.env.REACT_APP_FBC_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FBC_PROJECTID,
  storageBucket: process.env.REACT_APP_FBC_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FBC_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FBC_APPID,
  measurementId: process.env.REACT_APP_FBC_MEASUREMENTID,
}

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export {db}