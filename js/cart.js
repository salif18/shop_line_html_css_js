// recuperer le button de click vers address
const addressBtn = document.querySelector(".btn-address");
// Initialisation du panier
let cart = [];

// Fonction pour ajouter un produit au panier
function addToCart(productId) {
    const product = dataSlider.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.qty += 1; // Si le produit est déjà dans le panier, augmenter la quantité
    } else if (product) {
        cart.push({ ...product, qty: 1 });
    }
    saveCart();
    displayCartData(); // Réafficher les données du panier
}


// Affichage des données du panier
const displayCartData = () => {
    const containerItem = document.querySelector(".cart-items");
    containerItem.innerHTML = ""; // Réinitialiser les éléments du panier avant de les afficher

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
            <button class="btn-remove-cart" onclick="removeFromCart(${item.id})"><i class="fas fa-trash" ></i></button>
        `;
        containerItem.appendChild(div);
    });
    // Ajout des événements pour les boutons + et -
    document.querySelectorAll(".btn-plus").forEach(button => {
        button.addEventListener("click", (e) => {
            const id = parseInt(e.target.getAttribute("data-id"));
            updateCartQuantity(id, "increase");
        });
    });
    document.querySelectorAll(".btn-minus").forEach(button => {
        button.addEventListener("click", (e) => {
            const id = parseInt(e.target.getAttribute("data-id"));
            updateCartQuantity(id, "decrease");
        });
    });
}


// Met à jour la quantité dans le panier
const updateCartQuantity = (id, action) => {
    const item = cart.find(item => item.id === id);
    if (action === "increase") {
        item.qty += 1;
    } else if (action === "decrease" && item.qty > 1) {
        item.qty -= 1;
    }
    saveCart();  // Sauvegarder après la mise à jour
    displayCartData(); // Réafficher les éléments du panier avec les nouvelles quantités
}


// Fonction pour supprimer un produit du panier
function removeFromCart(itemId) {
    cart = cart.filter((e) => e.id !== itemId); // Supprimer l'élément à l'index donné
    saveCart();
    displayCartData();
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

// cliquer pour naviguer vers la page address ou login 
addressBtn.addEventListener("click", () => {
    window.location.href = "addresse.html";
});

// Initialisation lors du chargement de la page
window.onload = () => {
    displayItemArrival();
    displayArticleSlider();
    loadCart(); // Charger le panier existant
}
