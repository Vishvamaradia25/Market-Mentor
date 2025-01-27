// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import { getAnalytics } from "firebase/analytics";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);