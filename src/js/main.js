
/*
 * https://firebase.google.com/docs/web/setup
 * https://firebase.google.com/docs/web/module-bundling
 * https://firebase.google.com/docs/database/web/start
 */
console.log('ccssxxxx');

//import all:
import { initializeApp } from 'firebase/app';

import { getDatabase, ref, set, update, push, onValue } from 'firebase/database';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyD9Wra4wPC0Vz21wIi7LJOFEpfwr5oRd1M",
  authDomain: "dt-webadvanced-js.firebaseapp.com",
  databaseURL: "https://dt-webadvanced-js.firebaseio.com",
  projectId: "dt-webadvanced-js",
  storageBucket: "dt-webadvanced-js.appspot.com",
  messagingSenderId: "339163927955"
};
const firebaseApp = initializeApp(config);
const db = getDatabase(firebaseApp);

const st_ref = ref( db, "/students");

console.log(st_ref);

const button = document.getElementById('GetUsers');

button.addEventListener("click", processCall);

function processCall() {

    const st_ref = ref(db, 'students');
    onValue( st_ref, (snapshot) => {
        const data = snapshot.val();
        document.getElementById("Output").innerHTML = JSON.stringify(data) + "sdsd";
        console.log('first email: ', data[Object.keys(data)[0]]['email'])
    });
    console.log('done');

}


const form = document.getElementById('createUser')
form.addEventListener("submit", processSubmit);

async function processSubmit(e) {
  e.preventDefault();
  let jsonObject = {
    first_name: form.first_name.value,
    last_name: form.last_name.value,
    email: form.email.value
  };

  const status_insert = push(ref(db, 'students' ), jsonObject );
  console.log('inserted', status_insert.key);

}
