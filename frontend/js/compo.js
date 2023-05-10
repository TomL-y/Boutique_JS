// main.js
function displayitem() {
  var container = document.querySelector('.article-container');
  container.innerHTML = '';
  fetch('http://localhost:3000/item')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        var article = document.createElement('div');
        article.classList.add('article');
        article.innerHTML = `
        <button>
        <h3>${item.titre}</h3>
        <p>${item.marque}</p>
        <img src="${item.img1}">
        <div class="content">
          <p>${item.prix} ${item.devise}</p>
        </div>
      </button>
        `;
        container.appendChild(article);
      });
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des données :", error);
    });
}

window.onload = function() {
  displayitem();
};

function filterItems() {
  const catSelect = document.getElementById('cat-select');
  const selectedCategory = catSelect.value;

  const marqueSelect = document.getElementById('marque-select');
  const selectedMarque = marqueSelect.value;

  const carteSelect = document.getElementById('carte-select');
  const selectedCarte = carteSelect.value;

  const stockSelect = document.getElementById('stock-select');
  const selectedStock = stockSelect.value;

  var container = document.querySelector('.article-container');
  container.innerHTML = '';

  fetch('http://localhost:3000/item')
    .then(response => response.json())
    .then(data => {
      const filteredItems = data.filter(item =>
        (item.categorie === selectedCategory || selectedCategory === 'all') &&
        (item.marque === selectedMarque || selectedMarque === 'all') &&
        (item['sous-categorie'] === selectedCarte || selectedCarte === 'all') &&
        (item.stock === selectedStock || selectedStock === 'all')
      );

      filteredItems.forEach(item => {
        var article = document.createElement('div');
        article.classList.add('article');
        article.innerHTML = `
        <button>
          <h3>${item.titre}</h3>
          <p>${item.marque}</p>
          <img src="${item.img1}">
          <div class="content">
            <p>${item.prix} ${item.devise}</p>
          </div>
        </button>
        `;
        container.appendChild(article);
      });
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des données :", error);
    });
}