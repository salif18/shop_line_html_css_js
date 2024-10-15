document.addEventListener("DOMContentLoaded", () => {
    const productList = document.querySelector(".product-list");

    // Récupérer les valeurs de filtrage
    const getFilters = () => {
        const selectedCategories = Array.from(document.querySelectorAll('.filter-category input[type="checkbox"]:checked'))
            .map(el => el.nextSibling.textContent.trim());
        const maxPrice = document.querySelector('#price-filter').value;
        const selectedRating = document.querySelector('input[name="rating"]:checked')?.value || '';

        return { selectedCategories, maxPrice, selectedRating };
    };

    // Convertir les étoiles en valeurs numériques
    const ratingToValue = (rating) => {
        switch (rating) {
            case '★★★★★': return 5;
            case '★★★★': return 4;
            case '★★★': return 3;
            default: return 0; // Si aucune note correspond
        }
    };

    // Filtrer les produits en fonction des critères sélectionnés
    const filterProducts = () => {
        const filters = getFilters();
        const searchQuery = document.querySelector('#search-input').value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const productName = card.querySelector('h2').textContent.toLowerCase();
            const productCategory = card.querySelector('.product-category').textContent;
            const productSousCategory = card.querySelector('.product-sous-category').textContent;
            const productPrice = parseInt(card.querySelector('.product-price').textContent.replace(' FCFA', ''));
            const productRating = ratingToValue(card.querySelector('.rating').textContent.trim());

            const matchesSearch = productName.includes(searchQuery);
            const matchesCategory = filters.selectedCategories.length === 0 || filters.selectedCategories.includes(productCategory) || filters.selectedCategories.includes(productSousCategory);;
            const matchesPrice = productPrice <= filters.maxPrice;
            const matchesRating = filters.selectedRating === '' || productRating >= ratingToValue(filters.selectedRating);

            // Afficher ou masquer le produit en fonction des filtres
            if (matchesSearch && matchesCategory && matchesPrice && matchesRating) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    };

    // Écouter les changements de filtres
    document.querySelector('#price-filter').addEventListener('input', function() {
        document.querySelector('#price-value').textContent = `Max: ${this.value} FCFA`;
        filterProducts();
    });

    document.querySelectorAll('.filter-category input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    document.querySelectorAll('input[name="rating"]').forEach(radio => {
        radio.addEventListener('change', filterProducts);
    });

    document.querySelector('#search-input').addEventListener('input', filterProducts);

    // Générer la liste des produits (exemple de génération dynamique)
    data.forEach(product => {
        productList.innerHTML += `
            <div class="product-card" data-id="${product.id}">
                <img src="${product.img}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p class="product-category">${product.category}</p>
                <p class="product-sous-category">${product.sousCategory}</p>
                <p class="product-price">${product.price} FCFA</p>
                <p class="rating">${product.rating}</p>
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

    // Appliquer les filtres lors du chargement initial
    filterProducts();
});
