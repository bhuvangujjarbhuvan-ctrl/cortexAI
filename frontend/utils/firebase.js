// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, browserPopupRedirectResolver } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "cortexi-e5dfc.firebaseapp.com",
    projectId: "cortexi-e5dfc",
    storageBucket: "cortexi-e5dfc.firebasestorage.app",
    messagingSenderId: "850541354583",
    appId: "1:850541354583:web:2585dd313324aed3824d12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export { browserPopupRedirectResolver }