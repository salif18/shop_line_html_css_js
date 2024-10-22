document.addEventListener("DOMContentLoaded", function () {
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
    fixeNavbar(navBar)
});

function fixeNavbar(navbar){
    if (document.documentElement.scrollTop > 20) {
         navbar.style.position ="f"
    }else{
         navbar.style.position ="none"
    }
};