const navBar = document.querySelector(".app-nav");

// rendu de nav
const displayNavBar = () => {
    navBar.innerHTML = `
    <ul class="list-link">
     <li><a href="../index.html">Home</a></li>
     <li><a href="../pages/shop.html">Store</a></li>
    </ul>
    `;
}


displayNavBar();