// On récupère les éléments nécessaires du DOM (Document Object Model) pour les manipuler par la suite
const profilContainer = document.querySelector(".profil-container");
const userBtn = document.querySelector(".fa-user");
const cartContainer = document.querySelector(".cart-container");
const cartBtn = document.querySelector(".fa-shopping-cart");
const closeCartBtn = document.querySelector(".close-cart");
const closeProfil = document.querySelector(".fa-remove");

// Gestion du clic sur l'icône du panier
cartBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du bouton (par exemple, empêcher la redirection si c'est un lien)

    // Vérifie si le panier est actuellement caché
    if (cartContainer.style.display === "none") {
        // Si le panier est caché, on l'affiche avec une animation
        cartContainer.style.display = "flex"; // On passe en affichage "flex" pour montrer le conteneur
        cartContainer.setAttribute("aria-hidden", "false"); // Le panier est visible
        // Petite pause avant d'appliquer l'opacité et le déplacement pour une animation fluide
        setTimeout(() => {
            cartContainer.style.opacity = 1; // Rend le panier visible (opacité à 1)
            cartContainer.style.transform = 'translateY(0)'; // Replace le panier à sa position d'origine
            cartContainer.setAttribute("aria-hidden", "true"); // Le panier est caché
        }, 400); // 400 millisecondes de délai avant la transition (correspond à la durée de l'animation en CSS)
    } else {
        // Si le panier est déjà visible, on le cache avec une animation inverse
        cartContainer.style.opacity = '0'; // Rendre le panier invisible (opacité à 0)
        cartContainer.style.transform = 'translateY(-100px)'; // Le déplace légèrement vers le haut
        // Après l'animation, on cache complètement le conteneur
        setTimeout(() => {
            cartContainer.style.display = 'none'; // Masque le conteneur du panier
        }, 400); // Pause pour laisser l'animation se terminer avant de masquer l'élément
    }
});

// Fermer le panier avec l'icône de fermeture
closeCartBtn.addEventListener("click", () => {
    cartContainer.style.display = "none"; // Cache immédiatement le panier lorsque l'utilisateur clique sur l'icône de fermeture
});

// Gestion du clic sur l'icône utilisateur
userBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du bouton

    // Si le conteneur du profil est caché, on l'affiche avec une animation
    if (profilContainer.style.display === "none") {
        profilContainer.style.display = "flex"; // Affiche le conteneur du profil
        profilContainer.setAttribute("aria-hidden", "false"); // Profil visible
        // Attendre un petit moment avant d'appliquer l'opacité et le déplacement
        setTimeout(() => {
            profilContainer.style.opacity = 1; // Rend le profil visible (opacité à 1)
            profilContainer.style.transform = 'translateX(0)'; // Replace le profil à sa position d'origine
        }, 400); // Pause pour une transition fluide
    } else {
        // Si le profil est déjà visible, on le cache avec une animation inverse
        profilContainer.style.opacity = '0'; // Rendre le profil invisible
        profilContainer.style.transform = 'translateX(10px)'; // Déplace légèrement le profil vers la droite
        // Après l'animation, on cache complètement le conteneur du profil
        setTimeout(() => {
            profilContainer.style.display = 'none'; // Masque le conteneur du profil
            profilContainer.setAttribute("aria-hidden", "true"); // Profil caché
        }, 400); // Pause pour permettre la transition avant de cacher l'élément
    }
});

// Fermer le profil avec l'icône de fermeture
closeProfil.addEventListener("click", () => {
    profilContainer.style.display = "none"; // Cache immédiatement le profil lorsque l'utilisateur clique sur l'icône de fermeture
});
