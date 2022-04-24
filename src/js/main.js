
/*
 * https://firebase.google.com/docs/web/setup
 * https://firebase.google.com/docs/web/module-bundling
 * https://firebase.google.com/docs/database/web/start
 */

console.log('ccssxxxx');

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase,ref, set, onValue, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAgEamajsINgabUXMOcGSGfJPfs7KGRVEQ",
  authDomain: "missed-connections-3574a.firebaseapp.com",
  projectId: "missed-connections-3574a",
  storageBucket: "missed-connections-3574a.appspot.com",
  messagingSenderId: "627787519711",
  appId: "1:627787519711:web:6aa5d8e9b50d20e6dafb6a",
  measurementId: "G-3KBBN7JEFQ",
  databaseURL: "https://missed-connections-3574a-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase(app);

const db_ref = ref( db, "/messages");

const button = document.getElementById('GetSubmissions');

button.addEventListener("click", processCall);

function processCall(e) {
  e.preventDefault();
  const db_ref = ref(db, 'messages');
  onValue( db_ref, (snapshot) => {
    const data = snapshot.val();
    document.getElementById("Output").innerHTML = JSON.stringify(data);
    });
    console.log('done');
}


const form = document.getElementById('createSub');
form.addEventListener("submit", createSubmissions);

async function createSubmissions(username, content) {
  const db = getDatabase();
  const postListRef = ref(db, 'messages');
  const newPostRef = push(postListRef);
  set(newPostRef, {
    username: form.username.value,
    message: form.content.value
  })
  .then(() => {
    console.log("SUCCESS!");
  })
  .catch((error) => {
    console.log("ERROR!");
  });
}
