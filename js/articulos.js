document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const articles = data.articles;
        loadArticle(articles[0]);
        loadArticleCards(articles);
      });
  });
  
  function loadArticle(article) {
    const articleContent = document.getElementById('article-content');
    articleContent.innerHTML = `
      <h4 class="text-center">${article.title}</h4>
      <div class="img-container text-center">
        <img src="${article.image}" class="img-fluid">
        <p class="text-center mt-2">${article.caption}</p>
      </div>
      <div class="text-container mt-4">
        ${article.content.map(paragraph => `<p>${paragraph}</p>`).join('')}
      </div>
    `;
  
    const commentsSection = document.querySelector('.comentarios');
    const noComments = document.getElementById('no-comments');
    commentsSection.innerHTML = '';
    if (article.comments.length === 0) {
      noComments.style.display = 'block';
    } else {
      noComments.style.display = 'none';
      article.comments.forEach(comment => {
        const commentElement = document.createElement('p');
        commentElement.textContent = comment;
        commentsSection.appendChild(commentElement);
      });
    }
  }
  
  function loadArticleCards(articles) {
    const articlesRow = document.getElementById('articles-row');
    articlesRow.innerHTML = '';
    articles.forEach((article, index) => {
      if (index !== 0) {
        const articleCard = document.createElement('div');
        articleCard.classList.add('col-lg-4', 'col-md-6', 'col-sm-12', 'mb-4');
        articleCard.innerHTML = `
          <div class="card" onclick="loadArticleFromCard(${index})">
            <img src="${article.image}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              <p class="card-text">${article.caption}</p>
            </div>
          </div>
        `;
        articlesRow.appendChild(articleCard);
      }
    });
  }
  
  function loadArticleFromCard(index) {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const article = data.articles[index];
        loadArticle(article);
      });
  }
  
  function addComment() {
    const commentInput = document.getElementById('comment');
    const commentText = commentInput.value.trim();
    if (commentText) {
      const commentsSection = document.querySelector('.comentarios');
      const newComment = document.createElement('p');
      newComment.textContent = commentText;
      commentsSection.appendChild(newComment);
  
      const noComments = document.getElementById('no-comments');
      noComments.style.display = 'none';
  
      fetch('data.json')
        .then(response => response.json())
        .then(data => {
          const articles = data.articles;
          articles[0].comments.push(commentText);
          commentInput.value = '';
        });
    }
  }
  