document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".app-header");
    const profil = document.querySelector(".profil-container");
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
     <li class="cart-icon-qty">
       <i class="fas fa-shopping-cart"></i>
       <span class="cartqty"></span>
     </li>
     <li><i class="fas fa-user user-icon"></i></li>
     ${token ? '' : `<li><a href="${basePath}/pages/login.html">Connexion</a></li>`}
     ${token ? '' : `<li><a href="${basePath}/pages/signup.html">S'inscrire</a></li>`}
    </ul>
     <label for="search"><input id="search" type="search" name="recherche" placeholder="Que voulez-vous ? " /><button type="submit" class="submit-search"><i class="fas fa-search"></i></button></label>
    </section>
    <span class="menu-barre"><i class="fa-solid fa-bars"></i></span>
    `;

    // Si besoin d'un eventListener supplémentaire
    document.querySelector(".fa-shopping-cart").addEventListener("click", ()=>{
        navigueToCart();
    });
    }


    // rendu de header
    const displayProfil = () => {
        profil.innerHTML = `
                <div class="profil-header">
                    <div class="user-info-row">
                        <!-- <img class="user-photo" src="" alt="" /> -->
                        <i class="fas fa-user"></i>
                        <div class="user-name-column">
                            <h2 id="user-name"></h2>
                            <p id="user-email"></p>
                        </div>
                    </div>
                    <i class="fas fa-remove"></i> <!-- Icône de fermeture -->
                </div>

                <section class="profil-content">
                    <button class="btn-logout"> <i
                            class="fas fa-sign-out-alt"></i>Se
                        déconnecter</button>
                </section>
    `;
    }

    displayHeader();
    displayProfil()
    fixeHeader(header)
    // Appeler une fonction ici pour mettre à jour la quantité du panier
    updateCartQty();
});



function fixeHeader(header){
    if (document.documentElement.scrollTop > 20) {
         header.style.position ="fixed"
    }else{
         header.style.position ="sticky"
    }
};

// Fonction pour mettre à jour la quantité dans l'élément .cartqty
function updateCartQty() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);

    const cartQtyElement = document.querySelector(".cartqty");
    if (cartQtyElement) {
        if(cart.length > 0){
        cartQtyElement.textContent = totalQty;
     
        }else{
               cartQtyElement.style.display="none"
        }
    }
}

// Fonction pour naviguer vers la page du panier
function navigueToCart (){
    window.location.href =`${basePath}/pages/panier.html`;
}
