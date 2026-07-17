import admin from 'firebase-admin';
import { env } from './env';

if (!admin.apps.length) {
  if (env.FIREBASE_PROJECT_ID && env.FIREBASE_PRIVATE_KEY && env.FIREBASE_CLIENT_EMAIL) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: env.FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
  } else {
    console.warn('⚠️ Firebase configuration is missing. Initializing with project ID for token verification.');
    admin.initializeApp({ projectId: 'bihardarshan-26916' }); 
  }
}

export const firebaseAdmin = admin;
