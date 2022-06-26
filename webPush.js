import 'firebase/messaging';
import firebase from 'firebase/app';

const firebaseCloudMessaging = {
  init: async function () {
    if (!firebase.apps.length)
      firebase.initializeApp({
        apiKey: 'AIzaSyDf9G8VZbcyJ5KSybm0VBLmLthFuvkHrcc',
        authDomain: 'next-firebase-poc.firebaseapp.com',
        projectId: 'next-firebase-poc',
        storageBucket: 'next-firebase-poc.appspot.com',
        messagingSenderId: '73142146303',
        appId: '1:73142146303:web:4090d6f533b1802c7d68ca',
        measurementId: 'G-RLW6DXV66D',
      });

    try {
      const messaging = firebase.messaging();
      const vapidKey =
        'BDc8b8HfoFBn_pM3GHR0BwGwipbCeOugQCsoUz22s7d0Mchiuvnk-g-j0-Kna6dbmiitur7YlwL_o7ks2-62ZiA';
      await Notification.requestPermission();
      const token = await messaging.getToken({ vapidKey });
      console.log('fcm_token', token);
      return messaging;
    } catch (error) {
      console.error(error);
    }
  },
};

export { firebaseCloudMessaging };
