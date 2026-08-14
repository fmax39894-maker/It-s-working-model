"use strict";

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const firebaseConfig = {

    apiKey: "AIzaSyDdYdMXyUU52kvja7a8jE3-8Bh1ahY3sjU",
  authDomain: "working-heart.firebaseapp.com",
  projectId: "working-heart",
  storageBucket: "working-heart.firebasestorage.app",
  messagingSenderId: "583684499453",
  appId: "1:583684499453:web:228153929c4abdb4711b94",

};


const app =
    initializeApp(firebaseConfig);


const db =
    getFirestore(app);


console.log("✓ Firebase initialized");
console.log("✓ Firestore initialized");


export {
    app,
    db
};