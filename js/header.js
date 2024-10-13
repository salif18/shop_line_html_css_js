const header = document.querySelector(".app-header");

// rendu de header
const displayHeader = () => {
    header.innerHTML = `
    <section class="title">
     <h1>Shop-line</h1>
    </section>
    <section class="header-rigth">
    <ul class="list-link">
     <li><i class="fas fa-shopping-cart"></i></li>
     <li><i class="fas fa-user user-icon"></i></li>
     <li><a href="login.html">Connexion</a></li>
     <li><a href="signup.html">S'inscrire</a></li>
    </ul>
     <label for="search"><input id="search" type="search" name="recherche" placeholder="Que voullez-vous ? " /><button type="submit" class="submit-search"><i class="fas fa-search"></i></button></label>
    </section>
    <span class="menu-barre"><i class="fa-solid fa-bars"></i></span>
    `;
}


displayHeader();