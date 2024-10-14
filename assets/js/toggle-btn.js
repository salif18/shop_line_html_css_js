document.addEventListener("DOMContentLoaded", () => {
    // Ton code ici
    const profilContainer = document.querySelector(".profil-container");
    const userBtn = document.querySelector(".fa-user");
    const cartContainer = document.querySelector(".cart-container");
    const cartBtn = document.querySelector(".fa-shopping-cart");
    const closeCartBtn = document.querySelector(".close-cart");
    const closeProfil = document.querySelector(".fa-remove");
    const btnLogout = document.querySelector(".btn-logout");
    const nameUser = document.querySelector("#user-name");
    const emailUser = document.querySelector("#user-email");

    // Gestion du clic sur l'icône du panier
    cartBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (cartContainer.style.display === "none") {
            cartContainer.style.display = "flex";
            cartContainer.setAttribute("aria-hidden", "false");
            setTimeout(() => {
                cartContainer.style.opacity = 1;
                cartContainer.style.transform = 'translateY(0)';
            }, 400);
        } else {
            cartContainer.style.opacity = '0';
            cartContainer.style.transform = 'translateY(-100px)';
            setTimeout(() => {
                cartContainer.style.display = 'none';
            }, 400);
        }
    });

    // Fermer le panier avec l'icône de fermeture
    closeCartBtn.addEventListener("click", () => {
        cartContainer.style.display = "none";
    });

    // Gestion du clic sur l'icône utilisateur
    userBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (profilContainer.style.display === "none") {
            profilContainer.style.display = "flex";
            profilContainer.setAttribute("aria-hidden", "false");
            setTimeout(() => {
                profilContainer.style.opacity = 1;
                profilContainer.style.transform = 'translateY(0)';
            }, 400);
        } else {
            profilContainer.style.opacity = '0';
            profilContainer.style.transform = 'translateY(10px)';
            setTimeout(() => {
                profilContainer.style.display = 'none';
                profilContainer.setAttribute("aria-hidden", "true");
            }, 400);
        }
    });

    // Fermer le profil avec l'icône de fermeture
    closeProfil.addEventListener("click", () => {
        profilContainer.style.display = "none";
    });

    // Fonction pour afficher les données de l'utilisateur
    const displayUserData = () => {
        if (nameUser && emailUser) {
            nameUser.textContent = localStorage.getItem('nom') || "Nom utilisateur";
            emailUser.textContent = localStorage.getItem('email') || "email@exemple.com";
        }
    };

    // Appel de la fonction
    displayUserData();

    // Gestion du logout
    btnLogout.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("numero");
        // Redirection après déconnexion
        // window.location.href = "/pages/login.html";
    });
});
