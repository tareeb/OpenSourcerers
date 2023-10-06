import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDyUf4WwoDSJ8GquvzawUQ1ox-Byfv8psU",
  authDomain: "djangoauthentication-d5319.firebaseapp.com",
  projectId: "djangoauthentication-d5319",
  storageBucket: "djangoauthentication-d5319.appspot.com",
  messagingSenderId: "546841438272",
  appId: "1:546841438272:web:539be6776135c565b757a5",
  measurementId: "G-8F4MS9QZNX"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
