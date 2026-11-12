export const ICONS_URL = "./node_modules/@meteocons/svg/fill/"
const estadoTiempo = document.getElementById("estado-tiempo");
const selectLocalidades = document.getElementById("selector-ciudad");
const imagenIcono = document.getElementById("icono");
const titulo = document.getElementById("titulo");
const temperatura = document.getElementById("temperatura");
const humedad = document.getElementById("humedad");
const VelocidadViento = document.getElementById("Velocidad viento");
const fecha = document.getElementById("fecha");
const hora = document.getElementById("hora");


// https://open-meteo.com/en/docs?current=weather_code


let latitud = 38.91611;
let longitud = -6.34366;


//Icono y hora.

const codigosClima = {
    0: { text: "Cielo despejado", icon: "clear-day.svg" },
    1: { text: "Principalmente despejado", icon: "cloudy.svg" }, 
    2: { text: "Parcialmente nublado", icon: "partly-cloudy-day.svg" },
    3: { text: "Cubierto / Nublado", icon: "overcast.svg" },
    45: { text: "Niebla", icon: "fog.svg" },
    48: { text: "Niebla con escarcha", icon: "fog.svg" },
    51: { text: "Llovizna ligera", icon: "drizzle.svg" },
    53: { text: "Llovizna moderada", icon: "drizzle.svg" },
    55: { text: "Llovizna densa", icon: "drizzle.svg" },
    61: { text: "Lluvia débil", icon: "rain.svg" },
    63: { text: "Lluvia moderada", icon: "rain.svg" },
    65: { text: "Lluvia fuerte", icon: "extreme-rain.svg" },
    71: { text: "Nevada ligera", icon: "snow.svg" },
    75: { text: "Nevada fuerte", icon: "extreme-snow.svg" },
    80: { text: "Chubascos de lluvia leves", icon: "rain.svg" },
    81: { text: "Chubascos de lluvia moderados", icon: "rain.svg" },
    82: { text: "Chubascos de lluvia violentos", icon: "extreme-rain.svg" },
    95: { text: "Tormenta eléctrica", icon: "thunderstorms.svg" }
};



    let api_open_meteo = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;



function obtenerTiempo() {

    estadoTiempo.textContent = "Consultando…";

    fetch(api_open_meteo)
        .then(response => {

            if (!response.ok) {
                throw new Error("Error en la solicitud: " + response.status);
            }
            return response.json(); 
        })
        .then(datosTiempo => {

            const codigoActualTiempo = datosTiempo.current.weather_code;

            const descripcion = codigosClima[codigoActualTiempo].text || "Condiciones climáticas no especificadas";
            const imagen = codigosClima[codigoActualTiempo].icon ;

            estadoTiempo.textContent = descripcion;
                    imagenIcono.setAttribute('src',ICONS_URL+ imagen);
                    console.log("OJO");


                    temperatura.textContent="Temperatura: " +datosTiempo.current.temperature_2m + " Cº";
                    humedad.textContent="Humedad: "+datosTiempo.current.relative_humidity_2m + " %"; 
                    VelocidadViento.textContent="Velocidad viento: "+datosTiempo.current.wind_speed_10m + " km/h";
                    let arrayString =  datosTiempo.current.time.split("T");
                    fecha.textContent="Fecha: " + arrayString[0];
                    hora.textContent="Hora: " + arrayString[1];

         
        })
        .catch(error => {
            console.error("Hubo un problema con la petición Fetch:", error);
            
            estadoTiempo.textContent = "No se ha podido consultar el tiempo";
        });

        
}



obtenerTiempo();

selectLocalidades.addEventListener("change", (evento) => {
const opcionSeleccionada = evento.target.selectedOptions[0]; //Es merida la primera por defecto.



    // evento.target.value te devolverá el atributo value de la opción elegida (ej: "caceres")
    console.log("Ciudad seleccionada:", evento.target.value); 
     latitud = opcionSeleccionada.dataset.lat;
     longitud = opcionSeleccionada.dataset.lon;

 api_open_meteo = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;

    titulo.textContent="El tiempo en " + opcionSeleccionada.getAttribute("value");

obtenerTiempo();

});



