const navBar = document.querySelector(".app-nav");

// rendu de nav
const displayNavBar = () => {
    navBar.innerHTML = `
    <ul class="list-link">
     <li><a href=${basePath}/index.html>Home</a></li>
     <li><a href=${basePath}/pages/products.html>Store</a></li>
    </ul>
    `;
}


displayNavBar();