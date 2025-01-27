import { createContext } from "react";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBP9dhtlu7csdFVqA3S6cyhDtX-2gHCxq4",
    authDomain: "market-mentor-80464.firebaseapp.com",
    projectId: "market-mentor-80464",
    storageBucket: "market-mentor-80464.appspot.com",
    messagingSenderId: "785612487244",
    appId: "1:785612487244:web:930adc775c402f571e12e9",
    measurementId: "G-MQFKXN7QZ5",
    databaseURL: "https://market-mentor-80464-default-rtdb.firebaseio.com"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const firebaseAuth = getAuth(firebaseApp)

const FirebaseContext = createContext(null);

export const FirebaseProvider = (props) => {
    const signupUserWithEmailandPassword = (email, password) =>{
        createUserWithEmailAndPassword(firebaseAuth, email, password)
    }
    return (
        <FirebaseContext.Provider value={signupUserWithEmailandPassword}>
            {props.children}
        </FirebaseContext.Provider>
    );
}