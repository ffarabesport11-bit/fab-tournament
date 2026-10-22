
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

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
