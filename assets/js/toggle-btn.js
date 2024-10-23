document.addEventListener("DOMContentLoaded", () => {
    // Ton code ici
    const profilContainer = document.querySelector(".profil-container");
    const userBtn = document.querySelector(".fa-user");
    const closeProfil = document.querySelector(".fa-remove");
    const btnLogout = document.querySelector(".btn-logout");
    const nameUser = document.querySelector("#user-name");
    const emailUser = document.querySelector("#user-email");

    
    // Gestion du clic sur l'icône utilisateur
    userBtn.addEventListener("mouseover", (e) => {
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
