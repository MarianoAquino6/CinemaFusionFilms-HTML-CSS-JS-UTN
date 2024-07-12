
document.addEventListener('DOMContentLoaded', () => {
  fetch('peliculas.json')
    .then(response => response.json())
    .then(peliculas => {
      const carrito = [peliculas[10], peliculas[4], peliculas[5]];
      const contenedor = document.getElementById('producto-lista');
      let subtotal = 0;

      carrito.forEach(pelicula => {
        const peliculaHTML = `
          <div class="row">
            <img src="${pelicula.rutaPoster}" class="img-fluid col-md-4 mt-1" alt="${pelicula.nombre}">
            <div class="card-body col-md-8">
              <h5>Nombre: ${pelicula.nombre}</h5>
              <h5>Precio: $${pelicula.precio.toFixed(3)}</h5>
              <div class="cards-button">
                <button class="btn btn-danger btn-rojo">Eliminar</button>
                <button class="btn btn-primary">Agregar a Favoritos</button>
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
    })
    .catch(error => console.error('Error al cargar las películas:', error));
});