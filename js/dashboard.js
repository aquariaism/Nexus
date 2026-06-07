const openDashboard = document.getElementById("openDashboard");
const dashboardModal = document.getElementById("dashboardModal");
const closeDashboard = document.getElementById("closeDashboard");

openDashboard?.addEventListener("click", () => {
    loadDashboard();
    dashboardModal.classList.add("show");
});

closeDashboard?.addEventListener("click", () => {
    dashboardModal.classList.remove("show");
});

function loadDashboard() {

    const dynamicEvents = JSON.parse(localStorage.getItem("dynamicEvents")) || [];

    document.getElementById(
        "totalEvents"
    ).textContent = dynamicEvents.length;

    let registrations = 0;

    dynamicEvents.forEach(event => {

        registrations +=
            event.totalSeats -
            event.availableSeats;
    });

    document.getElementById(
        "totalRegistrations"
    ).textContent = registrations;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingCount = dynamicEvents.filter(event => {
            const eventDate = new Date(event.date);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate >= today;
        }).length;

    document.getElementById(
        "upcomingEvents"
    ).textContent = upcomingCount;

    const eventList =
        document.getElementById(
            "dashboardEventList"
        );

    eventList.innerHTML = "";

    dynamicEvents.forEach(event => {

        const filled =
            event.totalSeats -
            event.availableSeats;

        eventList.innerHTML += `

        <div class="dashboard-event">

            <h4>${event.title}</h4>

            <p>
                ${filled}/${event.totalSeats}
                Registered
            </p>

        </div>
        `;
    });
}
