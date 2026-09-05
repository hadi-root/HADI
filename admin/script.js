
// ================================
// FIREBASE IMPORTS
// ================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// ================================
// FIREBASE CONFIG
// ================================

const firebaseConfig = {
    apiKey: "AIzaSyBUBGAWZ7sdQ8rnyMN9uhng9P6InAjnzYs",
    authDomain: "hadi-portfolio-236ef.firebaseapp.com",
    projectId: "hadi-portfolio-236ef",
    storageBucket: "hadi-portfolio-236ef.firebasestorage.app",
    messagingSenderId: "417673820671",
    appId: "1:417673820671:web:f798cf24a9394135b44fca",
    measurementId: "G-BLQ6T6J3FG"
};


// ================================
// INITIALIZE FIREBASE
// ================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);


// ================================
// ADMIN UID
// ================================

const ADMIN_UID = "vxqEEYTcZMUvJ6kSuuS57IQ6Noo1";


// ================================
// ELEMENTS
// ================================

const loginScreen = document.getElementById("loginScreen");
const dashboard = document.getElementById("dashboard");

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const loginButton = document.getElementById("loginButton");
const loginMessage = document.getElementById("loginMessage");

const siteNameInput = document.getElementById("siteName");
const siteEnabledInput = document.getElementById("siteEnabled");

const saveButton = document.getElementById("saveButton");
const saveMessage = document.getElementById("saveMessage");

const logoutButton = document.getElementById("logoutButton");


// ================================
// SHOW LOGIN
// ================================

function showLogin() {
    loginScreen.classList.remove("hidden");
    dashboard.classList.add("hidden");
}


// ================================
// SHOW DASHBOARD
// ================================

function showDashboard() {
    loginScreen.classList.add("hidden");
    dashboard.classList.remove("hidden");
}


// ================================
// AUTH STATE
// ================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        showLogin();
        return;
    }

    // Make sure only your admin account can use the dashboard
    if (user.uid !== ADMIN_UID) {

        await signOut(auth);

        loginMessage.textContent =
            "Access denied. This account is not an admin account.";

        showLogin();

        return;
    }

    showDashboard();

    await loadSiteConfig();
});


// ================================
// LOGIN
// ================================

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {

        loginMessage.textContent =
            "Please enter your email and password.";

        return;
    }

    loginButton.disabled = true;
    loginButton.textContent = "Signing in...";
    loginMessage.textContent = "";

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        loginMessage.textContent = "";

    } catch (error) {

        console.error(error);

        if (error.code === "auth/invalid-credential") {

            loginMessage.textContent =
                "Incorrect email or password.";

        } else if (error.code === "auth/too-many-requests") {

            loginMessage.textContent =
                "Too many attempts. Please try again later.";

        } else {

            loginMessage.textContent =
                "Login failed. Please check your details.";

        }
    }

    loginButton.disabled = false;
    loginButton.textContent = "Login";
});


// ================================
// LOAD WEBSITE CONFIG
// ================================

async function loadSiteConfig() {

    try {

        const configRef = doc(db, "site", "config");

        const configSnapshot = await getDoc(configRef);

        if (!configSnapshot.exists()) {

            saveMessage.textContent =
                "Website configuration does not exist yet.";

            return;
        }

        const data = configSnapshot.data();

        siteNameInput.value =
            data.siteName || "HADI";

        siteEnabledInput.checked =
            data.siteEnabled === true;

    } catch (error) {

        console.error(error);

        saveMessage.textContent =
            "Could not load website settings.";
    }
}


// ================================
// SAVE WEBSITE CONFIG
// ================================

saveButton.addEventListener("click", async () => {

    const siteName =
        siteNameInput.value.trim();

    const siteEnabled =
        siteEnabledInput.checked;

    if (!siteName) {

        saveMessage.textContent =
            "Website name cannot be empty.";

        return;
    }

    saveButton.disabled = true;
    saveButton.textContent = "Saving...";
    saveMessage.textContent = "";

    try {

        const configRef =
            doc(db, "site", "config");

        await setDoc(
            configRef,
            {
                siteName: siteName,
                siteEnabled: siteEnabled
            },
            {
                merge: true
            }
        );

        saveMessage.textContent =
            "Changes saved successfully.";

    } catch (error) {

        console.error(error);

        saveMessage.textContent =
            "Could not save changes.";
    }

    saveButton.disabled = false;
    saveButton.textContent = "Save Changes";
});


// ================================
// LOGOUT
// ================================

logoutButton.addEventListener("click", async () => {

    try {

        await signOut(auth);

    } catch (error) {

        console.error(error);

        loginMessage.textContent =
            "Could not log out.";
    }
});