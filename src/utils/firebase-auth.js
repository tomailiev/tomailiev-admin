import { auth } from './firebase-config';

function login(email, pass) {
    return auth.signInWithEmailAndPassword(email, pass)
}

function logout() {
    return auth.signOut();
}

export { login, logout };