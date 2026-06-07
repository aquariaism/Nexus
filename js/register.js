/*EVENT REGISTRATION */
const registerModal = document.getElementById("registerModal");
const closeRegisterModal = document.getElementById("closeRegisterModal");
const registerForm = document.getElementById("registerForm");
const registeredEventsContainer = document.getElementById("registeredEvents");

let selectedEvent = null;

/*OPEN REGISTER MODAL */
function openRegisterModal(eventData) {
    const currentUser = JSON.parse(localStorage.getItem("nexusUser"));

    if (!currentUser) {
        showToast("Please login first.","error");
        return;
    }
    selectedEvent = eventData;
    registerModal.classList.add("show-modal");
}

/* CLOSE MODAL */
if (closeRegisterModal) {
    closeRegisterModal.addEventListener("click", () => {
        registerModal.classList.remove("show-modal");
    });
}

/* REGISTER FORM */
if (registerForm) {

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const currentUser = JSON.parse(localStorage.getItem("nexusUser"));
        if (!currentUser) return;

        const userEventsKey = `registeredEvents_${currentUser.email}`;
        let registeredEvents = JSON.parse(localStorage.getItem(userEventsKey)) || [];

        /* DUPLICATE CHECK */
        const alreadyRegistered =
            registeredEvents.some(event =>
                event.title === selectedEvent.title &&
                event.date === selectedEvent.date
            );

        if (alreadyRegistered) {
            showToast("Already registered for this event.","info");
            return;
        }

        /* REGISTRATION DATA */
        const registrationData = {
            ...selectedEvent,
            studentName: document.getElementById("studentName").value,
            studentEmail: document.getElementById("studentEmail").value,
            studentDepartment: document.getElementById("studentDepartment").value
        };


        /* UPDATE AVAILABLE SEATS */
        let allEvents = JSON.parse(localStorage.getItem("dynamicEvents")) || [];

        const eventIndex = allEvents.findIndex(event =>
                event.id === selectedEvent.id
            );

        if (eventIndex !== -1) {
            if (allEvents[eventIndex].availableSeats <= 0) {
                showToast("Event Full","info");
                return;
            }
            allEvents[eventIndex].availableSeats--;
            localStorage.setItem(
                "dynamicEvents",
                JSON.stringify(allEvents)
            );
        }

        /* STATIC EVENT SEAT UPDATE */
        let seatData = JSON.parse(localStorage.getItem("eventSeats")) || {};
        const currentSeats = seatData[selectedEvent.title] ?? selectedEvent.availableSeats ?? selectedEvent.totalSeats;

        if (currentSeats <= 0) {
            showToast("Event Full","info");
            return;
        }

        seatData[selectedEvent.title] = currentSeats - 1;
        localStorage.setItem("eventSeats", JSON.stringify(seatData));

        /* SAVE */
        registeredEvents.push(registrationData);
        localStorage.setItem( userEventsKey, JSON.stringify(registeredEvents));

        /* REFRESH */
        renderRegisteredEvents();
        registerModal.classList.remove("show-modal");
        registerForm.reset();
        showToast("Event Registered Successfully","success");
        location.reload();
    });
}

/* RENDER REGISTERED EVENTS */

function renderRegisteredEvents() {

    if (!registeredEventsContainer) return;
    const currentUser = JSON.parse(localStorage.getItem("nexusUser"));

    /* NOT LOGGED IN */
    if (!currentUser) {
        registeredEventsContainer.innerHTML = `
        <div class="empty-events">
            <h3>Please login to see your events.</h3>
        </div>
        `;
        return;
    }

    const userEventsKey = `registeredEvents_${currentUser.email}`;
    let registeredEvents = JSON.parse(localStorage.getItem(userEventsKey)) || [];

    /* REMOVE EXPIRED EVENTS */
    const today = new Date();
    registeredEvents = registeredEvents.filter(event => {
        return new Date(event.date) >= today;
    });

    localStorage.setItem( userEventsKey, JSON.stringify(registeredEvents));

    /* EMPTY */
    if (registeredEvents.length === 0) {
        registeredEventsContainer.innerHTML = `
        <div class="empty-events">
            <h3>No registered events yet.</h3>
            <p>
                Explore events and register now.
            </p>
        </div>
        `;
        return;
    }

    /* SHOW EVENTS */
    registeredEventsContainer.innerHTML = "";

    registeredEvents.forEach(event => {
        const seatData = JSON.parse(localStorage.getItem("eventSeats")) || {};

        const seatsLeft = seatData[event.title] ?? event.availableSeats ?? parseInt(event.seats);
        const totalSeats = event.totalSeats ?? parseInt(event.seats);

        registeredEventsContainer.innerHTML += `

        <div class="mini-card" data-category="${event.category.toLowerCase()}">

            <img src="${event.image}" alt="" onerror=" this.src='imgs/default.jpg' ">
            <div class="overlay"></div>
            <div class="event-badge">
                ${event.category}
            </div>

            <div class="small-event-content">
                <h3>${event.title}</h3>
                <div class="event-meta">
                    <span> 📅 ${event.date}</span>
                    <span> 📍 ${event.location}</span>
                </div>
                <div class="card-bottom">
                    <p> Seats Left: ${seatsLeft}/${totalSeats}</p>
                    <button> Registered ✓ </button>
                </div>
            </div>
        </div>
        `;
    });
}

/* INITIALIZE */
renderRegisteredEvents();