// ============================================================
// FIREBASE CONFIGURATION
// ============================================================

import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ============================================================
// YOUR FIREBASE CONFIG
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

const auth = getAuth(app);

const db = getFirestore(app);


// ============================================================
// FIRESTORE COLLECTION
// ============================================================

const MEDIA_COLLECTION = "media";


// ============================================================
// GET MEDIA
// ============================================================

async function getMedia() {

  const q = query(
    collection(db, MEDIA_COLLECTION),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  const media = [];

  snapshot.forEach((item) => {

    media.push({
      id: item.id,
      ...item.data()
    });

  });

  return media;
}


// ============================================================
// ADD MEDIA LINK
// ============================================================

async function addMedia(name, type, url) {

  if (!name || !type || !url) {
    throw new Error("Missing media information.");
  }

  return await addDoc(
    collection(db, MEDIA_COLLECTION),
    {
      name: name.trim(),
      type: type,
      url: url.trim(),
      createdAt: serverTimestamp()
    }
  );
}


// ============================================================
// DELETE MEDIA
// ============================================================

async function removeMedia(id) {

  if (!id) {
    throw new Error("Invalid media ID.");
  }

  await deleteDoc(
    doc(db, MEDIA_COLLECTION, id)
  );
}


// ============================================================
// LOGIN
// ============================================================

async function loginAdmin(email, password) {

  return await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
}


// ============================================================
// LOGOUT
// ============================================================

async function logoutAdmin() {

  await signOut(auth);

}


// ============================================================
// AUTH STATE
// ============================================================

function watchAuth(callback) {

  return onAuthStateChanged(
    auth,
    callback
  );

}


// ============================================================
// EXPORT
// ============================================================

export {

  app,
  auth,
  db,

  getMedia,
  addMedia,
  removeMedia,

  loginAdmin,
  logoutAdmin,

  watchAuth

};