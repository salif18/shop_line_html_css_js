// Afficher les détails du produit si trouvé

document.addEventListener('DOMContentLoaded', () => {
    const productDetail = document.querySelector(".product-info");

    // Fonction pour obtenir l'ID du produit depuis l'URL
    const getProductIdFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }
//   €
    // Récupérer l'ID du produit
    const productId = getProductIdFromUrl();

    // Rechercher le produit dans la liste par son ID
    const product = dataNewArrival.find(p => p.id == productId);

    if (product) {
        productDetail.innerHTML = `
        
                <h2>${product.name}</h2>
                <p class="price">${product.price} FCFA </p>
                <p class="rating">★★★★★ (200 avis)</p>
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
        
            <button id="add-to-cart" onclick="addToCart(${product.id})">Ajouter <i class="fas fa-shopping-cart"></i></button>
           
        `;

    } else {
        productDetail.innerHTML = "<p>Produit non trouvé</p>";
    }
});
// Fonction pour changer l'image principale en fonction de l'image sélectionnée
function changeImage(imgElement) {
    const mainImage = document.querySelector('#main-image');
    mainImage.src = imgElement.src;
}

// Fonction pour générer dynamiquement la galerie d'images
function renderImageGallery(images) {
    // Sélectionner l'élément où la galerie d'images sera insérée
    const productImage = document.querySelector(".product-images");

    // Créer le conteneur pour les images
    const productImagesContainer = document.createElement("div");
    productImagesContainer.classList.add("product-images");

    // Créer l'image principale
    const mainImage = document.createElement("img");
    mainImage.src = images[0];  // L'image principale sera la première par défaut
    mainImage.id = "main-image";
    mainImage.alt = "Produit";

    // Ajouter l'image principale au conteneur
    productImagesContainer.appendChild(mainImage);

    // Créer le conteneur pour la galerie d'images
    const imageGallery = document.createElement("div");
    imageGallery.classList.add("image-gallery");

    // Parcourir les images et créer les miniatures
    images.forEach((imageSrc) => {

        const thumbnail = document.createElement("img");
        thumbnail.src = imageSrc;
        thumbnail.alt = "Produit";
        thumbnail.classList.add("thumbnail");

        // Ajouter un événement onclick pour changer l'image principale lors du clic sur la miniature
        thumbnail.addEventListener("click", () => changeImage(thumbnail));

        // Ajouter la miniature au conteneur de la galerie
        imageGallery.appendChild(thumbnail);
    });

    // Ajouter la galerie d'images au conteneur principal
    productImagesContainer.appendChild(imageGallery);

    // // Insérer tout cela dans la section product-detail
    productImage.appendChild(productImagesContainer);
}

// Exemple d'images de produit (à remplacer par tes propres données)
const productImages = [
    `${basePath}/assets/images/watch.png`,
    `${basePath}/assets/images/img.png`,
    `${basePath}/assets/images/watch.png`
];

// Appel de la fonction pour afficher la galerie d'images
renderImageGallery(productImages);