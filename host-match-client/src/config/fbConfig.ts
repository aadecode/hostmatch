import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


  const firebaseConfig = {
    apiKey: "AIzaSyCaEF3-mGtpc5CBcu1t_Kw2yMM61WDS28Q",
    authDomain: "host-match-aadicode.firebaseapp.com",
    projectId: "host-match-aadicode",
    storageBucket: "host-match-aadicode.appspot.com",
    messagingSenderId: "159189613229",
    appId: "1:159189613229:web:bd2761a2c69b7dce79e424",
    measurementId: "G-C4ETW8SGFE"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.firestore().settings({ timestampsInSnapshots: true });
  firebase.firestore();

export { firebase, firebaseConfig };