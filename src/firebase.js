// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDxRiU4Mr0jofq64U3ZcrH5_7yhZ1dxn5s",
  authDomain: "dspf-48af1.firebaseapp.com",
  projectId: "dspf-48af1",
  storageBucket: "dspf-48af1.appspot.com",
  messagingSenderId: "641161756500",
  appId: "1:641161756500:web:ff4c230c706f49e14b12c1"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth =getAuth(app)

export {auth,db}
