// Liste de produits disponibles
const products = [
    { id: 1, name: 'Produit 1', price: 10 },
    { id: 2, name: 'Produit 2', price: 20 },
    { id: 3, name: 'Produit 3', price: 30 },
  ];
  
  // Initialisation du panier
  let cart = [];
  
  // Fonction pour afficher les produits sur la page
  function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Effacer le contenu précédent
  
    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      productDiv.innerHTML = `
        <span>${product.name} - $${product.price}</span>
        <button onclick="addToCart(${product.id})">Ajouter au Panier</button>
      `;
      productList.appendChild(productDiv);
    });
  }
  
  // Fonction pour ajouter un produit au panier
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
      cart.push(product);
      saveCart();
      displayCart();
    }
  }
  
  // Fonction pour afficher le panier
  function displayCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = ''; // Effacer le contenu précédent
  
    if (cart.length === 0) {
      cartDiv.innerHTML = '<p>Le panier est vide.</p>';
      return;
    }
  
    cart.forEach((item, index) => {
      const cartItemDiv = document.createElement('div');
      cartItemDiv.classList.add('cart-item');
      cartItemDiv.innerHTML = `
        <span>${item.name} - $${item.price}</span>
        <button onclick="removeFromCart(${index})">Supprimer</button>
      `;
      cartDiv.appendChild(cartItemDiv);
    });
  }
  
  // Fonction pour supprimer un produit du panier
  function removeFromCart(index) {
    cart.splice(index, 1); // Supprimer l'élément à l'index donné
    saveCart();
    displayCart();
  }
  
  // Fonction pour sauvegarder le panier dans localStorage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // Fonction pour charger le panier depuis localStorage
  function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      cart = JSON.parse(storedCart);
    }
    displayCart();
  }
  
  // Initialisation lors du chargement de la page
  window.onload = function() {
    displayProducts(); // Afficher la liste des produits
    loadCart(); // Charger le panier existant
  };