// import { initializeApp } from 'firebase/app';
// import 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };

// const firebaseApp = initializeApp(firebaseConfig);

// export default firebaseApp;

import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBIsJuu1QVaSy0rUdL_7rugdf5XvxybtHM",
  authDomain: "ecoearnauth.firebaseapp.com",
  projectId: "ecoearnauth",
  storageBucket: "ecoearnauth.appspot.com",
  messagingSenderId: "42057584434",
  appId: "1:42057584434:web:38d9191cc4ed0b549bd12b",
  measurementId: "G-C0DQTBG5MG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};
