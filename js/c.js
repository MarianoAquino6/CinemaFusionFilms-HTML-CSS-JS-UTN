// En un archivo JavaScript global (por ejemplo, peliculas.js)
function agregarAlCarrito(fotoPoster, nombrePelicula, precioPelicula) {
    var item = {
        fotoPoster: fotoPoster,
        nombrePelicula: nombrePelicula,
        precioPelicula: precioPelicula
    };

    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(item);
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Mostrar un mensaje de confirmación (puedes usar Toastify.js aquí)
    alert('¡Película agregada al carrito!');
}