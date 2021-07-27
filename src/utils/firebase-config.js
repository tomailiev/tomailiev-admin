import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAvs56Y3H86w7p3y4bE0-LUI0XOrflNL5g",
    authDomain: "toma-iliev.firebaseapp.com",
    databaseURL: "https://toma-iliev.firebaseio.com",
    projectId: "toma-iliev",
    storageBucket: "toma-iliev.appspot.com",
    messagingSenderId: "733232669569",
    appId: "1:733232669569:web:b9215187b457524c9fbe80",
    measurementId: "G-0FG106E6JS"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const Timestamp = firebase.firestore.Timestamp;
export { db, auth, Timestamp };
