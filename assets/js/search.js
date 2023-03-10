// ----------------TASK 3-----------------------

/*filtro de busq por texto y por checkboxes, individual y combinado y estar en home past events y upcoming events*/
//--------------------------------------------------------------------------------------------------------------


/*busq por barra = buscar coincidencias en nombre y descripcion del evento -- sugerencia pasar busq y nombre/descripcion
a comparar ambas a lowercase para que no afecten las mayus/minus*/
//1.lo que se ingresa a la barra de busq pasarlo a un elemento, y empezar a compararlo con la info que ya se tiene
//2.pasar lo que se ingresa a lowercase .toLowerCase()

let busqueda = document.getElementById('search');
let cartaEncontrada = ""

function searchEvent(){
    
    let elementoBuscado = busqueda.value.toLowerCase();
    
    data.events.forEach(objeto => {
        if(objeto.name.toLowerCase().includes(elementoBuscado)){
            let cartaNueva = document.getElementById('containerBox');
            cartaNueva.innerHTML = cartaEncontrada;
            cartaEncontrada = 
        `<div class="card col-3 me-5 p-3 shadow-lg" style="width: 18rem;">
            <img src="${objeto.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${objeto.name}</h5>
            <p class="card-text">${objeto.description}</p>
            <p class="d-inline float-start">$${objeto.price}</p><a href="./details.html"
                class="btn btn-primary d-inline float-end shadow-lg">Ver más...</a>
            </div>
        </div>`;;
        }
        
    });

}

busqueda.addEventListener('input', searchEvent)





//----------------------------------------------------------------------------------------------------------------------
/*checkbox de categorias: generarlos dinamicamente extrayendo las categorias del array de eventos - sin repetir*/
//leer las categorias del array de eventos e ir comparando con lo que se selecciona


/*si no se encuentran eventos, mostrar un texto que diga que no hay resultados y que prueben modificando los filtros*/
//si se recorre y no devuelve nada hacer un display de un texto que diga "no se encontraron resultados"


/*boton de cards debe llevar a la pagina de detalle que dinamicamente muestre la info correspondiente*/

