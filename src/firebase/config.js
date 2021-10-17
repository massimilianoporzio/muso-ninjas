
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import {serverTimestamp } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAt4hZo6_jVQZe2kP3_9WJ8m0LKAMiB4oE",
    authDomain: "muso-ninjas-abefe.firebaseapp.com",
    projectId: "muso-ninjas-abefe",
    storageBucket: "muso-ninjas-abefe.appspot.com",
    messagingSenderId: "436833975711",
    appId: "1:436833975711:web:a7973ff1ea559a30be51aa"
};

const firebaseApp = initializeApp(firebaseConfig)

const projectAuth = getAuth(firebaseApp);
const db = getFirestore()
export {db,projectAuth,serverTimestamp}
