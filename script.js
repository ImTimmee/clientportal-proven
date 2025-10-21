// ---- Import Firebase modules ----
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ---- Firebase config ----
const firebaseConfig = {
  apiKey: "AIzaSyAzc_xwZkTDI-R4X0VIHFLqnl1bf7LvrMc",
  authDomain: "provenmedia-portal.firebaseapp.com",
  projectId: "provenmedia-portal",
  storageBucket: "provenmedia-portal.firebasestorage.app",
  messagingSenderId: "476187799609",
  appId: "1:476187799609:web:fec193460d21ae4cb49de8"
};

// ---- Initialize Firebase ----
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
const userEmail = document.getElementById('userEmail');

// ---- Login ----
loginBtn.addEventListener('click', async () => {
  const email = emailInput.value;
  const password = passInput.value;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    userEmail.textContent = userCredential.user.email;
    loginDiv.style.display = 'none';
    dashboardDiv.style.display = 'block';
    loadProjects();
  } catch (err) {
    errorP.textContent = "Fout bij inloggen: " + err.message;
  }
});

// ---- Logout ----
logoutBtn.addEventListener('click', async () => {
  await signOut(auth);
  loginDiv.style.display = 'block';
  dashboardDiv.style.display = 'none';
  emailInput.value = "";
  passInput.value = "";
});

// ---- Load Firestore data ----
async function loadProjects() {
  projectList.innerHTML = "<p>Projecten laden...</p>";
  try {
    const querySnapshot = await getDocs(collection(db, "clients"));
    projectList.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const card = document.createElement('div');
      card.innerHTML = `
        <div style="background:#111;padding:15px;margin:10px;border-radius:10px;">
          <h3>${data.name}</h3>
          <p>Status: ${data.status}</p>
          <p>Deadline: ${data.deadline}</p>
          <p>${data.notes}</p>
        </div>
      `;
      projectList.appendChild(card);
    });
  } catch (error) {
    projectList.innerHTML = `<p>Fout bij laden: ${error.message}</p>`;
  }
}
