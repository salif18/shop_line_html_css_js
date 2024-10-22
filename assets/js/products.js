document.addEventListener("DOMContentLoaded", () => {
    const productList = document.querySelector(".product-list");

    // Récupérer les valeurs de filtrage
    const getFilters = () => {
        const selectedCategories = Array.from(document.querySelectorAll('.filter-category input[type="checkbox"]:checked'))
            .map(el => el.nextSibling.textContent.trim());
        const maxPrice = document.querySelector('#price-filter').value;
        const selectedRating = document.querySelector('input[name="rating"]:checked')?.value || '';
        const searchQuery = document.querySelector('#search-input').value.toLowerCase();

        return { selectedCategories, maxPrice, selectedRating, searchQuery };
    };

    // Convertir les étoiles en valeurs numériques
    const ratingToValue = (rating) => {
        switch (rating) {
            case '★★★★★': return 5;
            case '★★★★': return 4;
            case '★★★': return 3;
            default: return 0;
        }
    };

    // Filtrer les produits en fonction des critères sélectionnés
    const filterProducts = () => {
        const filters = getFilters();

        // Filtrer le tableau de données
        const filteredProducts = data.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(filters.searchQuery) ||
                product.category.toLowerCase().includes(filters.searchQuery) ||
                product.sousCategory.toLowerCase().includes(filters.searchQuery);

            const matchesCategory = filters.selectedCategories.length === 0 ||
                filters.selectedCategories.includes(product.category) ||
                filters.selectedCategories.includes(product.sousCategory);

            const matchesPrice = product.price <= filters.maxPrice;

            const matchesRating = filters.selectedRating === '' || ratingToValue(product.rating) >= ratingToValue(filters.selectedRating);

            return matchesSearch && matchesCategory && matchesPrice && matchesRating;
        });

        // Mettre à jour l'affichage des produits
        displayProducts(filteredProducts);
    };

    // Fonction pour afficher les produits
    const displayProducts = (products) => {
        productList.innerHTML = ''; // Vider la liste des produits
        products.forEach(product => {
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

        // Ajouter des écouteurs de clic pour chaque produit affiché
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function () {
                const productId = this.getAttribute('data-id');
                window.location.href = `${basePath}/pages/single.html?id=${productId}`;
            });
        });
    };

    // Écouter les changements de filtres
    document.querySelector('#price-filter').addEventListener('input', function () {
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

    // Afficher les produits au chargement initial
    displayProducts(data);
});
