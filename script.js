import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
getDatabase,
ref,
onValue,
set
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAchJb9qw8VWmY1BMTHyYpMfIKnCn0iaNI",
  authDomain: "remote-control123.firebaseapp.com",
  databaseURL: "https://remote-control123-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "remote-control123",
  storageBucket: "remote-control123.firebasestorage.app",
  messagingSenderId: "789123423407",
  appId: "1:195721038212:web:733ac144fca4caf89f75d1"
};


// =====================================
// INITIALIZE FIREBASE
// =====================================

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

// =====================================
// RELAY DATABASE REFERENCE
// =====================================

const relaysRef = ref(database, "relays");

// =====================================
// READ RELAY STATES IN REAL TIME
// =====================================

onValue(
relaysRef,

(snapshot) => {

    const data = snapshot.val() || {};

    for (let i = 1; i <= 4; i++) {

        const relayState =
            data["relay" + i] === true;

        updateUI(i, relayState);
    }

    document.getElementById("connection").textContent =
        "● Firebase Connected";

    document.getElementById("connection").style.background =
        "#087f5b";
},

(error) => {

    console.error(
        "Firebase error:",
        error
    );

    document.getElementById("connection").textContent =
        "● Connection Error";

    document.getElementById("connection").style.background =
        "#c62828";
}


);

// =====================================
// TOGGLE RELAY
// =====================================

window.toggleRelay = function(relayNumber) {

const button =
    document.getElementById(
        "button" + relayNumber
    );

const currentlyOn =
    button.classList.contains("on");

const newState = !currentlyOn;

const relayRef =
    ref(
        database,
        "relays/relay" + relayNumber
    );

set(relayRef, newState)

    .then(() => {

        console.log(
            "Relay " +
            relayNumber +
            " = " +
            newState
        );

    })

    .catch((error) => {

        console.error(
            "Failed to update relay:",
            error
        );

    });


};

// =====================================
// UPDATE WEB UI
// =====================================

function updateUI(relayNumber, state) {

const button =
    document.getElementById(
        "button" + relayNumber
    );

const status =
    document.getElementById(
        "status" + relayNumber
    );


if (state === true) {

    status.textContent = "ON";

    status.className =
        "status on";

    button.textContent =
        "Turn OFF";

    button.className =
        "on";

} else {

    status.textContent = "OFF";

    status.className =
        "status off";

    button.textContent =
        "Turn ON";

    button.className =
        "off";
}


}
