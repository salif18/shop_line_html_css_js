const cartContainer = document.querySelector(".cart-container");
const cartBtn = document.querySelector(".fa-shopping-cart");
const closeCartBtn = document.querySelector(".close-cart");

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
closeCartBtn.addEventListener("click", () => {
    cartContainer.classList.remove("cart-container-active");
    setTimeout(() => {
        cartContainer.style.display = "none";
    }, 400);
});