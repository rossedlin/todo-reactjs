import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

// App
import App from './App';
// import './App.css';

// Sentry
import * as Sentry from '@sentry/react';
import {BrowserTracing} from '@sentry/tracing';

// Firebase
import {initializeApp} from 'firebase/app';
// import {getAuth, onAuthStateChanged} from 'firebase/auth';

/**
 * Sentry Initialise
 */
Sentry.init({
  dsn:              process.env.REACT_APP_SENTRY_DSN,
  integrations:     [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

/**
 * Firebase Initialise
 */
const firebaseApp = initializeApp({
  apiKey:            process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:        process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.REACT_APP_FIREBASE_APP_ID,
});

// const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });

/**
 * ReactJS Initialise
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App firebaseApp={firebaseApp}/>
  </React.StrictMode>,
);

reportWebVitals();
