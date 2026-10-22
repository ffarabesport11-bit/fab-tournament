
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

const firebaseConfig = {
  apiKey: "AIzaSyA22QAbB1zhEed_j0tmffF3mQ9lsOkBcu4",
  authDomain: "fab-tournament-db66d.firebaseapp.com",
  projectId: "fab-tournament-db66d",
  storageBucket: "fab-tournament-db66d.firebasestorage.app",
  messagingSenderId: "35266732679",
  appId: "1:35266732679:web:5fded742f46e41b9d38e22"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// إنشاء حساب لاعب
export async function createPlayerAccount(name, email, password, freeFireUid) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email.trim(),
    password
  );

  await setDoc(doc(db, "players", credential.user.uid), {
    displayName: name.trim(),
    email: email.trim(),
    freeFireUid: String(freeFireUid).trim(),
    createdAt: serverTimestamp()
  });

  return credential.user;
}

// تسجيل الدخول
export async function loginPlayer(email, password) {
  const credential = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    password
  );

  return credential.user;
}

// جلب بيانات اللاعب المسجل
export async function getPlayerProfile() {
  const user = auth.currentUser;
  if (!user) return null;

  const snapshot = await getDoc(doc(db, "players", user.uid));
  return snapshot.exists() ? snapshot.data() : null;
}

// تسجيل الخروج
export async function logoutPlayer() {
  await signOut(auth);
}

// متابعة حالة تسجيل الدخول
export { onAuthStateChanged };
