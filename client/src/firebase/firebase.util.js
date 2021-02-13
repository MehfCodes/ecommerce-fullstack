import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const userProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.collection('users').doc(userAuth.uid);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    // console.log(displayName);

    try {
      await userRef.set({
        displayName,
        email,
        createdAt: Date.now(),
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export default firebase;
