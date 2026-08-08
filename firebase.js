import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import { getFirestore } 
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import { getAuth } 
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxGQ09GaiNjfGWuLIgZoapcE8EnV-qJX4",
  authDomain: "story-99788.firebaseapp.com",
  projectId: "story-99788",
  storageBucket: "story-99788.firebasestorage.app",
  messagingSenderId: "128764826759",
  appId: "1:128764826759:web:cc2e944a961b04274d5422",
  measurementId: "G-YQJ0B1EH82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

export const auth = getAuth(app);

