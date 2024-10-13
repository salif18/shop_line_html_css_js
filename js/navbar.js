const navBar = document.querySelector(".app-nav");

// rendu de nav
const displayNavBar = () => {
    navBar.innerHTML = `
    <ul class="list-link">
     <li><a href="home.html">Home</a></li>
     <li><a href="shop.html">Store</a></li>
    </ul>
    `;
}


displayNavBar();