const token = localStorage.getItem("token"); // Simule un token valide ;
document.addEventListener("DOMContentLoaded", () => {
    const submitLogin = document.querySelector(".btn-submit-login");
    const submitSignup = document.querySelector(".btn-submit-signup");

    // Fonction pour valider et styliser un champ
    function validateField(field, message) {
        const defaultPlaceholder = field.placeholder; // Capturer la valeur par défaut du placeholder

        if (field.value.trim().length <= 0) {
            field.placeholder = message;
            field.style.border = "2px solid orangered";
            field.style.color = "orangered";

            // Remettre le placeholder à la valeur par défaut après 1200ms
            setTimeout(() => {
                field.placeholder = defaultPlaceholder;  // Restaurer le placeholder par défaut
                field.style.border = "";
                field.style.color = "";
            }, 1200);

            return false;
        }

        return true;
    }

    // Validation du formulaire de connexion
    if (submitLogin) {
        submitLogin.addEventListener("click", (e) => {
            e.preventDefault();

            const identifiant = document.querySelector(".myIdentifiant");
            const pass = document.querySelector(".myPass");

            let isValid = true;
            isValid &= validateField(identifiant, "Veuillez entrer votre email ou numéro");
            isValid &= validateField(pass, "Veuillez entrer votre mot de passe");

            if (isValid) {
                // Récupération des valeurs des champs dans un objet formData
                const formData = {
                    identifiant: identifiant.value,
                    Password: pass.value,
                };

                console.log("Connexion réussie", formData);
                localStorage.setItem("token", identifiant.value)
                localStorage.setItem("numero", identifiant.value)
                // fecth vers api
                window.location.href = `${basePath}/index.html`
                // Réinitialiser les champs après connexion réussie
                identifiant.value = '';
                pass.value = '';
            }
        });
    }

    // Validation du formulaire d'inscription
    if (submitSignup) {
        submitSignup.addEventListener("click", (e) => {
            e.preventDefault();

            const userName = document.querySelector(".myNom");
            const userPhone = document.querySelector(".myPhone");
            const userEmail = document.querySelector(".myEmail");
            const userPass = document.querySelector(".myPass");

            let isValid = true;
            isValid &= validateField(userName, "Veuillez entrer votre nom");
            isValid &= validateField(userPhone, "Veuillez entrer votre numéro");
            isValid &= validateField(userEmail, "Veuillez entrer votre email");
            isValid &= validateField(userPass, "Veuillez entrer votre mot de passe");

            if (isValid) {

                // Récupération des valeurs des champs dans un objet formData
                const formData = {
                    Nom: userName.value,
                    Numero: userPhone.value,
                    Email: userEmail.value,
                    Password: userPass.value,
                };

                console.log("Inscription réussie", formData);
                localStorage.setItem("nom", userName.value)
                localStorage.setItem("numero", userPhone.value)
                localStorage.setItem("email", userEmail.value)
                localStorage.setItem("token", userPhone.value)
                // fetch api 
                window.location.href = `${basePath}/index.html`
                // Réinitialiser les champs après inscription réussie
                userName.value = '';
                userPhone.value = '';
                userEmail.value = '';
                userPass.value = '';
            }
        });
    }
});

