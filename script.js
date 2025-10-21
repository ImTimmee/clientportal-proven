// ---- Firebase imports ----
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  query, 
  where 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
  const email = emailInput.value.trim();
  const password = passInput.value.trim();

  if (!email || !password) {
    errorP.textContent = "Vul je e-mailadres en wachtwoord in.";
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    userEmail.textContent = user.email;

    // UI update
    loginDiv.style.display = 'none';
    dashboardDiv.style.display = 'block';

    // Laad projecten
    await loadProjects(user.email);
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
  projectList.innerHTML = "";
});

// ---- Load projects for logged-in user ----
async function loadProjects(userEmailAddress) {
  projectList.innerHTML = "<p>Projecten laden...</p>";

  try {
    const q = query(collection(db, "clients"), where("email", "==", userEmailAddress));
    const querySnapshot = await getDocs(q);

    projectList.innerHTML = "";
    if (querySnapshot.empty) {
      projectList.innerHTML = "<p>Er zijn nog geen projecten gekoppeld aan jouw account.</p>";
      return;
    }

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const card = document.createElement('div');
      card.innerHTML = `
        <div style="background:#111;padding:15px;margin:10px;border-radius:10px;line-height:1.5;">
          <h3 style="color:#00c2ff;">${data.Name}</h3>
          <p><strong>Service:</strong> ${data.Service}</p>
          <p><strong>Status:</strong> ${data.Status}</p>
          <p><strong>Deadline:</strong> ${data.Deadline}</p>
        </div>
      `;
      projectList.appendChild(card);
    });
  } catch (error) {
    projectList.innerHTML = `<p>Fout bij laden: ${error.message}</p>`;
  }
}
