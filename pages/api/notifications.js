import '../../services/firebase-admin';
import { getMessaging } from 'firebase-admin/messaging';

export default async function handle(req, res) {
  if (req.method !== 'POST') return res.status(405).send();

  const { token, title, body } = req.body;

  const link = process.env.VERCEL_URL || 'http://localhost:3000';
  const notification = {
    title,
    body,
  };
  const webpush = {
    fcm_options: { link },
    headers: { TTL: '4500' },
    notification: {
      requireInteraction: true,
      icon: 'https://cdn-icons-png.flaticon.com/512/633/633816.png',
    },
  };
  const android = { priority: 'high', ttl: 4500 };
  const apns = {
    headers: {
      'apns-expiration': '1604750400',
    },
  };

  try {
    const response = await getMessaging().send({
      token,
      notification,
      apns,
      android,
      webpush,
    });
    console.log(`Successfully sent message to ${token}\n\n`, response);
    res.send('ok');
  } catch (error) {
    console.log('Error sending message:', error);
    res.status(500).send();
  }
}
