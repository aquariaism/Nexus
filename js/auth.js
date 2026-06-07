/* SIGN UP */
const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", (e) => {

        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const role = document.getElementById("role").value;

        const user = { name, email, password, role };

        /* ALL USERS DATABASE */
        let users =JSON.parse(localStorage.getItem("nexusUsers")) || [];

        /* CHECK EXISTING USER */
        const userExists = users.find(existingUser =>
            existingUser.email === email
        );

        if(userExists){
            showToast("User already exists. Please Sign In.","info");
            return;
        }

        /* SAVE USER */
        users.push(user);
        localStorage.setItem("nexusUsers", JSON.stringify(users));

        /* CURRENT LOGGED IN USER */
        localStorage.setItem( "nexusUser", JSON.stringify(user));
        showToast("Account Created Successfully!","success");
        setTimeout(() => {window.location.href = "index.html";}, 1500);
    });
}

/* SIGN IN */

const signinForm = document.getElementById("signinForm");

if (signinForm) {

    signinForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("signinEmail").value;
        const password = document.getElementById("signinPassword").value;

        /* GET ALL USERS */
        const users = JSON.parse(localStorage.getItem("nexusUsers")) || [];

        /* FIND MATCHING USER */
        const savedUser = users.find(user =>
            user.email === email && user.password === password
        );

        if(savedUser){
            /* LOGIN SESSION */
            localStorage.setItem( "nexusUser", JSON.stringify(savedUser));
            showToast("Sign In Successful!", "success");
            setTimeout(() => {window.location.href = "index.html";}, 1500);
        }
        else{
            showToast("Invalid email or password","error");
        }
    });
}

/* AUTH USER PROFILE*/

const navButtons = document.getElementById("navButtons");
const currentUser = JSON.parse(localStorage.getItem("nexusUser"));

if(navButtons && currentUser){
    const firstLetter = currentUser.name.charAt(0).toUpperCase();

    let hostButton = "";
    /* HOST BUTTON */
    if(currentUser.role === "Event Host"){
        hostButton = `
            <button class="add-event-btn" id="openEventModal"> + Add Event </button>
            <button class="dashboard-btn" id="openDashboard"> Dashboard </button>
        `;
    }

    navButtons.innerHTML = `
        ${hostButton}
        <div class="profile-wrapper">
            <div class="profile-circle">
                ${firstLetter}
            </div>
            <div class="profile-dropdown">
                <p>${currentUser.name}</p>
                <span>${currentUser.role}</span>
                <button id="logoutBtn">Logout</button>
            </div>
        </div>
    `;

    /*EVENT MODAL*/
    const openModalBtn = document.getElementById("openEventModal");
    const eventModal = document.getElementById("eventModal");
    const closeModal = document.getElementById("closeModal");

    if(openModalBtn){
        openModalBtn.addEventListener("click", () => {
            eventModal.classList.add("show-modal");
        });
    }

    if(closeModal){
        closeModal.addEventListener("click", () => {
            eventModal.classList.remove("show-modal");
        });
    }

    /*LOGOUT */
    const logoutBtn = document.getElementById("logoutBtn");

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("nexusUser");
        showToast("Logged out successfully!","success");
        setTimeout(() => {window.location.href = "index.html";}, 1000);
    });
}