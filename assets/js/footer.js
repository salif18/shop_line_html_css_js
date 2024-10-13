// recuperation des elements html de DOM

const footer = document.querySelector(".app-footer");

// rendu de footer
const displayFooter = () => {
    footer.innerHTML = `
    <section class="footer-title">
     <h1>&copy; 2024 shopline</h1>
    </section>
    <ul class="footer-links">
     <li><a href="${basePath}/index.html">Home</a></li>
      <li><a href="${basePath}/pages/about.html">About</a></li>
    </ul>
    `;
}

// Appeler les deux fonctions pour afficher le header la barre de navigation et le footer

displayFooter();


