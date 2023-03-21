async function getEventsData() {
    try {
        let response = await fetch("https://mindhub-xj03.onrender.com/api/amazing");
        let data = await response.json();

        let eventos = data.events;
        let eventCard = document.getElementById('containerBox');

        let currentDate = new Date(data.currentDate);

    //Armo las cartas dinamicamente (preguntando si la fecha del evento es antes que la fecha actual) con el array de eventos y el contenedor que los va a contener como parametro. 
    
        function dibujarCard(arrayE, container) {
            container.innerHTML = "";
            let cards = [];
            for (let evento of arrayE) {
                let eventDate = new Date(evento.date);
                if (eventDate < currentDate) {
                    let divCard = document.createElement("div");
                    divCard.className = "card p-2 m-2 cartitaTres";
                    divCard.innerHTML += `<img src="${evento.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${evento.name}</h5>
                    <p class="card-text">${evento.description}</p>
                    <p class="d-inline float-start">$${evento.price}</p><a href="./details.html?id=${evento._id}"
                    class="btn btn-outline-primary d-inline float-end shadow-lg">Ver más...</a>
                    </div>`;
                    cards.push(divCard);
                }
            }

            function appendCard(card) {
                container.appendChild(card);
            }

            cards.forEach(appendCard);
        }
        dibujarCard(eventos, eventCard)



        //Creo un elemento que va a tener las categorias.

        let category = document.getElementById('category');
        function categorias(arrayCategorias) {
            let categories = arrayCategorias.map(function (categoria) {
                return categoria.category;
            });
            let catArray = [];
            for (let i = 0; i < categories.length; i++) {
                if (catArray.indexOf(categories[i]) === -1) {
                    catArray.push(categories[i]);
                }
            }
            return catArray;
        }

        //Armo las categorias dinamicamente
        let categories = categorias(eventos);
        function newCategory(categories, category) {
            categories.forEach(function (categoria) {
                let categoriaLabel = document.createElement('label');
                categoriaLabel.className = 'form-check-label';
                categoriaLabel.innerHTML = `<input class="form-check-input" type="checkbox" 
                value="${categoria}" id="${categoria}">
                ${categoria}`;
                category.appendChild(categoriaLabel);
            })
        }
        newCategory(categories, category);

        //compruebo si la categoria este chequeada 
        function checkedFilter(arrayEventos) {
            let checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
            let chequeadas = checked.map(function (e) {
                return e.id.toLocaleUpperCase();
            });
            let filterBy = arrayEventos.filter(function (element) {
                return chequeadas.includes(element.category.toLocaleUpperCase());
            });
            if (filterBy.length > 0) {
                return filterBy;
            } else {
                return arrayEventos;
            }
        }

        //filtro la barra de busqueda
        let search = document.getElementById('search');
        let searchFilter = (arrayEventos, value) => {
            let arrayFilter = arrayEventos.filter(function (e) {
                return e.name.toLowerCase().includes(value.toLowerCase());
            });
            return arrayFilter;
        }

        //chequeo la barra de busqueda y la categoria si esta chequeada
        function doubleFilter(arrayEventos) {
            let nuevoArreglo = checkedFilter(arrayEventos);
            nuevoArreglo = searchFilter(nuevoArreglo, search.value);
            return nuevoArreglo;
        }

        //escucho al checkbox para ver si se chequea o se deschequea
        category.addEventListener('change', function () {
            let dataFiltrada = doubleFilter(eventos);
            if (dataFiltrada.length === 0) {
                eventCard.innerHTML = `<h3 class="text-align-center">Evento no encontrado, modifique su búsqueda</h3>`
            } else {
                eventCard.innerHTML = "";
                dibujarCard(dataFiltrada, eventCard);
            }
        });

        //escucho a la barra de busqueda, a ver que se ingresa
        search.addEventListener('input', function (e) {
            let dataFiltrada = doubleFilter(eventos);
            if (dataFiltrada.length === 0) {
                eventCard.innerHTML = `<h3 class="text-align-center">Evento no encontrado, modifique su búsqueda</h3>`
            } else {
                eventCard.innerHTML = "";
                dibujarCard(dataFiltrada, eventCard);
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}
getEventsData();
