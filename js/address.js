const submitCommande = document.querySelector(".btn-submit-address");

// Sélection des éléments dans un objet
const fields = {
    userName: document.querySelector(".myNom"),
    userNumero: document.querySelector(".myPhone"),
    userEmail: document.querySelector(".myEmail"),
    userVille: document.querySelector(".myVille"),
    userRue: document.querySelector(".myRue"),
    userPorte: document.querySelector(".myPorte")
};

// Fonction pour valider et styliser un champ
function validateField(field, message) {
    const defaultPlaceholder = field.placeholder; // Capturer la valeur par défaut du placeholder
    if (field.value.trim().length <= 0) {
        field.placeholder = message;
        field.style.border = "2px solid orangered";
        field.style.color = "orangered";
        // Réinitialiser les champs 
        setTimeout(() => {
            field.placeholder = defaultPlaceholder;
            field.style.border = "";
            field.style.color = "";
        }, 1200);
        return false;
    }
    return true;
}

submitCommande.addEventListener("click", (e) => {
    e.preventDefault();

    // Si le token est manquant, redirige directement
    if (!token) {
        // Stocker l'URL actuelle de la page pour redirection après login
        const currentUrl = window.location.href;
        window.location.href = `login.html?redirect=${encodeURIComponent(currentUrl)}`;
        return;
    }

    // Validation de chaque champ
    let isValid = true;
    isValid &= validateField(fields.userName, "Veuillez rentrer votre nom");
    isValid &= validateField(fields.userNumero, "Veuillez entrer votre numéro");
    isValid &= validateField(fields.userEmail, "Veuillez entrer votre email");
    isValid &= validateField(fields.userVille, "Veuillez entrer votre ville");
    isValid &= validateField(fields.userRue, "Veuillez entrer votre rue");
    isValid &= validateField(fields.userPorte, "Veuillez entrer le numéro de porte");

    if (isValid) {
        // Récupération des valeurs des champs dans un objet formData
        const formData = {
            Nom: fields.userName.value,
            Numero: fields.userNumero.value,
            Email: fields.userEmail.value,
            Ville: fields.userVille.value,
            Rue: fields.userRue.value,
            Porte: fields.userPorte.value
        };
        
        console.log("Tous les champs sont valides.", formData);
        // Tu peux maintenant envoyer formData via une requête AJAX ou Fetch si nécessaire
      
            // Réinitialiser les champs après l'envoi
            Object.values(fields).forEach(field => {
                field.value = ''; // Vider les champs
            });
    }
});
