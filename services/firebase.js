import 'firebase/firestore';
import firebase from 'firebase/app';

// https://console.firebase.google.com/project/next-firebase-poc/settings/general/web:N2Q2YzAyMDYtZGIzOC00OGE3LThjYTEtYzM5Y2Q0NGI5NDIw
const firebaseConfig = {
  apiKey: 'AIzaSyDf9G8VZbcyJ5KSybm0VBLmLthFuvkHrcc',
  authDomain: 'next-firebase-poc.firebaseapp.com',
  projectId: 'next-firebase-poc',
  storageBucket: 'next-firebase-poc.appspot.com',
  messagingSenderId: '73142146303',
  appId: '1:73142146303:web:4090d6f533b1802c7d68ca',
  measurementId: 'G-RLW6DXV66D',
};

if (!firebase?.apps?.length) firebase?.initializeApp(firebaseConfig);

export { firebase };
