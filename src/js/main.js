
/*
 * https://firebase.google.com/docs/web/setup
 * https://firebase.google.com/docs/web/module-bundling
 * https://firebase.google.com/docs/database/web/start
 */

console.log('js is loading');

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase,ref } from "firebase/database";
import { firebaseConfig } from "./firebaseConfig";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase(app);

const db_ref = ref( db, "/messages");

// Function to hide signature
const switchbutton = document.getElementById('seeSignature');
switchbutton.addEventListener('click', switchPage);
let x = document.getElementById("signature");

function switchPage(e) {
  e.preventDefault();
  if(x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// Function to get location

const IPbutton = document.getElementById('getLocation');
IPbutton.addEventListener('click', getUserIP);

function getUserIP(e) {
  e.preventDefault();
  let apiKey = process.env.IP_apiKey;
  // Make the request
  fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=' + apiKey)

    // Extract JSON body content from HTTP response
    .then(function(response) {
      return response.json();
    })

    // Add request content to output box
    .then(function(data) {
      document.getElementById("locationOutput").innerHTML = (data.ip_adress + " from " + data.country);
    })
    .catch(error => {
      console.log(error);
    });
}
