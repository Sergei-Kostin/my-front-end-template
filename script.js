    // //const API_URL = "http://127.0.0.1:8080/api/ip";
    //     const API_URL = "https://gg-team-repo-git-web-communication-and-databases-1.2.rahtiapp.fi/api/ip";
    //     async function getIP(){
    //         const res = await fetch(API_URL);
    //         const data = await res.text();
    //         document.getElementById("ip-output").textContent = data;
    //     }

        //const Hotel_Api_URL = "https://gg-team-repo-git-web-communication-and-databases-1.2.rahtiapp.fi/api/rooms";
        const Api_URL = "http://127.0.0.1:8080/api/rooms";
        async function getRooms(){
            const res = await fetch(Api_URL);
            const data = await res.json();
            const rooms = data.hotel_rooms ? data.hotel_rooms : data;

            for (const room of rooms) {
                document.getElementById("rooms-output").innerHTML +=
                `<li>${room.room_number} ${room.room_type} $${room.price}</li>`;
            }
        }
        //getIP()
        getRooms()

        document.getElementById("submit-button").addEventListener("click", async () => {
            const checkInDate = document.getElementById("check-in-date").value;
            const checkOutDate = document.getElementById("check-out-date").value;
            const additionalInfo = document.getElementById("additional-info").value;
            const selectedRoomId = document.getElementById("room-select").value;



            const response = await fetch("http://127.0.0.1:8080/api/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "guest_id": 1,
                    "room_id": selectedRoomId,
                    "datefrom": checkInDate,
                    "dateto": checkOutDate,
                    "addinfo": additionalInfo
                })
            });

            if (response.ok) {
                alert("Booking successful!");
            } else {
                alert("Booking failed.");
            }
        });

        async function getBookings() {
            document.getElementById("bookings-output").innerHTML = "";
            const bookings = await fetch("http://127.0.0.1:8080/api/bookings");
            const bookingsData = await bookings.json();
            const bookingsList = bookingsData.hotel_bookings ? bookingsData.hotel_bookings : bookingsData;

            for (const booking of bookingsList) {
                document.getElementById("bookings-output").innerHTML +=
                    `<li>Room ${booking.room_id} booked from ${booking.datefrom} to ${booking.dateto}. Additional info: ${booking.addinfo}</li>`;
            }
        }
        getBookings();
