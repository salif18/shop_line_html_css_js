document.addEventListener("DOMContentLoaded",function(){
const productList = document.querySelector(".product-list");

document.getElementById('price-filter').addEventListener('input', function() {
    let priceValue = document.getElementById('price-filter').value;
    document.getElementById('price-value').textContent = `Max: $${priceValue}`;
});

document.getElementById('sort').addEventListener('change', function() {
    const sortBy = this.value;
    // Sort products based on the selected option (add sorting logic here)
    console.log("Sorting by: " + sortBy);
});

// Implement the search functionalityq
document.getElementById('search-input').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('h2').textContent.toLowerCase();
        if (productName.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});


// Générer la liste des produits
dataNewArrival.forEach(product => {
    productList.innerHTML += `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.img}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Prix: ${product.price} FCFA</p>
            <p class="rating">⭐⭐⭐⭐☆</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Ajouter <i class="fas fa-shopping-cart"></i> </button>
        </div>
    `;
});

// Ajouter un écouteur de clic à chaque produit
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('click', function() {
        const productId = this.getAttribute('data-id'); // Récupérer l'ID du produit à partir de l'attribut data-id
        window.location.href = `${basePath}/pages/single.html?id=${productId}`;
    });
});

});