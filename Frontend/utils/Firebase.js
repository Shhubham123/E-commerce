import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "logine-commerce-f4839.firebaseapp.com",
  projectId: "logine-commerce-f4839",
  storageBucket: "logine-commerce-f4839.appspot.com",
  messagingSenderId: "923708491930",
  appId: "1:923708491930:web:49812828aca2223123b723"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app)
const provider =new GoogleAuthProvider()

export {auth,provider}
