import { auth } from './firebase-config';

function firebaseLogin(email, pass) {
    return auth.signInWithEmailAndPassword(email, pass)
}

function logout() {
    return auth.signOut();
}

export { firebaseLogin, logout };