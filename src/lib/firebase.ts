import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Solo inicializamos Firebase si la llave existe para evitar crasheos (Error 500)
const hasConfig = !!firebaseConfig.apiKey;
const app = hasConfig ? (getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)) : null;

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
