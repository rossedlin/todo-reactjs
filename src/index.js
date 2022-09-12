import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

/**
 * Sentry
 */
import * as Sentry from '@sentry/react';
import {BrowserTracing} from '@sentry/tracing';

Sentry.init({
  dsn:              process.env.REACT_APP_SENTRY_DSN,
  integrations:     [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

/**
 * App
 */
import App from './App';

/**
 * Root
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
);

reportWebVitals();
