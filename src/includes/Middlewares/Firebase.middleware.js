import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import firebaseConfig from '../Config/Firebase.config';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleAuthProvider = new GoogleAuthProvider();

export {auth,googleAuthProvider, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider };