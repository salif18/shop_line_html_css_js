// Recuperation des elements DOM
const profilContainer = document.querySelector(".profil-container");
const userBtn = document.querySelector(".fa-user");


userBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Si le profil est actuellement visible
    if (profilContainer.classList.contains("profil-container-active")) {
        profilContainer.classList.remove("profil-container-active");

        // Attendre la fin de la transition pour masquer le conteneur
        setTimeout(() => {
            profilContainer.style.display = "none";
        }, 400); // Durée de la transition en CSS

    } else {
        // Afficher le conteneur du profil avec une animation
        profilContainer.style.display = "flex"; // Affiche le profil avant d'ajouter la classe active

        setTimeout(() => {
            profilContainer.classList.add("profil-container-active");
        }, 10); // Petite pause pour permettre au navigateur de rafraîchir avant d'ajouter la classe active
    }
});




