// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCw7Yp6k4_bVirlztJREFFtqA00B0PnLsM',
  authDomain: 'react-course-1-e51eb.firebaseapp.com',
  projectId: 'react-course-1-e51eb',
  storageBucket: 'react-course-1-e51eb.appspot.com',
  messagingSenderId: '748514093139',
  appId: '1:748514093139:web:1089d56cd2b2c8e2853ea6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
