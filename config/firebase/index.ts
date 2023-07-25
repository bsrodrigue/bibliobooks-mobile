import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA0XT51isdE8xlEhzSspNyRab0JDwtOLBQ",
    authDomain: "bibliobooks-df6ca.firebaseapp.com",
    projectId: "bibliobooks-df6ca",
    storageBucket: "bibliobooks-df6ca.appspot.com",
    messagingSenderId: "98696986227",
    appId: "1:98696986227:web:34366058f85b070d85b406"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);