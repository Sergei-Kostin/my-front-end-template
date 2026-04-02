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
        

            for (const room of data) {
                document.getElementById("rooms-output").innerHTML +=
                `<li>${room.number} ${room.size} $${room.price}</li>`;
            }
        }
        //getIP()
        getRooms()
