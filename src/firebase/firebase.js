import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCq3PXBnz_rKZxPRCkOv9Ha3IJsOG7Vu8Q",
    authDomain: "uaspbfladuni.firebaseapp.com",
    databaseURL: "https://uaspbfladuni.firebaseio.com",
    projectId: "uaspbfladuni",
    storageBucket: "uaspbfladuni.appspot.com",
    messagingSenderId: "873355238388",
    appId: "1:873355238388:web:25a7ecf20fee76cd1637a1",
    measurementId: "G-QSW2BQTY78"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;
export default myFirebase;