// ---- Firebase imports ----
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { initializeApp } from "firebase/app";


const firebaseConfig = {

  apiKey: "AIzaSyAzc_xwZkTDI-R4X0VIHFLqnl1bf7LvrMc",

  authDomain: "provenmedia-portal.firebaseapp.com",

  projectId: "provenmedia-portal",

  storageBucket: "provenmedia-portal.firebasestorage.app",

  messagingSenderId: "476187799609",

  appId: "1:476187799609:web:fec193460d21ae4cb49de8"

};


// ---- Initialize ----
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ---- Elements ----
const loginDiv = document.getElementById('login');
const dashboardDiv = document.getElementById('dashboard');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const projectList = document.getElementById('projectList');
const errorP = document.getElementById('error');

// ---- Login ----
loginBtn.addEventListener('click', async () => {
  try {
    const user = await signInWithEmailAndPassword(auth, emailInput.value, passInput.value);
    loginDiv.style.display = 'none';
    dashboardDiv.style.display = 'block';
    document.getElementById('userEmail').textContent = user.user.email;
    loadProjects();
  } catch (error) {
    errorP.textContent = "Login failed. Check your credentials.";
  }
});

// ---- Logout ----
logoutBtn.addEventListener('click', async () => {
  await signOut(auth);
  loginDiv.style.display = 'block';
  dashboardDiv.style.display = 'none';
});

// ---- Load projects ----
async function loadProjects() {
  const querySnapshot = await getDocs(collection(db, "clients"));
  projectList.innerHTML = "";
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const card = document.createElement('div');
    card.innerHTML = `
      <h3>${data.name}</h3>
      <p>Status: ${data.status}</p>
      <p>Deadline: ${data.deadline}</p>
      <p>${data.notes}</p>
      <hr/>
    `;
    projectList.appendChild(card);
  });
}
