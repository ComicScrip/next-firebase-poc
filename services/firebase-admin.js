import admin from 'firebase-admin';

if (!admin.apps.length)
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
    ),
  });

module.exports.admin = admin;
