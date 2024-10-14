document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".app-header");

    // rendu de header
    const displayHeader = () => {
        // Vérifie si le token est présent
        const token = localStorage.getItem('token');  // Exemple d'où tu peux récupérer ton token

        header.innerHTML = `
    <section class="title">
     <h1>Shop-line</h1>
    </section>
    <section class="header-rigth">
    <ul class="list-link">
     <li class="cart-icon-qty"><i class="fas fa-shopping-cart"></i><span class="cartqty"></span></li>
     <li><i class="fas fa-user user-icon"></i></li>
     ${token ? '' : `<li><a href="${basePath}/pages/login.html">Connexion</a></li>`}
     ${token ? '' : `<li><a href="${basePath}/pages/signup.html">S'inscrire</a></li>`}
    </ul>
     <label for="search"><input id="search" type="search" name="recherche" placeholder="Que voulez-vous ? " /><button type="submit" class="submit-search"><i class="fas fa-search"></i></button></label>
    </section>
    <span class="menu-barre"><i class="fa-solid fa-bars"></i></span>
    `;
    }

    displayHeader();
});