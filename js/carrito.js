document.addEventListener('DOMContentLoaded', () => {
  // Recuperar las películas del carrito desde localStorage si existen
  let peliculasEnCarrito = JSON.parse(localStorage.getItem('peliculasEnCarrito')) || [];

  if (peliculasEnCarrito.length > 0) {
    const contenedor = document.getElementById('producto-lista');
    let subtotal = 0;

    peliculasEnCarrito.forEach(pelicula => {
      const peliculaHTML = `
        <div class="row">
          <img src="${pelicula.rutaPoster}" class="img-fluid col-md-4 mt-1" alt="${pelicula.nombre}">
          <div class="card-body col-md-8">
            <h5>Nombre: ${pelicula.nombre}</h5>
            <h5>Precio: $${(pelicula.precio)}</h5>
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

    const total = subtotal * 1.20; // Aplicar impuesto del 20%
    document.getElementById('subtotal').innerText = `Subtotal: $${(subtotal).toFixed(2)}`;
    document.getElementById('total').innerText = `Total: $${(total).toFixed(2)}`;
  }
});

// Función para agregar una película al carrito
function agregarAlCarrito(nombre, precio, poster) {
  // Obtener las películas actuales del carrito desde localStorage
  let peliculasEnCarrito = JSON.parse(localStorage.getItem('peliculasEnCarrito')) || [];

  // Construir el objeto de la película a agregar
  const pelicula = {
    nombre: nombre,
    precio: precio,
    rutaPoster: poster
  };

  // Agregar la nueva película al array de películas en el carrito
  peliculasEnCarrito.push(pelicula);

  // Guardar el array actualizado de películas de vuelta en localStorage
  localStorage.setItem('peliculasEnCarrito', JSON.stringify(peliculasEnCarrito));

  // Opcionalmente, redirigir a la página del carrito o actualizar la UI
  alert('Película agregada al carrito.');
}