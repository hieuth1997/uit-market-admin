import firebase from 'firebase/app';
import 'firebase/storage'
var firebaseConfig = {
  apiKey: "AIzaSyC-Su6oHR4td3UCpWIv7IVN0b29zVAPsDw",
  authDomain: "react-uploadimg.firebaseapp.com",
  databaseURL: "https://react-uploadimg.firebaseio.com",
  projectId: "react-uploadimg",
  storageBucket: "react-uploadimg.appspot.com",
  messagingSenderId: "790695813408",
  appId: "1:790695813408:web:23ed553bd50af66a1c3745",
  measurementId: "G-HMNB3M1ZX2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export {
  storage,
  firebase as default 

}