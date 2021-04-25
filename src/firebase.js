import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyCc_f7dkn4rNnHlnaZH1m7me_VPSZ_5bSw",
    authDomain: "dev-community-5d89a.firebaseapp.com",
    projectId: "dev-community-5d89a",
    storageBucket: "dev-community-5d89a.appspot.com",
    messagingSenderId: "465412900248",
    appId: "1:465412900248:web:9ce032141e76c78ff7d7ed",
    measurementId: "G-M62YBDQKEZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;  