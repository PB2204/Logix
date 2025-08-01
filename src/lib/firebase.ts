// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "logix-hi2ob",
  "appId": "1:310822622627:web:e97871ebcf557b7c533616",
  "storageBucket": "logix-hi2ob.firebasestorage.app",
  "apiKey": "AIzaSyA1JRcMTQlGvf18i54MNQiEIGwWAl3JZP4",
  "authDomain": "logix-hi2ob.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "310822622627"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
