function login(){

    const password = document.getElementById("password").value;

    if(password === "admin123"){

        document.getElementById("login-box").style.display = "none";

        document.getElementById("dashboard").style.display = "block";

        loadBookings();

    }
    else{

        alert("Wrong Password");

    }

}

function loadBookings(){

    fetch("/api/bookings")

    .then(res => res.json())

    .then(data => {

        const container = document.getElementById("booking-container");

        container.innerHTML = "";

        data.forEach(booking => {

            container.innerHTML += `

                <div class="booking-card">

                    <h2>${booking.name}</h2>

                    <p><strong>Email:</strong> ${booking.email}</p>

                    <p><strong>Phone:</strong> ${booking.phone}</p>

                    <p><strong>Event Date:</strong> ${booking.eventDate}</p>

                    <p><strong>Event Type:</strong> ${booking.eventType}</p>

                    <p><strong>Guests:</strong> ${booking.guests}</p>

                    <p><strong>Address:</strong> ${booking.address}</p>

                    <p><strong>Rooms Needed:</strong> ${booking.rooms}</p>

                    <p><strong>Room Type:</strong> ${booking.roomType}</p>

                    <p><strong>Requirements:</strong> ${booking.requirements}</p>

                </div>

            `;

        });

    })

    .catch(error => {

        console.log(error);

        alert("Failed to load bookings");

    });

}