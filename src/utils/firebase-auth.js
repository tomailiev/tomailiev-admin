import { auth } from './firebase-config';

function firebaseLogin(email, pass) {
    return auth.signInWithEmailAndPassword(email, pass)
}

function firebaseLogout() {
    return auth.signOut();
}

export { firebaseLogin, firebaseLogout };