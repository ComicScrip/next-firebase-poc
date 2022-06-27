import Head from 'next/head';
import Header from './Header';
import { useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { messaging } from '../services/firebase';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();
  useEffect(() => {
    console.log('cc');
    setToken();

    // Event listener that listens for the push notification event in the background
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('event for the service worker', event);
      });
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      console.log('hello');

      try {
        const token = await messaging.init();
        console.log('hellooooo', token);

        if (token) {
          console.log('token', token);
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  // Handles the click function on the toast showing push notification
  const handleClickPushNotification = (url) => {
    router.push(url);
  };

  // Get the push notification message and triggers a toast to show it
  function getMessage() {
    const messaging = firebase.messaging();
    messaging.onMessage((message) => {
      console.log('onmessage', message);
    });
  }
  return (
    <div className='m-auto max-w-[800px] '>
      <div className='w-full'>
        <Head>
          <title>Order App</title>
          <meta name='description' content='order app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
