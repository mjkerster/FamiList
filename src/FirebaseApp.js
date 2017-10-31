import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
//import 'firebase/messaging';

if (typeof firebase === 'undefined') throw new Error('hosting/init-error: Firebase SDK not detected. You must include it before /__/firebase/init.js');

if(!firebase.apps.length){
  firebase.initializeApp({
    "apiKey": "AIzaSyBvomoyVxd9-zKyp8yNCejqshJTuylpddk",
    "databaseURL": "https://familist-cf0b8.firebaseio.com",
    "storageBucket": "familist-cf0b8.appspot.com",
    "authDomain": "familist-cf0b8.firebaseapp.com",
    "messagingSenderId": "306844036484",
    "projectId": "familist-cf0b8"
  },'familist');  
}

export default {
  app: firebase.app('familist'),
  database: firebase.database(firebase.app('familist')),
  auth: firebase.auth(firebase.app('familist')),
  googleAuthProvider: new firebase.auth.GoogleAuthProvider()
}