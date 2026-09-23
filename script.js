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
  apiKey: "AIzaSyDPQu7aF8DlWWIPh2LZvPup9BjWub8A00Q",
  authDomain: "home-automation-27c75.firebaseapp.com",
  databaseURL: "https://home-automation-27c75-default-rtdb.firebaseio.com",
  projectId: "home-automation-27c75",
  storageBucket: "home-automation-27c75.firebasestorage.app",
  messagingSenderId: "195721038212",
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