document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    fetch('articulos.json')
      .then(response => response.json())
      .then(data => {
        const articulos = data.articles;
        if (articulos.length > 0) {
          const article = articulos[id];
          cargarArticulo(article); 
          cargarCartas(articulos);
        }
      });
  });
  
  function cargarArticulo(articulo) {
    const contArticulo = document.getElementById('article-content');
    contArticulo.innerHTML = `
      <h4 class="text-center">${articulo.title}</h4>
      <div class="img-container text-center">
        <img src="${articulo.image}" class="img-fluid">
        <p class="text-center mt-2">${articulo.caption}</p>
      </div>
      <div class="text-container mt-4">
        ${articulo.content.map(p => `<p>${p}</p>`).join('')}
      </div>
    `;
  
    const seccionComentarios = document.querySelector('.comentarios');
    const sinComentarios = document.getElementById('no-comments');
    seccionComentarios.innerHTML = '';
    if (articulo.comments.length === 0) {
      sinComentarios.style.display = 'block';
    } else {
      sinComentarios.style.display = 'none';
      articulo.comments.forEach(comment => {
        const comentario = document.createElement('p');
        comentario.textContent = comment;
        seccionComentarios.appendChild(comentario);
      });
    }
  }
  function cargarCartas(articulo) {
    const articlesRow = document.getElementById('articles-row');
    articlesRow.innerHTML = '';
    articulo.forEach((articulo, index) => {
      if (index !== 0) {
        const carta = document.createElement('div');
        carta.classList.add('col-lg-4', 'col-md-6', 'col-sm-12', 'mb-4');
        carta.innerHTML = `
          <a href="articulo.html?id=${index}" class="card-link">
            <div class="card">
              <img src="${articulo.image}" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">${articulo.title}</h5>
              </div>
            </div>
          </a>
        `;
        articlesRow.appendChild(carta);
      }
    });
  }

  function cargarArticuloDesdeCarta(index) {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const articulo = data.articles[index];
        cargarArticulo(articulo);
      });
  }
  
  function addComment() {
    const comentarioInput = document.getElementById('comment');
    const texto = comentarioInput.value.trim();
    if (texto) {
      const seccionComentarios = document.querySelector('.comentarios');
      const comentario = document.createElement('p');
      comentario.textContent = texto;
      seccionComentarios.appendChild(comentario);
  
      const sinComentarios = document.getElementById('no-comments');
      sinComentarios.style.display = 'none';
  
      fetch('data.json')
        .then(response => response.json())
        .then(data => {
          const articulos = data.articles;
          articulos[0].comments.push(texto);
          comentarioInput.value = '';
        });
    }
  }
  
