import firebase from 'firebase/app';
import 'firebase/firebase-storage';
import 'firebase/auth';
const config = {
  apiKey: 'AIzaSyCwKwJfbnlJW_W_LrEhBlb_2d4dnf1sVh4',
  authDomain: 'crowndb-ea5dc.firebaseapp.com',
  projectId: 'crowndb-ea5dc',
  storageBucket: 'crowndb-ea5dc.appspot.com',
  messagingSenderId: '777534354218',
  appId: '1:777534354218:web:ca2910c3c73a7d09e6a453',
  measurementId: 'G-5RKJ90NE1Q',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore;

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
