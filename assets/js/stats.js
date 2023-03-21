async function getEventsData() {
    try {
        let response = await fetch("https://mindhub-xj03.onrender.com/api/amazing");
        let data = await response.json();
        let eventos = data.events;

        //de aca sale mi porcentaje de asistencia
        let percentages = eventos.map((evento) => evento.assistance / evento.capacity * 100).filter(percentage => !Number.isNaN(percentage));

        // encuentro el mayor y el menor porcentaje de asistencia
        let maxPercentage = Math.max.apply(null, percentages);
        let minPercentage = Math.min.apply(null, percentages);

        // hago un find para encontrar el evento con el mayor porcdentaje de asistencia
        let eventoMaxAssisted = eventos.find(function (evento) {
            return evento.assistance / evento.capacity * 100 === maxPercentage;
        });
        let eventoMinAssisted = eventos.find(function (evento) {
            return evento.assistance / evento.capacity * 100 === minPercentage;
        });

        let eventoMayorCapacidad = [];
        let capacidadMayor = 0;
        // Itero hasta encontrar los eventos con mayor capacidad
        for (let i = 0; i < eventos.length; i++) {
            if (eventos[i].capacity > capacidadMayor) {
                capacidadMayor = eventos[i].capacity;
                eventoMayorCapacidad = [eventos[i].name];
            } else if (eventos[i].capacity === capacidadMayor) {
                eventoMayorCapacidad.push(eventos[i].name);
            }
        }

        let table = document.getElementById("stats");
        let showStats = ` <tr>
                        <td> ${eventoMaxAssisted.name}:  ${maxPercentage}% </td>
                        <td> ${eventoMinAssisted.name}:  ${minPercentage}% </td>
                        <td> ${eventoMayorCapacidad.join(' - ')} Capacity: ${capacidadMayor}</td>
                        </tr>`;

        table.innerHTML = showStats;

       //Upcoming Events
       //creo objeto para guardar las categorias
        let categorias = {};
        for (let i = 0; i < eventos.length; i++) {
            let evento = eventos[i];
            let eventDate = new Date(evento.date);
            const currentDate = new Date();
            if (eventDate >= currentDate) {
                if (!categorias[evento.category]) {
                    categorias[evento.category] = [];
                }
                categorias[evento.category].push(evento);

            }
        }

        //creo un objeto para almacenar los ingresos
        let revenueUpcomingObject = {};
        for (let i = 0; i < eventos.length; i++) {
            let evento = eventos[i];
            let eventDate = new Date(evento.date);
            const currentDate = new Date();
            if (eventDate >= currentDate) {
                if (!revenueUpcomingObject[evento.category]) {
                    revenueUpcomingObject[evento.category] = { ingresos: 0 };
                }
                revenueUpcomingObject[evento.category].ingresos += evento.price * evento.estimate;
            }
        }

        //filtro los eventos futuros
        let upcomingEvents = eventos.filter(function(evento) {
            return new Date(evento.date) > new Date();
        });
        
        let upcomingAttendance = {};
        for (let i = 0; i < upcomingEvents.length; i++) {
            const evento = upcomingEvents[i];
            if (!upcomingAttendance[evento.category]) {
                upcomingAttendance[evento.category] = {
                    capacidadTotal: 0,
                    asistentesTotal: 0
                };
            }
            upcomingAttendance[evento.category].capacidadTotal += evento.capacity;
            upcomingAttendance[evento.category].asistentesTotal += evento.estimate;
        }
        
        for (let categoria in upcomingAttendance) {
            const totalCapacityUpcoming = upcomingAttendance[categoria].capacidadTotal;
            const totalAttendenceUpcoming = upcomingAttendance[categoria].asistentesTotal;
        }

        //HTML Inyeccion
        let upcomingTable = document.getElementById('upcomingTable');
        for (let categoria in categorias) {
            let trUpcoming = document.createElement('tr');
            let categoryUpcomingTD = document.createElement('td');
            let revenueUpcomingTD = document.createElement('td');
            let attendanceUpcomingTD = document.createElement('td');

            categoryUpcomingTD.innerText = categoria;
            revenueUpcomingTD.innerText = '$' + revenueUpcomingObject[categoria].ingresos;
            attendanceUpcomingTD.innerText = (upcomingAttendance[categoria].asistentesTotal / upcomingAttendance[categoria].capacidadTotal * 100).toFixed(2) + '%';

            trUpcoming.appendChild(categoryUpcomingTD);
            trUpcoming.appendChild(revenueUpcomingTD);
            trUpcoming.appendChild(attendanceUpcomingTD);

            upcomingTable.appendChild(trUpcoming);
        }


        //PAST EVENTS
        // Crear un objeto para almacenar las categorías
        let categoriasPasadas = {};
        for (let i = 0; i < eventos.length; i++) {
            let evento = eventos[i];
            let eventDate = new Date(evento.date);
            const currentDate = new Date();
            if (eventDate <= currentDate) {
                if (!categoriasPasadas[evento.category]) {
                    categoriasPasadas[evento.category] = [];
                }
                categoriasPasadas[evento.category].push(evento);
            }
        }

        //creo un objeto para almacenar los ingresos
        let revenuePastObject = {};

        for (let i = 0; i < eventos.length; i++) {
            let evento = eventos[i];
            let eventDate = new Date(evento.date);
            let currentDate = new Date();
            if (eventDate < currentDate) {
                if (!revenuePastObject[evento.category]) {
                    revenuePastObject[evento.category] = { ingresos: 0 };
                }
                revenuePastObject[evento.category].ingresos += evento.price * evento.assistance;
            }
        }

        // filtro eventos pasados
        let pastEvents = eventos.filter(function(evento) {
            return new Date(evento.date) < new Date();
        });

        // saco el porcentaje de asistencia de eventos pasados
        let pastAttendance = {};
        for (let i = 0; i < pastEvents.length; i++) {
            const evento = pastEvents[i];
            if (!pastAttendance[evento.category]) {
                pastAttendance[evento.category] = {
                    capacidadTotal: 0,
                    asistentesTotal: 0
                };
            }
            pastAttendance[evento.category].capacidadTotal += evento.capacity;
            pastAttendance[evento.category].asistentesTotal += evento.assistance;
        }
        
        for (let categoria in pastAttendance) {
            const totalCapacityPast = pastAttendance[categoria].capacidadTotal;
            const totalAttendencePast = pastAttendance[categoria].asistentesTotal;
        }
        //HTML Inyeccion
        let pastTable = document.getElementById('pastTable');
        for (let categoria in categorias) {
            let trPast = document.createElement('tr');
            let categoryPastTD = document.createElement('td');
            let revenuePastTD = document.createElement('td');
            let attendancePastTD = document.createElement('td');

            categoryPastTD.innerText = categoria;
            revenuePastTD.innerText = '$' + revenuePastObject[categoria].ingresos;
            attendancePastTD.innerText = (pastAttendance[categoria].asistentesTotal / pastAttendance[categoria].capacidadTotal * 100).toFixed(2) + '%';

            trPast.appendChild(categoryPastTD);
            trPast.appendChild(revenuePastTD);
            trPast.appendChild(attendancePastTD);

            pastTable.appendChild(trPast);
        }
    }
    catch (error) {
        console.log(error)
    }
}
getEventsData()