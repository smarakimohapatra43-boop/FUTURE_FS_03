fetch("/api/bookings")

.then(res => res.json())

.then(data => {

    console.log(data);

    const container =
    document.getElementById("booking-container");

    data.forEach((booking) => {

        container.innerHTML += `

            <div style="
                border:1px solid #ccc;
                padding:20px;
                margin:20px;
                border-radius:10px;
            ">

                <h3>${booking.name}</h3>

                <p>Email: ${booking.email}</p>

                <p>Phone: ${booking.phone}</p>

                <p>Event: ${booking.eventType}</p>

                <p>Date: ${booking.eventDate}</p>

                <p>Guests: ${booking.guests}</p>

                <p>Rooms: ${booking.rooms}</p>

                <p>Room Type: ${booking.roomType}</p>

                <p>Requirements: ${booking.requirements}</p>

            </div>

        `;

    });

})

.catch((error) => {

    console.log(error);

});