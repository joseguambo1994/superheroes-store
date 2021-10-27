import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBc9_rHVcwUdXXnvv_S2aV39A2-NE_k-BY",
    authDomain: "superheroes-store.firebaseapp.com",
    projectId: "superheroes-store",
    storageBucket: "superheroes-store.appspot.com",
    messagingSenderId: "839020315664",
    appId: "1:839020315664:web:241b0beccf06853d403695"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db }