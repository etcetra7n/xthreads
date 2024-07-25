import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js';
import { getAnalytics, logEvent } from'https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js';

const firebaseConfig = {
  apiKey: "AIzaSyBTWRBRhyRsqhYPmkeaAS67eWKmnop3hdg",
  authDomain: "xthreadspro.firebaseapp.com",
  projectId: "xthreadspro",
  storageBucket: "xthreadspro.appspot.com",
  messagingSenderId: "566833473201",
  appId: "1:566833473201:web:86b84622321f0a983fa490",
  measurementId: "G-FPLFBBCDJN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const submitBtn = document.getElementById("tick-mark-icon");

function showLoadingScreen() {
    let resultBox = document.getElementById("result-box");
    resultBox.innerHTML = `
        <div id="result-status-screen">
            <div class="loading-animation"></div>
            <div id="status-msg"><p>Generating thread...</p></div>
        </div>
    `
}
function displayNoResults() {
    let resultBox = document.getElementById("result-box");
    resultBox.innerHTML = `
        <div id="result-status-screen">
            <div class="error-icon">
                <img class="error-icon-svg" src="_static/error-icon.svg"></svg>
            </div>
            <div id="status-msg"><p>Oops... There was an error. Please try again</p></div>
        </div>
    `
}
function displayResults(data) {
    let resultBox = document.getElementById("result-box");
    resultBox.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      resultBox.innerHTML += `
        <div class="tweet-box">
            <p>
            ${data[i]['tweet']}
            </p>
            <label>${i+1}/${data.length}</label>
        </div>
        `;
        if (i != data.length-1){
            resultBox.innerHTML += `
            <div class="tweet-connector"></div>
            `;
        }
        
    }
}

submitBtn.onclick = function() {
    showLoadingScreen();
    const topic = document.getElementById("topic-box").value;
    const url = "https://xthreads.netlify.app/.netlify/functions/generateThread?topic="+topic;

    logEvent(analytics, 'generate_thread', {
        value: topic
    });

    // Make a GET request to invoke the function
    fetch(url)
        .then(response => {
            if (!response.ok) {
                displayNoResults();
            }
            return response.json();
        })
        .then(data => {
            if (data != null){
                displayResults(data);
            } else {
                displayNoResults();
            }
        })
        .catch(error => {
            displayNoResults();
            console.error('There was a problem with the fetch operation:', error);
        });
        
};
