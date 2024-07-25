import { analytics, logEvent } from "/_js/firebase-init.js";
import { getCookie } from "/_js/cookies.js";

const userPicture = getCookie("userPicture");
const userID = getCookie("userID");
const firstName = getCookie("userName").trim().split(" ")[0];

const loggedIn = (userID!="")||(userID!=null);

window.onload = function() {
    if (loggedIn){
        let navDesig = document.getElementById("nav-designator");
        navDesig.innerHTML = `
        <div class="dropdown">
          <button id="profile" class="btn btn-secondary dropdown-toggle prompt-btns" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="${userPicture}" alt="profile picture">
              <span>${firstName}</span>
          </button>
          <ul class="dropdown-menu" aria-labelledby="profile">
            <li><a class="dropdown-item" href="/dashboard">Dashboard</a></li>
          </ul>
        </div>`;
    }
}
