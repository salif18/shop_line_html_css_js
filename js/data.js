// tableau pour les nouveaux arrivages
const dataNewArrival = [
    { id: 1, img: "images/watch.png", price: 12, name: "Watch" },
    { id: 2, img: "images/img.png", price: 50, name: "Watch2" },
    { id: 3, img: "images/watch.png", price: 25, name: "Watch" },
    { id: 4, img: "images/img.png", price: 9, name: "Watch2" },
];

// tableau des elements du sliders
const dataSlider = [
    { id: 1, img: "images/watch.png", price: 12, name: "Watch" },
    { id: 2, img: "images/img.png", price: 50, name: "Watch2" },
    { id: 3, img: "images/watch.png", price: 25, name: "Watch" },
    { id: 4, img: "images/img.png", price: 9, name: "Watch2" },
    { id: 5, img: "images/watch.png", price: 25, name: "Watch" },
    { id: 6, img: "images/img.png", price: 9, name: "Watch2" },
];

// Initialisation du panier
let cart = [];

// initialisation de l'index des elements 
let currentIndex = 0;

// recuperation des element html de DOM
const arrivalContainer = document.querySelector(".arrival-container");
const articlesContainer = document.querySelector(".articles-items");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

// Nombre d'articles visibles en même temps
const itemsToShow = 2;
const totalItems = dataSlider.length;

// afficher les new arrivage
const displayItemArrival = () => {
    dataNewArrival.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}" />
            <section class="card-info">
                <h2>${item.name}</h2>
                <p>$${item.price}</p>
            </section>
        `;
        arrivalContainer.appendChild(div);
    });
}

// afficher les donneer slider
const displayArticleSlider = () => {
    dataSlider.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}" />
            <section class="card-info">
                <h2>${item.name}</h2>
                <p>$${item.price}</p>
            </section>
            <button onclick="addToCart(${item.id})">Ajouter au Panier</button>
        `;
        articlesContainer.appendChild(div);
    });
}

// Fonction pour faire défiler les articles
const updateSliderPosition = () => {
    const itemWidth = articlesContainer.querySelector(".card").offsetWidth;
    const newPosition = -currentIndex * itemWidth;
    articlesContainer.style.transform = `translateX(${newPosition}px)`;
};

// Gestion des boutons
nextButton.addEventListener("click", () => {
    if (currentIndex < totalItems - itemsToShow) {
        currentIndex++;
        updateSliderPosition();
    }
});

prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSliderPosition();
    }
});


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
        div.classList.add("cards");
        div.innerHTML = `
            <img src=${item.img} alt="${item.name}" />
            <section class="cards-info">
                <h2>${item.name}</h2>
                <p>$${item.price}</p>
            </section>
            <section class="cards-btns">
                <button class="btn-minus" data-id="${item.id}">-</button>
                <span class="qty">${item.qty}</span>
                <button class="btn-plus" data-id="${item.id}">+</button>
            </section>
            <button onclick="removeFromCart(${item.id})"><i class="fas fa-remove" ></i></button>
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


// Initialisation lors du chargement de la page
window.onload = () => {
    displayItemArrival();
    displayArticleSlider();
    loadCart(); // Charger le panier existant
}
