 // Fonction pour changer l'image principale en fonction de l'image sélectionnée
 function changeImage(imgSrc) {
    document.querySelector('#main-image').src = imgSrc;
}

document.addEventListener('DOMContentLoaded', () => {
    const productDetail = document.querySelector(".product-info");

    // Fonction pour obtenir l'ID du produit depuis l'URL
    const getProductIdFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    // Récupérer l'ID du produit
    const productId = getProductIdFromUrl();

    // Rechercher le produit dans la liste par son ID
    const product = data.find(p => p.id == productId);

    if (product) {
        productDetail.innerHTML = `
            <h2>${product.name}</h2>
            <p class="price">${product.price} FCFA </p>
            <p class="rating">★★★★★ (${product.avis})</p>
            <h2 class="">${product.category}</h2>
            <h2 class="">${product.sousCategory}</h2>
            <h2 class="">${product.marque}</h2>
            <p class="description">${product.description}</p>

            <div class="product-options">
                <label for="size">Taille:</label>
                <select id="size">
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                </select>
            </div>

            <div class="product-options">
                <label for="color">Couleur:</label>
                <select id="color">
                    <option value="red">Rouge</option>
                    <option value="blue">Bleu</option>
                    <option value="green">Vert</option>
                </select>
            </div>

            <button id="add-to-cart" onclick="addToCart(${product.id})">
                Ajouter <i class="fas fa-shopping-cart"></i>
            </button>
        `;
        // Afficher la galerie d'images avec les images spécifiques du produit
        renderImageGallery(product);
    } else {
        productDetail.innerHTML = "<p>Produit non trouvé</p>";
    }

   
    // Fonction pour générer dynamiquement la galerie d'images
    function renderImageGallery(product) {
       
        const productImageContainer = document.querySelector(".product-images");
        productImageContainer.innerHTML = `
            <img id="main-image" src="${product.img}" alt="Produit">
            <div class="image-gallery">
                ${product.gallery.map(src => 
                    `<img src="${src}" alt="Produit" class="thumbnail" onclick="changeImage('${src}')">`
                ).join('')}
            </div>
        `;
    }
});
