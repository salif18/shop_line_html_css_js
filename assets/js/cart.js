// Initialisation du panier
let cart = [];

// Récupérer le bouton de clic vers la page adresse
const addressBtn = document.querySelector(".btn-address");

// Vérification que le bouton existe avant d'ajouter l'événement
if (addressBtn) {
    // Clic pour naviguer vers la page adresse ou login
    addressBtn.addEventListener("click", () => {
        window.location.href = `${basePath}/pages/addresse.html`;
    });
} else {
    console.error('Le bouton ".btn-address" est introuvable dans le DOM.');
}


// Affichage des données du panier
const displayCartData = () => {
    const containerItem = document.querySelector(".cart-items");

    // Vérification que l'élément container existe avant de manipuler son contenu
    if (containerItem) {
        containerItem.innerHTML = ""; // Réinitialiser les éléments du panier avant de les afficher

        if (cart.length > 0) {
            cart.map((item) => {
                const div = document.createElement("div");
                div.classList.add("card-cart");
                div.innerHTML = `
                    <img src=${item.img} alt="${item.name}" />
                    <section class="card-cart-info">
                        <h2>${item.name}</h2>
                        <p>$${item.price}</p>
                    </section>
                    <section class="card-cart-btn">
                        <button class="btn-minus" data-id="${item.id}">-</button>
                        <span class="qty">${item.qty}</span>
                        <button class="btn-plus" data-id="${item.id}">+</button>
                    </section>
                    <button class="btn-remove-cart" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                `;

                // Gestion des événements pour augmenter/diminuer la quantité
                div.querySelector(".btn-minus").addEventListener("click", () => {
                    if (item.qty > 1) {
                        item.qty -= 1;
                    } else {
                        removeFromCart(item.id); // Supprimer l'élément s'il n'en reste plus
                    }
                    saveCart(); // Sauvegarder après la mise à jour
                    displayCartData(); // Réafficher les éléments du panier
                    calculeTotal(); // Recalculer le total
                });

                div.querySelector(".btn-plus").addEventListener("click", () => {
                    item.qty += 1;
                    saveCart(); // Sauvegarder après la mise à jour
                    displayCartData(); // Réafficher les éléments du panier
                    calculeTotal(); // Recalculer le total
                });

                // Ajouter l'élément au container
                containerItem.appendChild(div);
            });
        } else {
            const h2 = document.createElement("h2");
            h2.classList.add("empty-cart");
            h2.innerHTML = "Votre panier est vide !!";
            containerItem.appendChild(h2);
        }
    } else {
        console.error('Élément ".cart-items" non trouvé dans le DOM');
    }
};

// Fonction pour ajouter un produit au panier
function addToCart(productId) {
    const product = data.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.qty += 1; // Si le produit est déjà dans le panier, augmenter la quantité
    } else if (product) {
        cart=[...cart,{ ...product, qty: 1 }];
    }

    saveCart();
    displayCartData(); // Réafficher les données du panier
    calculeTotal(); // Recalculer le total
}

// Fonction pour supprimer un produit du panier
function removeFromCart(itemId) {
    cart = cart.filter((e) => e.id !== itemId); // Supprimer l'élément à l'index donné
    saveCart();
    displayCartData(); // Réafficher les données du panier
    calculeTotal(); // Recalculer le total
}

// Appel initial pour afficher les données du panier
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        try {
            cart = JSON.parse(storedCart);
        } catch (e) {
            cart = []; // Si des erreurs surviennent, réinitialiser le panier
        }
    }
    displayCartData();
}

// Fonction pour sauvegarder le panier dans localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Calcul du total du panier
function calculeTotal() {
    let total = cart.map((item) => item.price * item.qty).reduce((a, b) => a + b, 0);
    let qty = cart.map((item) => item.qty).reduce((a, b) => a + b, 0);

    const sommeTotalElement = document.querySelector(".somme-total");
    const qtyTotalElement = document.querySelector(".qty-total");
    const cartQty = document.querySelector(".cartqty");

    // Vérification que les éléments existent avant de les modifier
    if (sommeTotalElement) {
        sommeTotalElement.innerHTML = `${total} FCFA`;
    } else {
        console.error('Élément ".somme-total" non trouvé dans le DOM');
    }

    if (qtyTotalElement) {
        qtyTotalElement.innerHTML = qty;
        if (cartQty && cart.length > 0) {
            cartQty.innerHTML = qty;
        }
    } else {
        console.error('Élément ".qty-total" non trouvé dans le DOM');
    }
}

// Initialisation lors du chargement de la page
document.addEventListener("DOMContentLoaded", function() {
    loadCart(); // Charger le panier existant
    calculeTotal(); // Calculer le total
});
