let htmlEvents = "";
for(let event of data.events){
    
    htmlEvents += 
    `<div class="card col-3 me-5 p-3 shadow-lg" style="width: 18rem;">
        <img src="${event.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}</p>
            <p class="d-inline float-start">$${event.price}</p><a href="./details.html"
                class="btn btn-primary d-inline float-end shadow-lg">Ver más...</a>
        </div>
    </div>`;
}
let cardIndex = document.getElementById('containerBox');
    cardIndex.innerHTML = htmlEvents;

