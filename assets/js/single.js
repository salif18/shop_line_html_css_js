// Fonction pour changer l'image principale en fonction de l'image sélectionnée
const changeImage=(imgSrc)=>{
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
        // Assurez-vous que `selectedSize` a une valeur initiale.
        let selectedSize = "";
        let selectedColor = "";
        // let sizeSelectorId = product.category === "Vetements" ? "vetement-size" : "chaussure-size";

        productDetail.innerHTML = `    
            <h2>${product.name}</h2>
            <p class="price">${product.price} FCFA </p>
            <div class="rating">${generatedStars(product.rating)}  <span style="color: green;">( ${product.rating} )</span></div>
            <h2 class="">${product.category}</h2>
            <h2 class="">${product.sousCategory}</h2>
            <h2 class="">${product.marque}</h2>
            <p class="description">${product.description}</p>

           ${product.otherColors.length > 0 ? 
             `<div class="product-options">
               <label for="color">Couleur:</label>
                <select id="color">
                     ${product.otherColors.map(element =>
                    `<option class="size" value="${element.color}">${element.color}</option>`
                     ).join('')}
                </select>
             </div>`
             :""
            }

            <div class="product-options">
              ${product.category === "Vetements" ? 
               `<label for="vetement-size">Taille:</label>
                 <select id="vetement-size">
                 ${product.sizes.map(size =>
                    `<option class="size" value="${size}">${size}</option>`
                   ).join('')}
                 </select>
               ` : ''}
            
              ${product.category === "Chaussures" ? 
               `<label for="chaussure-size">Pointure:</label>
                 <select id="chaussure-size">
                 ${product.sizes.map(size =>
                    `<option class="size" value="${size}">${size}</option>`
                  ).join('')}
                </select>
               ` : ''}
            </div>

            <button id="add-to-cart">
                Ajouter <i class="fas fa-shopping-cart"></i>
            </button>

            <section class='zone-de-notation'>
              <h2>Donner une note</h2>
             <section id="stars">
                   <span class="star" data-value="1">★</span>
                   <span class="star" data-value="2">★</span>
                   <span class="star" data-value="3">★</span>
                   <span class="star" data-value="4">★</span>
                   <span class="star" data-value="5">★</span>
            </section>
             <span class='rating-message'></span>
            </section>
    
        `;

        // Controlleur de couleur
        document.querySelector(`#color`)?.addEventListener('change', (e) => {
            selectedColor = e.target.value;
            console.log("Nouvelle taille/pointure sélectionnée :", selectedColor);
        });


        //controlleur Attache l'écouteur d'événements pour la taille ou la pointure sélectionnée
        if (document.querySelector(`#chaussure-size`)) {
            document.querySelector(`#chaussure-size`)?.addEventListener('change', (e) => {
                selectedSize = e.target.value;
                console.log("Nouvelle taille/pointure sélectionnée :", selectedSize);
            });
        } else {
            document.querySelector(`#vetement-size`)?.addEventListener('change', (e) => {
                selectedSize = e.target.value;
                console.log("Nouvelle taille/pointure sélectionnée :", selectedSize);
            });
        }

        // attacher evenement dajout de cart
        document.querySelector("#add-to-cart").addEventListener("click", (e) => {
            e.preventDefault();
            addToCart(product.id, selectedSize, selectedColor);
        })


        renderImageGallery(product);
        productLier(product);
    } else {
        productDetail.innerHTML = "<p>Produit non trouvé</p>";
    }



    // Fonction pour générer dynamiquement la galerie d'images
    function renderImageGallery(product) {

        const productImageContainer = document.querySelector(".product-images");
        productImageContainer.innerHTML = `
        <div>
            <img id="main-image" src="${product.img}" alt="Produit">
            <div class="image-gallery">
                ${product.gallery.map(src =>
            `<img src="${src}" alt="Produit" class="thumbnail" onclick="changeImage('${src}')">`
        ).join('')}
            </div>
        </div>
        <div class="color-options">
          ${product. otherColors.map(element =>
                `<button class="color-swatch" style="background-color: ${element.color};" data-image="${element.image}" onclick="changeImage('${element.image}')"></button>`
            ).join('')}
        </div>
        `;
    }
    // Fonction pour afficher les produits liés
    function productLier(product) {
        const productsItem = document.querySelector(".produits-items-lies");

        // Filtrer les produits liés
        const productsArray = data.filter((item) =>
            (item.category === product.category ||
                item.sousCategory === product.sousCategory ||
                item.marque === product.marque) &&
            item.id !== product.id  // Exclure le produit actuel
        );
        // Extraire les marques des produits liés sans doublons
        const marques = productsArray.map(item => item.marque);
        // Générer le HTML pour les produits liés

        productsArray.forEach((element) => {
            productsItem.innerHTML += `
            <div class="product-card" data-id="${element.id}">
                <img src="${element.img}" alt="${element.name}">
                <h2>${element.name}</h2>
                <p class="product-category">${element.category}</p>
                <p class="product-sous-category">${element.sousCategory}</p>
                <p class="product-price">${element.price} FCFA</p>
                <div class="rating">${generatedStars(element.rating)}</div>
            </div>
        `;
        });


        // Ajouter un écouteur de clic à chaque produit
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.addEventListener('click', function () {
                const productId = this.getAttribute('data-id'); // Récupérer l'ID du produit à partir de l'attribut data-id
                window.location.href = `${basePath}/pages/single.html?id=${productId}`;
            });
        });

        markLier(marques);
    }

    // regenrer les etoiles
    function generatedStars(rating) {
        // Affichage des étoiles
        const maxStars = 5;
        const starRating = Math.round(rating / 20);

        let starsHtml = '';
        // Générer les étoiles
        for (let note = 1; note <= maxStars; note++) {
            // Ajouter une étoile remplie si `note` est inférieur ou égal à la note calculée
            starsHtml += (note <= starRating)
                ? '<span class="star filled">★</span>'  // Étoile remplie
                : '<span class="star">★</span>';        // Étoile vide
        }
        return starsHtml; // Retourner toutes les étoiles en HTML
    }


    // Fonction pour afficher les marques liées
    function markLier(marques) {
        const marksItem = document.querySelector(".marques-items-lies");

        // Filtrer les marques uniques pour éviter les doublons
        const uniqueMarques = [...new Set(marques)];

        // Filtrer les produits liés
        const marksArray = markData.filter((item) =>
            uniqueMarques.includes(item.name)// Vérifie si la marque est dans la liste unique 

        );


        // Générer le HTML pour les marques liées
        marksArray.forEach((marque) => {
            marksItem.innerHTML += `
          <div class="product-card" data-id="${marque.id}">
                <img src="${marque.img}" alt="${marque.name}">
            </div>
            `;
        });
    }

    // NOTATION
    // Sélectionne tous les éléments étoile
    const stars = document.querySelectorAll('.star');
    const ratingMessage = document.querySelector('.rating-message');

    // Fonction pour mettre à jour l'affichage des étoiles
    function updateStars(rating) {
        stars.forEach(star => {
            // Si l'étoile a une valeur inférieure ou égale à la note, on lui ajoute la classe "selected"
            if (star.getAttribute('data-value') <= rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }

    // Ajoute des écouteurs d'événements pour chaque étoile
    stars.forEach(star => {
        star.addEventListener('click', function () {
            const rating = star.getAttribute('data-value');
            const formData = {
                productId: productId,
                userId: token,
                rating: rating
            }

            updateStars(rating);
            // envoie vers server
            console.log(formData)
            ratingMessage.textContent = `Vous avez donné une note de ${rating} étoiles.`;
        });

    });

    // changement de couleur du produit
    document.querySelectorAll(".color-swatch").forEach((button) => {
        button.addEventListener("click", (event) => {
            const imageSource = event.target.getAttribute("data-image");
            document.getElementById("main-image").src = imageSource;
        });
    });


});
