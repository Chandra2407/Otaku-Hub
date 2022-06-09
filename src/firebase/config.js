import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNzFAqpSoeeBN7sENg9426uvTRtrC-GQU",
  authDomain: "otaku-hub-274bd.firebaseapp.com",
  projectId: "otaku-hub-274bd",
  storageBucket: "otaku-hub-274bd.appspot.com",
  messagingSenderId: "838582512705",
  appId: "1:838582512705:web:db8c82ef8c4c219d82eac0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();