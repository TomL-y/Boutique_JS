
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
          <div>
            <h3>${item.titre}</h3>
            <p>${item.marque}</p>
            <img class="product-img" src="${item.img1}" data-img1="${item.img1}" data-img2="${item.img2}">
            <div class="content">
              ${item.reduction ? `<del>${item.prix} ${item.devise}</del><span class="reduced-price">${item.reduction} ${item.devise}</span>` : `<span>${item.prix} ${item.devise}</span>`}
              <button class="add-to-cart-btn" data-title="${item.titre}" data-price="${item.reduction || item.prix}" data-img="${item.img1}">Ajouter au panier</button>
              </div>
          </div>
        `;
        container.appendChild(article);
      });
    
      const productImages = container.querySelectorAll('.product-img');
      productImages.forEach(imgElement => {
        imgElement.addEventListener('mouseover', function() {
          this.src = this.dataset.img2;
        });
        imgElement.addEventListener('mouseout', function() {
          this.src = this.dataset.img1;
        });
      });
      const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
      addToCartBtns.forEach(btn => {
        btn.addEventListener('click', addToCart);
      });
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des données :", error);
    });
    const detailsBtns = document.querySelectorAll('.details-btn');
      detailsBtns.forEach(btn => {
        btn.addEventListener('click', redirectToDetails);
    });
}


window.onload = function() {
  displayitem();
};

/******************************************************************************************/

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
          <div>
            <h3>${item.titre}</h3>
            <p>${item.marque}</p>
            <img class="product-img" src="${item.img1}" data-img1="${item.img1}" data-img2="${item.img2}">
            <div class="content">
              ${item.reduction ? `<del>${item.prix} ${item.devise}</del><span class="reduced-price">${item.reduction} ${item.devise}</span>` : `<span>${item.prix} ${item.devise}</span>`}
              <button class="add-to-cart-btn" data-title="${item.titre}" data-price="${item.reduction || item.prix}" data-img="${item.img1}">Ajouter au panier</button>
            </div>
          </div>
        `;
        container.appendChild(article);
      });
    
      const productImages = container.querySelectorAll('.product-img');
      productImages.forEach(imgElement => {
        imgElement.addEventListener('mouseover', function() {
          this.src = this.dataset.img2;
        });
        imgElement.addEventListener('mouseout', function() {
          this.src = this.dataset.img1;
        });
      });
      const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
      addToCartBtns.forEach(btn => {
        btn.addEventListener('click', addToCart);
      });
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des données :", error);
    });
    const detailsBtns = document.querySelectorAll('.details-btn');
      detailsBtns.forEach(btn => {
        btn.addEventListener('click', redirectToDetails);
    });
}

/******************************************************************************************/


function displayCart() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const popup = document.createElement('div');
  popup.classList.add('popup');

  const popupContent = document.createElement('div');
  popupContent.classList.add('popup-content');

  popupContent.innerHTML = `
    <h2>Votre panier</h2>
    <div class="custom-content">
    </div>
    <div class="footer">
    </div>
  `;

  const closeBtnContainer = document.createElement('div');
  closeBtnContainer.classList.add('close-btn-container');

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('close-btn');
  closeBtn.textContent = 'Fermer';

  closeBtn.addEventListener('click', function() {
    popup.remove();
  });

  closeBtnContainer.appendChild(closeBtn);

  popup.appendChild(popupContent);
  popup.appendChild(closeBtnContainer);
  document.body.appendChild(popup);

  updateCart();
}



const caddieBtn = document.querySelector('.caddie');
caddieBtn.addEventListener('click', () => {
  displayCart();
});

/******************************************************************************************/


function addToCart(event) {
  const title = event.target.dataset.title;
  const price = parseFloat(event.target.dataset.price);
  const img = event.target.dataset.img;

  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const itemIndex = cartItems.findIndex(item => item.title === title);

  if (itemIndex > -1) {
    cartItems[itemIndex].quantity += 1;
  } else {
    const newItem = { title, price, img, quantity: 1 };
    cartItems.push(newItem);
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCart();
}


/******************************************************************************************/

function removeItemFromCart(event) {
  const index = parseInt(event.target.dataset.index);
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  cartItems.splice(index, 1);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  updateCart();
}

/******************************************************************************************/

function updateCart() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const customContent = document.querySelector('.popup-content .custom-content');
  customContent.innerHTML = '';

  cartItems.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <img src="${item.img}" class="cart-item-img">
      <p>${item.title}</p>
      <p>${item.price} €</p>
      <p>Quantité : ${item.quantity}</p>
      <button class="remove-item-btn" data-index="${index}">Supprimer</button>
    `;
    customContent.appendChild(itemElement);
  });

  const footer = document.querySelector('.popup-content .footer');

  let cartFooter = footer.querySelector('.cart-footer');

  if (!cartFooter) {
    cartFooter = document.createElement('div');
    cartFooter.classList.add('cart-footer');
    footer.appendChild(cartFooter);
  }

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  cartFooter.innerHTML = `
    <p>Prix total: ${totalPrice.toFixed(2)} €</p>
    <button class="clear-cart-btn">Vider le panier</button>
    <button class="checkout-btn">Commander</button>
  `;

  const clearCartBtn = cartFooter.querySelector('.clear-cart-btn');
  clearCartBtn.addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    updateCart();
  });

  const removeItemBtns = document.querySelectorAll('.remove-item-btn');
  removeItemBtns.forEach(btn => {
    btn.addEventListener('click', removeItemFromCart);
  });
}

/******************************************************************************************/

function redirectToDetails(event) {
  const itemId = event.target.dataset.id;
  window.location.href = `/detail?id=${itemId}`;
}

