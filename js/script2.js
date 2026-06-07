/* DYNAMIC EVENTS STORAGE */

let dynamicEvents = JSON.parse(localStorage.getItem("dynamicEvents")) || [];
const dynamicEventsContainer = document.getElementById("dynamicEvents");

/* REMOVE EXPIRED EVENTS */

function removeExpiredEvents() {
    const today = new Date();

    dynamicEvents = dynamicEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today;
    });

    localStorage.setItem("dynamicEvents", JSON.stringify(dynamicEvents));
}

/* RENDER EVENTS */

function renderDynamicEvents() {

    if (!dynamicEventsContainer) return;

    dynamicEventsContainer.innerHTML = "";

    dynamicEvents.forEach(event => {

        const availableSeats = event.availableSeats ?? parseInt(event.seats);
        const totalSeats = event.totalSeats ?? parseInt(event.seats);
        const isFull = availableSeats <= 0;

        dynamicEventsContainer.innerHTML += `
        <div class="mini-card" data-category="${event.category.toLowerCase()}" onclick='openDetailsModal(${JSON.stringify(event)})'>
            <img src="${event.image}" alt="">
            <div class="overlay"></div>
            <div class="event-badge">
                ${event.category}
            </div>
            <div class="bookmark-btn">☆</div>
            <div class="small-event-content">
                <h3>${event.title}</h3>
                <div class="event-meta">
                    <span>📅 ${event.date}</span>
                    <span>📍 ${event.location}</span>
                </div>

                <div class="card-bottom">
                    <p> Seats Left: ${availableSeats}/${totalSeats} </p>
                    <button class="reserve-btn" ${isFull ? "disabled" : ""} onclick='event.stopPropagation();openRegisterModal(${JSON.stringify(event)})'>
                    ${isFull ? "Event Full" : "Reserve ↗"} </button>
                </div>
            </div>
        </div>
        `;
    });
}

removeExpiredEvents();
renderDynamicEvents();

/* EVENT MODAL : when we click add event button this checks */

const openModalBtn = document.getElementById("openEventModal");
const eventModal = document.getElementById("eventModal");
const closeModal = document.getElementById("closeModal");

if (openModalBtn) {
    openModalBtn.addEventListener("click", () => {
        eventModal.classList.add("show-modal");
    });
}

if (closeModal) {
    closeModal.addEventListener("click", () => {
        eventModal.classList.remove("show-modal");
    });
}

/* CREATE EVENT */

const eventForm = document.getElementById("eventForm");

if (eventForm) {
    eventForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const totalSeats = parseInt(document.getElementById("eventSeats").value);

        const newEvent = {
            id: Date.now(),
            category: document.getElementById("eventCategory").value,
            title: document.getElementById("eventTitle").value,
            date: document.getElementById("eventDate").value,
            description: document.getElementById("eventDescription").value,
            location: document.getElementById("eventLocation").value,
            totalSeats: totalSeats,
            availableSeats: totalSeats,
            image: document.getElementById("eventImage").value
        };

        dynamicEvents.push(newEvent);

        localStorage.setItem("dynamicEvents", JSON.stringify(dynamicEvents));

        renderDynamicEvents();
        showToast("Event Published Successfully","success");

        if (eventModal) {eventModal.classList.remove("show-modal");}
        eventForm.reset();
    });
}

/* SMOOTH ACTIVE NAV */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if (pageYOffset >= sectionTop - 200){
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active-nav");
        if (link.getAttribute("href").includes(current)){
            link.classList.add("active-nav");
        }
    });
});

// change color of grid background on scroll
const discoverSection =
    document.querySelector(".discover-section");

function updateCategoryTheme(category){

    discoverSection.classList.remove(
        "discover-sports",
        "discover-workshop",
        "discover-hackathon",
        "discover-culture",
        "discover-networking"
    );

    if(category === "all") return;

    discoverSection.classList.add(
        `discover-${category}`
    );
}

/* UNIVERSAL FILTER SYSTEM */

const filterButtons = document.querySelectorAll(".filter-btn");

function setupFilters() {

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active-filter");
            });

            button.classList.add("active-filter");
            const filterValue =button.dataset.filter;
            updateCategoryTheme(filterValue);

            /* ALL CARD CONTAINERS */
            const eventsGrid = document.querySelector(".events-grid");
            const bottomEvents = document.querySelector(".bottom-events");
            const dynamicEvents = document.querySelector(".dynamic-events");

            /* FILTER MODE */

            if (filterValue === "all") {
                eventsGrid.classList.remove("filtered-layout");
                bottomEvents.classList.remove("filtered-layout");
                dynamicEvents.classList.remove("filtered-layout");
            }

            else {
                eventsGrid.classList.add("filtered-layout");
                bottomEvents.classList.add("filtered-layout");
                dynamicEvents.classList.add("filtered-layout");
            }

            /* GET ALL CARDS */

            const allCards = document.querySelectorAll(".event-large-card, .small-event-card, .mini-card");

            allCards.forEach(card => {

                const category = card.dataset.category?.toLowerCase();

                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "";
                }else {
                    card.style.display = "none";
                }
            });
        });
    });
}

/* RUN FILTERS */
setupFilters();