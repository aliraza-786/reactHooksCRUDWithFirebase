import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyA-8Z-pfu19cTHUuy9PMoNTitZImPd7l_o",
    authDomain: "react-fire-auth-3e367.firebaseapp.com",
    projectId: "react-fire-auth-3e367",
    storageBucket: "react-fire-auth-3e367.appspot.com",
    messagingSenderId: "209099437791",
    appId: "1:209099437791:web:9b5435ebb6df611f9c9b6a"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  // export default fire
  export default fire.database().ref();
  