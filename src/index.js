import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';
import App from './App';


// Create a root instance
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
