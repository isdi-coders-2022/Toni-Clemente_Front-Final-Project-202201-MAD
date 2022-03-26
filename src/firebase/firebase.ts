// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCcszzaY9OW_qUiSRtMhQOsSAx43SeSjZA',
  authDomain: 'fotos-78842.firebaseapp.com',
  projectId: 'fotos-78842',
  storageBucket: 'fotos-78842.appspot.com',
  messagingSenderId: '826513511949',
  appId: '1:826513511949:web:054835c7a08e4491a3e744',
  measurementId: 'G-W83L5G5JGN',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
