import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

// App
import App from './App';
import './App.css';

// Firebase
import {initializeApp} from 'firebase/app';

/**
 * Firebase Initialise
 */
const firebaseApp = initializeApp({
  apiKey:            'AIzaSyDjbvUgu2NAiwOecBZBCg94Owms5Ih-7y0',
  authDomain:        'todo-reactjs-251dd.firebaseapp.com',
  projectId:         'todo-reactjs-251dd',
  storageBucket:     'todo-reactjs-251dd.appspot.com',
  messagingSenderId: '527798534811',
  appId:             '1:527798534811:web:f00ea28a23c8a2d5223c3e',
});

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
