
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBIsJuu1QVaSy0rUdL_7rugdf5XvxybtHM",
  authDomain: "ecoearnauth.firebaseapp.com",
  projectId: "ecoearnauth",
  storageBucket: "ecoearnauth.appspot.com",
  messagingSenderId: "42057584434",
  appId: "1:42057584434:web:38d9191cc4ed0b549bd12b",
  measurementId: "G-C0DQTBG5MG"
};

// Initialize Firestore
const db = firestore();

export { db };

