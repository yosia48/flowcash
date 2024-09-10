// js/firebase-config.js

// Konfigurasi Firebase Anda
const firebaseConfig = {
	  apiKey: "AIzaSyDyIsMEt9u09VysJEu_Lt7LyDuWFQXTg_M",
	  authDomain: "hcy-cyber.firebaseapp.com",
	  databaseURL: "https://hcy-cyber.firebaseio.com",
	  projectId: "hcy-cyber",
	  storageBucket: "hcy-cyber.appspot.com",
	  messagingSenderId: "250135461026",
	  appId: "1:250135461026:web:0be21f97335de649c36bfb"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Inisialisasi Firestore
const db = firebase.firestore();
