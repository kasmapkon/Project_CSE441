// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrCDjVG44NGxIkL8T9R7iCWmtkATaDa_c",
  authDomain: "appcouple-be916.firebaseapp.com",
  databaseURL: "https://appcouple-be916-default-rtdb.firebaseio.com",
  projectId: "appcouple-be916",
  storageBucket: "appcouple-be916.appspot.com",
  messagingSenderId: "643306252689",
  appId: "1:643306252689:web:f745caab1805cf46b61230",
  measurementId: "G-XGDG9NCP5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const data=getDatabase(app);