import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDocs, deleteDoc, query, where, orderBy } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDwU2eOrnnwGMQvmmsYc8obpCJswt4sRcI",
  authDomain: "music-i-sum.firebaseapp.com",
  projectId: "music-i-sum",
  storageBucket: "music-i-sum.appspot.com",
  messagingSenderId: "1011411775875",
  appId: "1:1011411775875:web:9a2ecfddc777882e6f46b6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db, collection, doc, setDoc, getDocs, deleteDoc, query, where, orderBy };