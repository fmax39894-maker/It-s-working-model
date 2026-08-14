// ============================================================
// FIREBASE CONFIGURATION
// Working Model of Heart
// ============================================================

import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore
} from
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ============================================================
// 🔥 YOUR FIREBASE CONFIGURATION
// ============================================================

const firebaseConfig = {

    apiKey: "AIzaSyBsCLUl3EJoRS7uT79WK41foK4agiDYhw0",
  authDomain: "it-s-working-heart.firebaseapp.com",
  projectId: "it-s-working-heart",
  storageBucket: "it-s-working-heart.firebasestorage.app",
  messagingSenderId: "1057727831456",
  appId: "1:1057727831456:web:269ef039c24e41f4fd18c5",
  measurementId: "G-FGX2YNYRMD"

};


// ============================================================
// INITIALIZE FIREBASE
// ============================================================

const app = initializeApp(firebaseConfig);


// ============================================================
// FIRESTORE DATABASE
// ============================================================

const db = getFirestore(app);


// ============================================================
// EXPORT
// ============================================================

export {
    app,
    db
};