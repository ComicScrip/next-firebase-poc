import 'firebase/firestore';
import firebase from 'firebase/app';

// https://console.firebase.google.com/project/next-firebase-poc/settings/general/web:N2Q2YzAyMDYtZGIzOC00OGE3LThjYTEtYzM5Y2Q0NGI5NDIw
const firebaseConfig = {
  // TODO
};

if (!firebase?.apps?.length) firebase?.initializeApp(firebaseConfig);

export { firebase };
