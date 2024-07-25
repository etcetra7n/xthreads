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
export { app, analytics, logEvent };
