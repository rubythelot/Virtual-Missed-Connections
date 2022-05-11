import { getDatabase, ref, set, onValue, push } from "firebase/database";
import { db } from "./main";

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
  onValue(db_ref, (snapshot) => {
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
