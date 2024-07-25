import { getCookie } from "/_js/cookies.js";
const plan = getCookie("userPlan");

window.onload = function() {
    if(plan!=null){
        document.getElementById(`${plan}-label`).innerHTML += `
        <span class="current-label"> (current)</span>`;
    }
}
