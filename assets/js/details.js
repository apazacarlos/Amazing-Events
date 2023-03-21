async function getEventsData() {
    try {
        let response = await fetch("https://mindhub-xj03.onrender.com/api/amazing");
        let data = await response.json();
        
        let query = location.search;
        let parameters = new URLSearchParams(query)
        let id = parameters.get("id")
        let eventCard = data.events.find(card => card._id == id);
    
        //armo la carta
        let container = document.getElementById("details");
        let cardEvents = `<div class="col-md-4 border p-4 details-carta">
        <img src="${eventCard.image}" class="rounded shadow-lg imagen-details" alt="${eventCard.name}">
        </div>
        <div class="col-md-8 border p-4 details-carta">
        <div class="card-body">
            <h5 class="card-title display-6 ">${eventCard.name}</h5>
            <p class="card-text "> Date: ${eventCard.date}</p>
            <p class="card-text ">${eventCard.description}</p>
            <p class="card-text ">Place: ${eventCard.place}</p>
            <p class="card-text ">Capacity: ${eventCard.capacity}</p>
            <p class="card-text ">$${eventCard.price}</p>
            <p class="card-text "> Assistance :${eventCard.assistance}</p>
            <a class="btn btn-primary" onclick="history.back()">Volver atrás</a>
        </div>
        </div>`;

        container.innerHTML = cardEvents;
    }
    catch (error) {
        console.log(error)
    }
}
getEventsData()