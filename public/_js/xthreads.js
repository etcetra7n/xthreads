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
    resultBox.innerHTML = `
        <div class="tweet-box">
            <p>
            ${data[0]['tweet']}
            </p>
            <label>1/5</label>
        </div>
        <div class="tweet-connector"></div>
        <div class="tweet-box">
            <p>
            ${data[1]['tweet']}
            </p>
            <label>2/5</label>
        </div>
        <div class="tweet-connector"></div>
        <div class="tweet-box">
            <p>
            ${data[2]['tweet']}
            </p>
            <label>3/5</label>
        </div>
        <div class="tweet-connector"></div>
        <div class="tweet-box">
            <p>
            ${data[3]['tweet']}
            </p>
            <label>4/5</label>
        </div>
        <div class="tweet-connector"></div>
        <div class="tweet-box">
            <p>
            ${data[4]['tweet']}
            </p>
            <label>5/5</label>
        </div>
    `;
}

function generateThread() {
    showLoadingScreen();
    topic = document.getElementById("topic-box").value;
    const url = "https://xthreads.netlify.app/.netlify/functions/generate-thread?topic="+topic;
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
        
}