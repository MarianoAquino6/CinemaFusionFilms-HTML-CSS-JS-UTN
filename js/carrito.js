document.addEventListener('DOMContentLoaded', () => {
  fetch('peliculas.json')
    .then(response => response.json())
    .then(peliculas => {
      const carrito = [peliculas[10], peliculas[4], peliculas[5], peliculas[6], peliculas[7]];
      const contenedor = document.getElementById('producto-lista');
      let subtotal = 0;

      carrito.forEach(pelicula => {
        const peliculaHTML = `
          <div class="row" data-id="${pelicula.id}">
            <img src="${pelicula.rutaPoster}" class="img-fluid col-md-4 mt-1" alt="${pelicula.nombre}">
            <div class="card-body col-md-8">
              <h5>Nombre: ${pelicula.nombre}</h5>
              <h5>Precio: $${pelicula.precio.toFixed(3)}</h5>
              <div class="cards-button">
                <button class="btn btn-danger btn-rojo">Eliminar</button>
                <button class="btn btn-primary fav-button">${isFavorite(pelicula.id) ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}</button>
              </div>
            </div>
            <hr>
          </div>
        `;
        contenedor.innerHTML += peliculaHTML;
        subtotal += pelicula.precio;
      });

      const total = subtotal * 1.20;
      document.getElementById('subtotal').innerText = `Subtotal: $${subtotal.toFixed(3)}`;
      document.getElementById('total').innerText = `Total: $${total.toFixed(3)}`;

      // Event listener for Add/Remove favorites
      document.querySelectorAll('.fav-button').forEach(button => {
        button.addEventListener('click', handleFavorite);
      });
    })
    .catch(error => console.error('Error al cargar las películas:', error));
});

// Check if a movie is already in favorites
function isFavorite(id) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return favorites.some(movie => movie.id === id);
}

// Handle Add/Remove favorite
function handleFavorite(event) {
  const button = event.target;
  const movieElement = button.closest('.row');
  const movieId = parseInt(movieElement.getAttribute('data-id'));

  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (isFavorite(movieId)) {
    // Remove from favorites
    favorites = favorites.filter(movie => movie.id !== movieId);
    button.innerText = 'Agregar a Favoritos';
  } else {
    // Add to favorites
    const nombre = movieElement.querySelector('h5:nth-child(1)').innerText.split(': ')[1];
    const precio = parseFloat(movieElement.querySelector('h5:nth-child(2)').innerText.split(': $')[1]);
    const rutaPoster = movieElement.querySelector('img').getAttribute('src');
    
    favorites.push({ id: movieId, nombre, precio, rutaPoster });
    button.innerText = 'Eliminar de Favoritos';
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
}
