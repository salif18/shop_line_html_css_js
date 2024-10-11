// recuperation des elements html de DOM
const navBar = document.querySelector(".app-nav");
const footer = document.querySelector(".app-footer");
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
    </ul>
     <label for="search"><input id="search" type="search" name="recherche" placeholder="Que voullez-vous ? " /><i class="fas fa-search"></i></label>
    </section>
    <span class="menu-barre"><i class="fa-solid fa-bars"></i></span>
    `;
}

// rendu de nav
const displayNavBar = () => {
    navBar.innerHTML = `
    <ul class="list-link">
     <li><a href="home.html">Home</a></li>
     <li><a href="../views/shop.html">Store</a></li>
    </ul>
    `;
}

// rendu de footer
const displayFooter = () => {
    footer.innerHTML = `
    <section class="footer-title">
     <h1>&copy; 2024 shopline</h1>
    </section>
    <ul class="footer-links">
     <li><a href="home.html">Home</a></li>
      <li><a href="../views/about.html">About</a></li>
    </ul>
    `;
}

// Appeler les deux fonctions pour afficher le header la barre de navigation et le footer
displayHeader();
displayNavBar();
displayFooter();
