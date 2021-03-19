import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCL1mh7NIp8iNfow1PgSPBkD76Om_XrhB0',
  authDomain: 'team-antheia-capstone.firebaseapp.com',
  projectId: 'team-antheia-capstone',
  storageBucket: 'team-antheia-capstone.appspot.com',
  messagingSenderId: '790939626127',
  appId: '1:790939626127:web:45df9ee2fd8b0732c75efa',
  measurementId: 'G-NF36NH4Y6Y',
};

firebase.initializeApp(firebaseConfig);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();