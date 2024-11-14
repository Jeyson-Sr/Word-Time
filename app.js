let countries = [];

// Obtener lista de países de la API Restcountries
async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    countries = data.map(country => country.name.common); // Extraer solo el nombre del país
}

const punto1 = document.getElementById('punto1');
const punto2 = document.getElementById('punto2');

setInterval(() => {
    // Alternar la visibilidad de los puntos
    punto1.style.visibility = (punto1.style.visibility === 'hidden' ? 'visible' : 'hidden');
    punto2.style.visibility = (punto2.style.visibility === 'hidden' ? 'visible' : 'hidden');
}, 500);  // Cada 500ms, los puntos cambiarán su visibilidad



const country = document.getElementById('country');

country.addEventListener('input', () => {
    const input = country.value.toLowerCase();
    const suggestions = countries.filter(c => c.toLowerCase().startsWith(input));
    showSuggestions('country', suggestions);
});


// Mostrar sugerencias
function showSuggestions(type, suggestions) {
    const suggestionsDiv = document.getElementById(`${type}-suggestions`);
    suggestionsDiv.innerHTML = ''; // Limpiar sugerencias anteriores
    suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.textContent = suggestion;
        div.onclick = function() {
            document.getElementById(type).value = suggestion;
            suggestionsDiv.innerHTML = ''; // Limpiar sugerencias al seleccionar
        };
        suggestionsDiv.appendChild(div);
    });
}

// Función para obtener la hora
function httpGetAsync(url, callback) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            callback(xmlHttp.responseText);
        }
    };
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}
// Manejar el formulario
// Manejar el formulario

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se recargue
    
    const country = document.getElementById('country').value;
    const namecountry = document.getElementById('nombrePaisUbicado');
    
    // Segmentos de la Hora - Primer dígito
    const segmentosHoraPrimero = {
        superior: document.querySelector('.custom-shape--superior--hora__primero'),
        superiorDerecho: document.querySelector('.custom-shape--superior__derecho--hora__primero'),
        superiorIzquierdo: document.querySelector('.custom-shape--superior__izquierdo--hora__primero'),
        centro: document.querySelector('.custom-shape--centro--hora__primero'),
        inferiorDerecho: document.querySelector('.custom-shape--inferior__derecho--hora__primero'),
        inferiorIzquierdo: document.querySelector('.custom-shape--inferior__izquierdo--hora__primero'),
        inferior: document.querySelector('.custom-shape--inferior--hora__primero')
    };
    
    // Segmentos de la Hora - Segundo dígito
    const segmentosHoraSegundo = {
        superior: document.querySelector('.custom-shape--superior--hora__segundo'),
        superiorDerecho: document.querySelector('.custom-shape--superior__derecho--hora__segundo'),
        superiorIzquierdo: document.querySelector('.custom-shape--superior__izquierdo--hora__segundo'),
        centro: document.querySelector('.custom-shape--centro--hora__segundo'),
        inferiorDerecho: document.querySelector('.custom-shape--inferior__derecho--hora__segundo'),
        inferiorIzquierdo: document.querySelector('.custom-shape--inferior__izquierdo--hora__segundo'),
        inferior: document.querySelector('.custom-shape--inferior--hora__segundo')
    };
    
    // Segmentos del Minuto - Primer dígito
    const segmentosMinutoPrimero = {
        superior: document.querySelector('.custom-shape--superior--minuto__primero'),
        superiorDerecho: document.querySelector('.custom-shape--superior__derecho--minuto__primero'),
        superiorIzquierdo: document.querySelector('.custom-shape--superior__izquierdo--minuto__primero'),
        centro: document.querySelector('.custom-shape--centro--minuto__primero'),
        inferiorDerecho: document.querySelector('.custom-shape--inferior__derecho--minuto__primero'),
        inferiorIzquierdo: document.querySelector('.custom-shape--inferior__izquierdo--minuto__primero'),
        inferior: document.querySelector('.custom-shape--inferior--minuto__primero')
    };
    
    // Segmentos del Minuto - Segundo dígito
    const segmentosMinutoSegundo = {
        superior: document.querySelector('.custom-shape--superior--minuto__segundo'),
        superiorDerecho: document.querySelector('.custom-shape--superior__derecho--minuto__segundo'),
        superiorIzquierdo: document.querySelector('.custom-shape--superior__izquierdo--minuto__segundo'),
        centro: document.querySelector('.custom-shape--centro--minuto__segundo'),
        inferiorDerecho: document.querySelector('.custom-shape--inferior__derecho--minuto__segundo'),
        inferiorIzquierdo: document.querySelector('.custom-shape--inferior__izquierdo--minuto__segundo'),
        inferior: document.querySelector('.custom-shape--inferior--minuto__segundo')
    };
    
    if (country) {
        const url = `https://timezone.abstractapi.com/v1/current_time/?api_key=fd4f18d51648449484ac61cfc9205155&location=${country}`;
        
        httpGetAsync(url, function(response) {
            try {
                const data = JSON.parse(response);

                let { datetime } = data; // Desestructuramos datetime
                let [date, time] = datetime.split(" "); // Dividimos fecha y hora
                let [hora, minuto] = time.split(":"); // Extraemos hora y minuto
                
                // Dividir cada dígito de la hora y minuto
                let [horaPrimero, horaSegundo] = hora.split("");
                let [minutoPrimero, minutoSegundo] = minuto.split("");
                
                // Función para pintar el número en los segmentos de un display
                function pintarNumeroEnSegmentos(numero, segmentos) {
                    const colorPrimario = 'var(--color-secundario)';
                    const colorSecundario = 'var(--color-primario)';

                    // Restablecer todos los segmentos a color secundario
                    Object.values(segmentos).forEach(segmento => {
                        segmento.style.backgroundColor = colorSecundario;
                    });

                    // Configuración de segmentos activos para cada dígito
                    const configuracionSegmentos = {
                        "0": ["superior", "superiorIzquierdo", "superiorDerecho", "inferiorIzquierdo", "inferiorDerecho", "inferior"],
                        "1": ["superiorIzquierdo", "inferiorIzquierdo"],
                        "2": ["superior", "superiorIzquierdo", "centro", "inferiorDerecho", "inferior"],
                        "3": ["superior", "superiorIzquierdo", "centro", "inferiorIzquierdo", "inferior"],
                        "4": ["superiorDerecho", "superiorIzquierdo", "centro", "inferiorIzquierdo"],
                        "5": ["superior", "superiorDerecho", "centro", "inferiorIzquierdo", "inferior"],
                        "6": ["superior", "superiorDerecho", "centro", "inferiorIzquierdo", "inferior", "inferiorDerecho"],
                        "7": ["superior", "superiorIzquierdo", "inferiorIzquierdo"],
                        "8": ["superior", "superiorIzquierdo", "superiorDerecho", "centro", "inferiorIzquierdo", "inferiorDerecho", "inferior"],
                        "9": ["superior", "superiorIzquierdo", "superiorDerecho", "centro", "inferiorIzquierdo", "inferior"]
                      };
                      

                    // Cambiar el color de los segmentos activos
                    const segmentosActivos = configuracionSegmentos[numero] || [];
                    segmentosActivos.forEach(segmento => {
                        segmentos[segmento].style.backgroundColor = colorPrimario;
                    });
                }

                // Pintar los dígitos de la hora y el minuto en los displays correspondientes
                pintarNumeroEnSegmentos(horaPrimero, segmentosHoraPrimero);
                pintarNumeroEnSegmentos(horaSegundo, segmentosHoraSegundo);
                pintarNumeroEnSegmentos(minutoPrimero, segmentosMinutoPrimero);
                pintarNumeroEnSegmentos(minutoSegundo, segmentosMinutoSegundo);

                // Mostrar el nombre del país
                namecountry.textContent = `Pais: ${country}`;
            } catch (error) {
                console.error("No se pudo obtener la hora:", error);
            }
        });
    }
});

fetchCountries(); 

