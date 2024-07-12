document.addEventListener('DOMContentLoaded', function () {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  let output = '';
  favorites.forEach((pelicula, index) => {
    const formattedName = pelicula.nombre.replace(/\s+/g, '-').toLowerCase(); // Reemplaza espacios con guiones y convierte a minúsculas
    if (index % 3 === 0) {
      if (index === 0) {
        output += '<div class="carousel-item active"><div class="d-flex justify-content-center">';
      } else {
        output += '</div></div><div class="carousel-item"><div class="d-flex justify-content-center">';
      }
    }
    output += `
      <div class="card mx-2 custom-card">
        <a href="nuestras-peliculas/${formattedName}.html">
          <img src="${pelicula.rutaPoster}" class="card-img-top" alt="${pelicula.nombre}">
        </a>
        <div class="card-body">
          <a href="nuestras-peliculas/${formattedName}.html">
            <h5 class="card-title">${pelicula.nombre}</h5>
          </a>
          <p class="card-text">$${pelicula.precio.toFixed(3)}</p>
        </div>
      </div>
    `;
  });
  output += '</div></div>';
  document.querySelector('.carousel-inner').innerHTML = output;
});
