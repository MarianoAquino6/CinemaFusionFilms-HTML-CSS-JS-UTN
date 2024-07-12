function cargarArticulo(articulo) {
    const contArticulo = document.getElementById('article-content');
    contArticulo.innerHTML = `
        <h3 class="text-center">${articulo.title}</h3>
        <div class="img-container text-center">
            <img src="${articulo.image}" class="img-fluid imagen-despues-titulo">
            <p class="text-center mt-2">${articulo.caption}</p>
        </div>
        <div class="text-container mt-4">
            ${articulo.content.map(p => `<p>${p}</p>`).join('')}
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", function() {
    fetch('contentDataAcercaDe.json')
        .then(response => response.json())
        .then(contentData => {
            const main = document.querySelector('main');

            contentData.articles.forEach(articulo => {
                const section = document.createElement('section');
                section.classList.add('recent-article', 'text-center', 'my-4');
                
                section.innerHTML = `
                    <h3>${articulo.title}</h3>
                    <div class="img-container">
                        <img src="${articulo.image}" class="img-fluid imagen-despues-titulo">
                    </div>
                    <div class="text-container mt-4">
                        ${articulo.content.map(p => `<p>${p}</p>`).join('')}
                    </div>
                `;

                main.appendChild(section);
            });

            const authorsSection = document.createElement('section');
            authorsSection.classList.add('recent-article', 'text-center', 'my-4');

            const authorsList = contentData.authors.map(author => 
                `<li><a href="${author.link}" target="_blank">${author.name}</a></li>`
            ).join('');

            authorsSection.innerHTML = `
                <div class="text-container mt-4">
                    <h2>Autores del Proyecto</h2>
                    <ul>
                        ${authorsList}
                    </ul>
                </div>
            `;

            main.appendChild(authorsSection);
        })
        .catch(error => console.error('Error loading content data:', error));
});
