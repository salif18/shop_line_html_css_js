const cartData = [
    { id: 1, img: "public/images/watch.png", price: 12, name: "Watch", qty: 1 },
    { id: 2, img: "public/images/img.png", price: 50, name: "Watch2", qty: 1 },
    { id: 3, img: "public/images/watch.png", price: 25, name: "Watch", qty: 1 },
    { id: 4, img: "public/images/img.png", price: 9, name: "Watch2", qty: 1 },
];

// Recuperation des elements DOM
const cartContainer = document.querySelector(".cart-container");
const profilContainer = document.querySelector(".profil-container");
const userBtn = document.querySelector(".fa-user");
const cartBtn = document.querySelector(".fa-shopping-cart");
const closeCartBtn = document.querySelector(".close-cart");

userBtn.addEventListener("click", (e) => {
    e.preventDefault();
    profilContainer.classList.toggle("profil-container-active");
    cartContainer.classList.remove("cart-container-active"); // Fermer le panier si le profil est ouvert
});

cartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    // Vérifie si le panier est actif ou non
    if (cartContainer.classList.contains("cart-container-active")) {
        cartContainer.classList.remove("cart-container-active");

        // Attendre la fin de la transition pour masquer le conteneur
        setTimeout(() => {
            cartContainer.style.display = "none";
        }, 400); // Durée de la transition en CSS
    } else {
        cartContainer.style.display = "flex"; // Affiche le panier avant l'ajout de l'animation
        setTimeout(() => {
            cartContainer.classList.add("cart-container-active");
        }, 10); // Pause pour permettre au navigateur de rafraîchir avant d'ajouter la classe active
    }
});

// Fermer le panier avec l'icône de fermeture
closeCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cartContainer.classList.remove("cart-container-active");
    setTimeout(() => {
        cartContainer.style.display = "none";
    }, 400);
});

// Affichage des données du panier
const displayCartData = () => {
    const containerItem = document.querySelector(".cart-items");
    containerItem.innerHTML = ""; // Réinitialiser les éléments du panier avant de les afficher

    cartData.map((item) => {
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
    const item = cartData.find(item => item.id === id);
    if (action === "increase") {
        item.qty += 1;
    } else if (action === "decrease" && item.qty > 1) {
        item.qty -= 1;
    }
    displayCartData(); // Réafficher les éléments du panier avec les nouvelles quantités
}

// Appel initial pour afficher les données du panier
displayCartData();


