
/*
 * https://firebase.google.com/docs/web/setup
 * https://firebase.google.com/docs/web/module-bundling
 * https://firebase.google.com/docs/database/web/start
 */

console.log('js is loading');

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase,ref, set, onValue, push } from "firebase/database";

// Import the dependencies for 3js

import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

// Configuration details for Firebase
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

// Get submissions button
const button = document.getElementById('getSubmissions');
button.addEventListener("click", processCall);

// Function to generate a random number
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Function to retrieve a random submission from the database
function processCall(e) {
  e.preventDefault();
  const db_ref = ref(db, 'messages');
  onValue( db_ref, (snapshot) => {
    const data = snapshot.val();
    let keys = Object.keys(data); 
    let len = keys.length; // count of messages submitted
    let arr = []; // initiating the array that holds the submission ids
    let message_num = getRandomInt(len); // generate random number of retrieved submission

    // add all keys to array
    for (var i in data) {
      arr.push(i);      
    }
    // add the retrieved message to the HTML
    let db_key = arr[message_num];
    document.getElementById("Output").innerHTML = "<p>" + data[db_key].message + "</p> <p> - " + data[db_key].username + "</p>";
    })
  .catch(() => {
    console.log('ERROR!');
  });
}

// Get publishing button
const form = document.getElementById('createSubmissionsForm');
form.addEventListener('submit', createSubmissions);

// Function to create / write new messages into the database
async function createSubmissions(e) {
  e.preventDefault();
  const db = getDatabase();
  const postListRef = ref(db, 'messages');
  const newPostRef = push(postListRef);
  set(newPostRef, {
    username: form.username.value,
    message: form.content.value
  })
  .catch((error) => {
    console.log("ERROR!");
  });

}

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

// Three JS elements

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer =  new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(75);
camera.position.setX(25);
camera.position.setY(150);

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(20,20,20);
scene.add(pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(400,50);

scene.add(gridHelper);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);


function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x +=0.01;
  torus.rotation.y +=0.005;
  torus.rotation.z +=0.01;
  
  controls.update();
  renderer.setClearColor( 0xffffff );
  renderer.render( scene, camera );


};

animate();