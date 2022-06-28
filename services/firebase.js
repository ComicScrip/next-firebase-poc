import 'firebase/messaging';
import 'firebase/firestore';
import firebase from 'firebase/app';
import localforage from 'localforage';

const firebaseConfig = {
  apiKey: 'AIzaSyDf9G8VZbcyJ5KSybm0VBLmLthFuvkHrcc',
  authDomain: 'next-firebase-poc.firebaseapp.com',
  projectId: 'next-firebase-poc',
  storageBucket: 'next-firebase-poc.appspot.com',
  messagingSenderId: '73142146303',
  appId: '1:73142146303:web:4090d6f533b1802c7d68ca',
  measurementId: 'G-RLW6DXV66D',
};

const messaging = {
  init: async () => {
    // Initialize the Firebase app with the credentials
    if (!firebase?.apps?.length) firebase?.initializeApp(firebaseConfig);

    try {
      const messaging = firebase.messaging();
      const tokenInLocalForage = await localforage.getItem('fcm_token');

      // Return the token if it is alredy in our local storage
      if (tokenInLocalForage !== null) {
        return tokenInLocalForage;
      }

      // Request the push notification permission from browser
      const status = await Notification.requestPermission();
      if (status && status === 'granted') {
        // Get new token from Firebase
        const fcm_token = await messaging.getToken({
          vapidKey:
            'BDc8b8HfoFBn_pM3GHR0BwGwipbCeOugQCsoUz22s7d0Mchiuvnk-g-j0-Kna6dbmiitur7YlwL_o7ks2-62ZiA',
        });

        // Set token in our local storage
        if (fcm_token) {
          localforage.setItem('fcm_token', fcm_token);
          return fcm_token;
        }
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

if (!firebase?.apps?.length) firebase?.initializeApp(firebaseConfig);

export { messaging, firebase };
