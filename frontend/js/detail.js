
const urlParams = new URLSearchParams(window.location.search);


function afficherArticle(article) {
  const detailContainer = document.querySelector('.detail-container');

  const articleHTML = `
    <div class="article">
      <img src="${article.image}" alt="${article.titre}">
      <h1>${article.titre}</h1>
      <p class="prix">${article.prix.toFixed(2)} €</p>
      <p class="description">${article.description}</p>
    </div>
  `;

  detailContainer.innerHTML = articleHTML;
}

const queryParams = new URLSearchParams(window.location.search);
const id = queryParams.get('id');

fetch(`/item/${id}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des données: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    const detailContainer = document.querySelector('.detail-container');
  
    const title = document.createElement('h1');
    title.textContent = data.title;
  
    const img = document.createElement('img');
    img.setAttribute('src', data.image);
    img.setAttribute('alt', data.title);
  
    const price = document.createElement('p');
    price.textContent = `Prix: ${data.price} €`;
  
    const description = document.createElement('p');
    description.textContent = data.description;
  
    detailContainer.appendChild(title);
    detailContainer.appendChild(img);
    detailContainer.appendChild(price);
    detailContainer.appendChild(description);
  })
  
  .catch(error => {
    console.error("Erreur lors de la récupération des données:", error);
  });

