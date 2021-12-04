import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDUO-8_q7RgmrpxZZyvCKoOLFwL7mpyyqs",
  authDomain: "chatify-b880c.firebaseapp.com",
  projectId: "chatify-b880c",
  storageBucket: "chatify-b880c.appspot.com",
  messagingSenderId: "1028625458836",
  appId: "1:1028625458836:web:fecbd2be876b386ed43681",
  measurementId: "G-ZQ0NHNCRNZ",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
