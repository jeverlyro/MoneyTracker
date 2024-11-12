// Import the functions you need from the SDKs you need
import {initializeApp, getApp, deleteApp} from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBMnfYEcaeSHHcoW347d8NJhev3dtL5f4M',
  authDomain: 'moneytracker-d9b6e.firebaseapp.com',
  databaseURL:
    'https://moneytracker-d9b6e-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'moneytracker-d9b6e',
  storageBucket: 'moneytracker-d9b6e.firebasestorage.app',
  messagingSenderId: '802617510487',
  appId: '1:802617510487:web:1be5fa65d10845d6a6f112',
  measurementId: 'G-B0JLB0K7PJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default app;
