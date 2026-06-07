const events = [

    {
        category: "CULTURE", title: "Music & Poetry", date: "Dec 18, 2026",
        location: "Innovation Cafe", totalSeats: 90, availableSeats: 90,
        description: "An enchanting evening of music and poetry, where melodies meet verses in a celebration of artistic expression. Join us for a night filled with soulful tunes and captivating words that will stir your emotions and ignite your imagination.",
        image: "imgs/Poetry-Music.jpeg"
    },

    {
        category: "SPORTS", title: "Campus Football League", date: "Aug 23, 2026",
        location: "University Stadium", totalSeats: 30, availableSeats: 30,
        description: "Get ready to cheer on your favorite teams in this exciting campus football league! With intense competition and thrilling matches, it is a great opportunity to showcase your skills and support your fellow students.",
        image: "imgs/football.jpg"
    },

    {
        category: "WORKSHOP", title: "Artificial Intelligence", date: "June 16, 2026",
        location: "Innovation Cafe", totalSeats: 120, availableSeats: 120,
        description: "Join us for an immersive workshop on artificial intelligence, where you will explore the latest advancements and applications of AI in various industries.",
        image: "imgs/workshop3.jpg"
    },

    {
        category: "SPORTS", title: "Cricket League", date: "Aug 25, 2026",
        location: "University Stadium", totalSeats: 50, availableSeats: 50,
        description: "Get ready to cheer on your favorite teams in this exciting cricket league! With intense competition and thrilling matches, it is a great opportunity to showcase your skills and support your fellow students.",
        image: "imgs/cricket.webp"
    },

    {
        category: "HACKATHON", title: "National Hackathon", date: "Dec 16, 2026",
        location: "Tech Hall", totalSeats: 80, availableSeats: 80,
        description: "Join us for the ultimate coding challenge! Participate in our national hackathon and showcase your innovative solutions to real-world problems.",
        image: "imgs/hackathon2.jpeg"
    },

    {
        category: "WORKSHOP", title: "Strategic Workshop", date: "Nov 14, 2026",
        location: "Conference Room", totalSeats: 60, availableSeats: 60,
        description: "Join us for an immersive workshop on strategic thinking, where you will learn how to analyze complex problems, make informed decisions, and develop effective strategies for success.",
        image: "imgs/workshop2.png"
    }

];
let seatData = JSON.parse(localStorage.getItem("eventSeats")) || {};
const designSeats = seatData["Design Systems Workshop"] ?? 40;
const startupSeats = seatData["Startup Mixer"] ?? 80;
const designSeatElement = document.getElementById("designSeats");
const startupSeatElement = document.getElementById("startupSeats");

if (designSeatElement) {
    designSeatElement.textContent = `Seats Left: ${designSeats}/40`;
}
if (startupSeatElement) {
    startupSeatElement.textContent = `Seats Left: ${startupSeats}/80`;
}
const bottomEvents = document.getElementById("bottomEvents");

events.forEach(event => {
    const seatsLeft = seatData[event.title] ?? event.availableSeats;
    bottomEvents.innerHTML += `

    <div class="mini-card" data-category="${event.category.toLowerCase()}" onclick='openDetailsModal(${JSON.stringify(event)})'>
        <img src="${event.image}" alt="">
        <div class="overlay"></div>
        <div class="event-badge"> ${event.category}</div>
        <div class="bookmark-btn">☆</div>
        <div class="small-event-content">
            <h3>${event.title}</h3>
            <div class="event-meta">
                <span>📅 ${event.date}</span>
                <span>📍 ${event.location}</span>
            </div>
            <div class="card-bottom">
                <p> Seats Left: ${seatsLeft}/${event.totalSeats} </p>
                <button class="reserve-btn" onclick='event.stopPropagation();openRegisterModal(${JSON.stringify(event)})'> Reserve ↗ </button>
            </div>
        </div>
    </div>
    `;
});

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        mobileMenu.classList.toggle("show");
    });
}

document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("show");
        });
    });


// event_details modal

function openDetailsModal(event) {
    document.getElementById("eventDetailsModal").classList.add("show");
    document.getElementById("detailImage").src = event.image;
    document.getElementById("detailTitle").textContent = event.title;
    document.getElementById("detailDescription").textContent = event.description || "No description available.";
    document.getElementById("detailDate").textContent = event.date;
    document.getElementById("detailLocation").textContent = event.location;
    // document.getElementById("detailSeats").textContent = event.availableSeats || event.totalSeats;
    let seatData = JSON.parse(localStorage.getItem("eventSeats")) || {};
    const seatsLeft = seatData[event.title] ?? event.availableSeats ?? event.totalSeats;
    document.getElementById("detailSeats").textContent = `Seats Left: ${seatsLeft}/${event  .totalSeats}`;
    document.getElementById("detailRegisterBtn").onclick = () => {
        document.getElementById("eventDetailsModal").classList.remove("show");
        openRegisterModal(event);
    };
}

document.getElementById("closeDetailsModal").addEventListener("click", () => {
    document.getElementById("eventDetailsModal").classList.remove("show");
});


// home img slide

const heroSlider =
    document.getElementById("heroSlider");

const heroImages = [

    "imgs/uni.jpg",

    "imgs/uni2.jpg",

    "imgs/uni3.jpeg"
];

let currentSlide = 0;

setInterval(() => {

    currentSlide++;

    if(currentSlide >= heroImages.length){

        currentSlide = 0;
    }

    heroSlider.style.opacity = 0;

    setTimeout(() => {

        heroSlider.src =
            heroImages[currentSlide];

        heroSlider.style.opacity = 1;

    }, 400);

}, 2500);