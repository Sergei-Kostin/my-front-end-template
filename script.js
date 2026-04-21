const API_URL = "http://127.0.0.1:8080/api";

async function getGuests() {
    const res = await fetch(`${API_URL}/guests`);
    const data = await res.json();
    const guests = data.hotel_guests ? data.hotel_guests : data;
    const guestSelect = document.getElementById("guest-select");

    guestSelect.innerHTML = "";
    for (const guest of guests) {
        guestSelect.innerHTML += `
            <option value="${guest.id}">
                ${guest.firstname} ${guest.lastname} (${guest.previous_visits} visits)
            </option>
        `;
    }
}

async function getRooms() {
    const res = await fetch(`${API_URL}/rooms`);
    const data = await res.json();
    const rooms = data.hotel_rooms ? data.hotel_rooms : data;
    const roomList = document.getElementById("rooms-output");
    const roomSelect = document.getElementById("room-select");

    roomList.innerHTML = "";
    roomSelect.innerHTML = "";

    for (const room of rooms) {
        roomList.innerHTML += `
            <li>
                Room ${room.room_number} - ${room.room_type} - ${room.price} EUR
            </li>
        `;
        roomSelect.innerHTML += `
            <option value="${room.id}">
                ${room.room_number} - ${room.room_type} - ${room.price} EUR
            </option>
        `;
    }
}

async function getBookings() {
    const res = await fetch(`${API_URL}/bookings`);
    const data = await res.json();
    const bookings = data.hotel_bookings ? data.hotel_bookings : data;
    const bookingsList = document.getElementById("bookings-output");

    bookingsList.innerHTML = "";
    for (const booking of bookings) {
        const infoText = booking.info || booking.addinfo || "";
        bookingsList.innerHTML += `
            <li>
                Room ${booking.room_number} - ${booking.guest_name} - ${booking.datefrom} to ${booking.dateto}
                (${booking.nights} nights, ${booking.total_price} EUR) ${infoText}
            </li>
        `;
    }
}

async function saveBooking() {
    const booking = {
        guest_id: document.getElementById("guest-select").value,
        room_id: document.getElementById("room-select").value,
        datefrom: document.getElementById("check-in-date").value,
        dateto: document.getElementById("check-out-date").value,
        info: document.getElementById("additional-info").value
    };

    const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
    });

    if (!res.ok) {
        alert("Booking failed.");
        return;
    }

    document.getElementById("additional-info").value = "";
    alert("Booking successful!");
    getBookings();
}

document.getElementById("submit-button").addEventListener("click", saveBooking);

getGuests();
getRooms();
getBookings();
