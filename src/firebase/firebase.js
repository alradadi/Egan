import * as firebase from 'firebase';

const prodConfig = {
    apiKey: 'AIzaSyB-1EH1-D_Xg9PTH9fQDh6pXtKJcHz6c6Y',
    authDomain: 'egan-14006.firebaseapp.com',
    databaseURL: 'https://egan-14006.firebaseio.com',
    projectId: 'egan-14006',
    storageBucket: 'egan-14006.appspot.com',
    messagingSenderId: '643283587851'
};

const devConfig = {
    apiKey: 'AIzaSyB-1EH1-D_Xg9PTH9fQDh6pXtKJcHz6c6Y',
    authDomain: 'egan-14006.firebaseapp.com',
    databaseURL: 'https://egan-14006.firebaseio.com',
    projectId: 'egan-14006',
    storageBucket: 'egan-14006.appspot.com',
    messagingSenderId: '643283587851'
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
