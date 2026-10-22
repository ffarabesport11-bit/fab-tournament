
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const app = initializeApp({
  apiKey: "AIzaSyA22QAbB1zhEed_j0tmffF3mQ9lsOkBcu4",
  authDomain: "fab-tournament-db66d.firebaseapp.com",
  projectId: "fab-tournament-db66d",
  storageBucket: "fab-tournament-db66d.firebasestorage.app",
  messagingSenderId: "35266732679",
  appId: "1:35266732679:web:5fded742f46e41b9d38e22"
});

const auth = getAuth(app);
const db = getFirestore(app);

async function register(name, email, password, uid) {
  const result = await createUserWithEmailAndPassword(
    auth, email.trim(), password
  );

  try {
    await setDoc(doc(db, "players", result.user.uid), {
      displayName: name.trim(),
      email: email.trim(),
      freeFireUid: String(uid).trim(),
      createdAt: serverTimestamp()
    });
  } catch (error) {
    await result.user.delete();
    throw error;
  }

  return result.user;
}

async function login(email, password) {
  const result = await signInWithEmailAndPassword(
    auth, email.trim(), password
  );
  return result.user;
}

async function saveRegistration(data) {
  const user = auth.currentUser;
  if (!user) throw new Error("يجب تسجيل الدخول أولًا.");

  const { addDoc, collection } = await import(
    "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js"
  );

  return addDoc(collection(db, "registrations"), {
    ...data,
    userId: user.uid,
    email: user.email,
    createdAt: serverTimestamp()
  });
}

async function getProfile() {
  const user = auth.currentUser;
  if (!user) return null;

  const result = await getDoc(doc(db, "players", user.uid));
  return result.exists() ? result.data() : null;
}

window.FABFirebase = {
  auth,
  register,
  login,
  logout: () => signOut(auth),
  getProfile,
  saveRegistration,
  onAuthStateChanged: callback => onAuthStateChanged(auth, callback)
};
