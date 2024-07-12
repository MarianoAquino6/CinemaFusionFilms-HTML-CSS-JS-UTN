// Función para obtener el reparto desde TMDB limitado a 8 filas
async function obtenerRepartoTMDB(movieId) {
    const apiKey = 'e8451504cc802025e5742e9b9361a127';
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const castTable = document.querySelector('.reparto table tbody');
        castTable.innerHTML = '';

        const limit = 8;
        const castSlice = data.cast.slice(0, limit);

        castSlice.forEach(actor => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${actor.name}</td>
                <td>${actor.character}</td>
            `;
            castTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error al obtener el reparto:', error);
    }
}

async function obtenerSinopsisTMDB(movieId) {
    const apiKey = 'e8451504cc802025e5742e9b9361a127';
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const sinopsisDiv = document.querySelector('.sinopsis p');
        sinopsisDiv.textContent = data.overview;
    } catch (error) {
        console.error('Error al obtener la sinopsis:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    function obtenerInfoTMDB(id) {
        const btn = document.getElementById(id);
        if (btn) {
            const movieId = btn.getAttribute('data-movie-id');
            obtenerRepartoTMDB(movieId);
            obtenerSinopsisTMDB(movieId);
        } else {
            console.error(`El botón con ID ${id} no se encontró.`);
        }
    }

    obtenerInfoTMDB('btn-agregar-dracula');
    obtenerInfoTMDB('btn-agregar-carrito-acecha');
    obtenerInfoTMDB('btn-agregar-demons');
    obtenerInfoTMDB('btn-agregar-hereditary');
    obtenerInfoTMDB('btn-agregar-inferno');
    obtenerInfoTMDB('btn-agregar-midsommar');
    obtenerInfoTMDB('btn-agregar-pearl');
    obtenerInfoTMDB('btn-agregar-rose');
    obtenerInfoTMDB('btn-agregar-smile');
    obtenerInfoTMDB('btn-agregar-carrito-terrifier');
    obtenerInfoTMDB('btn-agregar-exorcist');
    obtenerInfoTMDB('btn-agregar-suspiria');
});

document.addEventListener('DOMContentLoaded', () => {
    const estrellas = document.querySelectorAll('.puntuacionUsuario .estrellas .fas');
    let puntuacionSeleccionada = 0;

    estrellas.forEach((estrella, index) => {
        estrella.addEventListener('mouseover', () => {
            resaltarEstrellas(index);
        });

        estrella.addEventListener('mouseout', () => {
            quitarResaltadoEstrellas();
        });

        estrella.addEventListener('click', () => {
            seleccionarEstrellas(index);
        });
    });

    const resaltarEstrellas = (index) => {
        for (let i = 0; i <= index; i++) {
            estrellas[i].classList.add('hover');
        }
    };

    const quitarResaltadoEstrellas = () => {
        estrellas.forEach(estrella => {
            estrella.classList.remove('hover');
        });
        resaltarEstrellasSeleccionadas();
    };

    const seleccionarEstrellas = (index) => {
        puntuacionSeleccionada = index + 1;
        resaltarEstrellasSeleccionadas();
    };

    const resaltarEstrellasSeleccionadas = () => {
        estrellas.forEach((estrella, index) => {
            if (index < puntuacionSeleccionada) {
                estrella.classList.add('selected');
            } else {
                estrella.classList.remove('selected');
            }
        });
    };

    document.querySelector('.boton-carrito button').addEventListener('click', () => {
        showToast('Puntuación enviada', false);
    });
});

function showToast(message, isError = false) {
    Toastify({
        text: message,
        backgroundColor: isError ? 'linear-gradient(to right, #801a04, #d42904)' : 'linear-gradient(to right, #115702, #247a11)',
        duration: 3000,
        close: true
    }).showToast();
  }