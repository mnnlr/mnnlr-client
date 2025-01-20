import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import {store} from './redux/store'
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </Provider>
      <Toaster
      position="top-center"
      reverseOrder={false} 
      toastOptions={{
        duration: 5000,
        style: {
          background: "#333", 
          color: "#fff",
        },
      }}
    />
    </Router>
  // </React.StrictMode>
);

