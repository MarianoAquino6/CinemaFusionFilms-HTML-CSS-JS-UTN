document.addEventListener('DOMContentLoaded', () => {
  let peliculasEnCarrito = JSON.parse(localStorage.getItem('peliculasEnCarrito')) || [];

  if (peliculasEnCarrito.length > 0) {
    const contenedor = document.getElementById('producto-lista');
    let subtotal = 0;

    peliculasEnCarrito.forEach((pelicula, index) => {
      const peliculaHTML = `
        <div class="row" data-index="${index}">
        <div class="col-md-4">
          <img src="${pelicula.rutaPoster}" class="img-fluid rounded mt-1 ml-3 custom-img" alt="${pelicula.nombre}">
          </div>
          <div class="card-body col-md-8">
            <h5>Nombre: ${pelicula.nombre}</h5>
            <h5>Precio: $${(pelicula.precio)}</h5>
            <div class="cards-button">
              <button class="btn btn-danger btn-rojo" data-index="${index}">Eliminar</button>
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

    document.querySelectorAll('.btn-rojo').forEach(button => {
      button.addEventListener('click', (event) => {
        const index = event.target.getAttribute('data-index');
        eliminarDelCarrito(index);
      });
    });
  }
});

function agregarAlCarrito(nombre, precio, poster) {
  let peliculasEnCarrito = JSON.parse(localStorage.getItem('peliculasEnCarrito')) || [];

  const pelicula = {
    nombre: nombre,
    precio: precio,
    rutaPoster: poster
  };

  // Verificar si la película ya está en el carrito
  const peliculaExistente = peliculasEnCarrito.some(p => p.nombre === nombre);
  if (peliculaExistente) {
    showToast('Esta película ya está en el carrito', true);
    return;
  }

  peliculasEnCarrito.push(pelicula);

  localStorage.setItem('peliculasEnCarrito', JSON.stringify(peliculasEnCarrito));

  showToast('Película agregada al carrito', false);
}

function eliminarDelCarrito(index) {
  let peliculasEnCarrito = JSON.parse(localStorage.getItem('peliculasEnCarrito')) || [];
  peliculasEnCarrito.splice(index, 1);
  localStorage.setItem('peliculasEnCarrito', JSON.stringify(peliculasEnCarrito));
  location.reload();
}

function showToast(message, isError = false) {
  Toastify({
      text: message,
      backgroundColor: isError ? 'linear-gradient(to right, #801a04, #d42904)' : 'linear-gradient(to right, #115702, #247a11)',
      duration: 3000,
      close: true
  }).showToast();
}

document.addEventListener('DOMContentLoaded', () => {
  function agregarListenerAgregarAlCarrito(idBoton) {
      const btnAgregarCarrito = document.getElementById(idBoton);

      if (btnAgregarCarrito) {
          btnAgregarCarrito.addEventListener('click', () => {
              const nombre = btnAgregarCarrito.getAttribute('data-nombre');
              const precio = parseInt(btnAgregarCarrito.getAttribute('data-precio'));
              const poster = btnAgregarCarrito.getAttribute('data-poster');

              agregarAlCarrito(nombre, precio, poster);
          });
      }
  }

  const botonesAgregarCarrito = [
      'btn-agregar-carrito-acecha',
      'btn-agregar-demons',
      'btn-agregar-dracula',
      'btn-agregar-hereditary',
      'btn-agregar-inferno',
      'btn-agregar-midsommar',
      'btn-agregar-pearl',
      'btn-agregar-rose',
      'btn-agregar-smile',
      'btn-agregar-suspiria',
      'btn-agregar-carrito-terrifier',
      'btn-agregar-exorcist'
  ];

  botonesAgregarCarrito.forEach(id => {
      agregarListenerAgregarAlCarrito(id);
  });
});