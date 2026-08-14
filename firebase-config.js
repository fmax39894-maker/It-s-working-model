"use strict";

/* =========================================
          FIREBASE CONFIGURATION
   ========================================= */

import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


/* =========================================
          YOUR FIREBASE WEB CONFIG
   ========================================= */

const firebaseConfig = {

  apiKey: "AIzaSyBsCLUl3EJoRS7uT79WK41foK4agiDYhw0",
  authDomain: "it-s-working-heart.firebaseapp.com",
  projectId: "it-s-working-heart",
  storageBucket: "it-s-working-heart.firebasestorage.app",
  messagingSenderId: "1057727831456",
  appId: "1:1057727831456:web:269ef039c24e41f4fd18c5",

};


/* =========================================
          INITIALIZE FIREBASE
   ========================================= */

let app;
let db;

try {

  app = initializeApp(
    firebaseConfig
  );

  db = getFirestore(
    app
  );

  console.log(
    "✓ Firebase initialized"
  );

  console.log(
    "✓ Firestore initialized"
  );

} catch(error) {

  console.error(
    "❌ Firebase initialization failed:",
    error
  );

}


/* =========================================
          EXPORT
   ========================================= */

export {
  app,
  db
};