import { analytics, logEvent } from "/_js/firebase-init.js";
import { getCookie } from "/_js/cookies.js";
const submitBtn = document.getElementById("submit-btn");

const userPicture = getCookie("userPicture");
const userPlan = getCookie("userPlan");
const userID = getCookie("userID");
const firstName = getCookie("userName").trim().split(" ")[0];

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
                <img class="error-icon-svg" src="/_static/error-icon.svg"></svg>
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
function creativitySelect(elem){
    let val = elem.innerHTML;
    if (val=="Medium (default)"){
        val = "default";
    }
    document.getElementById("creativity-level").innerHTML = val;
}
function typeSelect(elem){
    let val = elem.innerHTML;
    if (val=="Educative (defualt)"){
        val = "Educative";
    } else if (val=="Historical"){
        val = "History";
    }
    document.getElementById("type-box").innerHTML = val;
}

window.onload = function() {
    let userPlanLabel = document.getElementById("user-plan-label");
    userPlanLabel.innerHTML = userPlan;

    let tweetNumSelector = document.getElementById("tweet-num");
    if (userPlan == "basic"){
        tweetNumSelector.max=5;
        tweetNumSelector.setAttribute("title", "Basic plan users have a maximum limit of 5 tweets per thread");
    } else if (userPlan == "versatile"){
        tweetNumSelector.max=15;
        tweetNumSelector.setAttribute("title", "Versatile plan users have a maximum limit of 15 tweets per thread");
    } else{
        tweetNumSelector.max=50;
        tweetNumSelector.setAttribute("data-toggle", "");
    }
    
    let typeSelectUL = document.getElementById("type-select-ul");
    if (userPlan == "basic"){
        typeSelectUL.innerHTML = `
        <li><a class="dropdown-item type-select" href="#">Educative (defualt)</a></li>
        `;
    } else if (userPlan == "versatile"){
        typeSelectUL.innerHTML = `
        <li><a class="dropdown-item type-select" href="#">Educative (defualt)</a></li>
        <li><a class="dropdown-item type-select" href="#">Humorous</a></li>
        <li><a class="dropdown-item type-select" href="#">Historical</a></li>
        `; 
    } else{
        typeSelectUL.innerHTML = `
        <li><a class="dropdown-item type-select" href="#">Educative (defualt)</a></li>
        <li><a class="dropdown-item type-select" href="#">Humorous</a></li>
        <li><a class="dropdown-item type-select" href="#">Historical</a></li>
        `;
    }

    let creativityElenents = document.getElementsByClassName("creativity-select");

    for (let i = 0; i < creativityElenents.length; i++) {
        creativityElenents[i].onclick = function() {
            creativitySelect(creativityElenents[i]);
        };
    }
    let typeElenents = document.getElementsByClassName("type-select");

    for (let i = 0; i < typeElenents.length; i++) {
        typeElenents[i].onclick = function() {
            typeSelect(typeElenents[i]);
        };
    }
}


submitBtn.onclick = function() {
    showLoadingScreen();
    const threadTopic = document.getElementById("topic-box").value;
    const tweetNum = document.getElementById("tweet-num").value;
    const creativityLevel = document.getElementById("creativity-level").innerHTML;
    const threadType = document.getElementById("type-box").innerHTML;

    const url = "https://xthreads.netlify.app/.netlify/functions/v2-thread";

    logEvent(analytics, 'generate_v2_thread', {
        value: threadTopic
    });

    // Make a GET request to invoke the function
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "topic": threadTopic,
            "num": tweetNum,
            "creativity": creativityLevel,
            "type": threadType,
            "uid": userID,
        })
      }).then(response => {
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
