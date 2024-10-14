    // Initialisation du panier
    let cart = [];

    // recuperer le button de click vers address
    const addressBtn = document.querySelector(".btn-address");


    // Affichage des données du panier
    const displayCartData = () => {
        const containerItem = document.querySelector(".cart-items");
        containerItem.innerHTML = ""; // Réinitialiser les éléments du panier avant de les afficher
       if(cart.length > 0){
        cart.map((item) => {
            const div = document.createElement("div");
            div.classList.add("card-cart");
            div.innerHTML = `
            <img src=${item.img} alt="${item.name}" />
            <section class="card-cart-info">
                <h2>${item.name}</h2>
                <p>$${item.price}</p>
            </section>
            <section class="card-cart-btn">
                <button class="btn-minus" data-id="${item.id}">-</button>
                <span class="qty">${item.qty}</span>
                <button class="btn-plus" data-id="${item.id}">+</button>
            </section>
            <button class="btn-remove-cart" onclick="removeFromCart(${item.id})"><i class="fas fa-trash" ></i></button>
        `;
            containerItem.appendChild(div);
        });
        // Ajout des événements pour les boutons + et -
        document.querySelectorAll(".btn-plus").forEach(button => {
            button.addEventListener("click", (e) => {
                const id = parseInt(e.target.getAttribute("data-id"));
                updateCartQuantity(id, "increase");
            });
        });
        document.querySelectorAll(".btn-minus").forEach(button => {
            button.addEventListener("click", (e) => {
                const id = parseInt(e.target.getAttribute("data-id"));
                updateCartQuantity(id, "decrease");
            });
        });
    }else{
        const h2 = document.createElement("h2")
        h2.classList.add("empty-cart");
        h2.innerHTML="Votre panier est vide !!";
       containerItem.appendChild(h2)
    }
    }

    // Fonction pour ajouter un produit au panier
    function addToCart(productId) {
        const product = data.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.qty += 1; // Si le produit est déjà dans le panier, augmenter la quantité
        } else if (product) {
            cart.push({ ...product, qty: 1 });
        }
        saveCart();
        displayCartData(); // Réafficher les données du panier
        calculeTotal()
    }
    
    // Fonction pour supprimer un produit du panier
    function removeFromCart(itemId) {
        cart = cart.filter((e) => e.id !== itemId); // Supprimer l'élément à l'index donné
        saveCart();
        displayCartData();
        calculeTotal()
    }
    
    

    // Met à jour la quantité dans le panier
    const updateCartQuantity = (id, action) => {
        const item = cart.find(item => item.id === id);
        if (action === "increase") {
            item.qty += 1;
        } else if (action === "decrease" && item.qty > 1) {
            item.qty -= 1;
        }
        saveCart();  // Sauvegarder après la mise à jour
        displayCartData(); // Réafficher les éléments du panier avec les nouvelles quantités
        calculeTotal()
    }

    // Appel initial pour afficher les données du panier
    function loadCart() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                cart = JSON.parse(storedCart);
            } catch (e) {
                cart = []; // Si des erreurs surviennent, réinitialiser le panier
            }
        }
        displayCartData();
    }


    // Fonction pour sauvegarder le panier dans localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // cliquer pour naviguer vers la page address ou login 
    addressBtn.addEventListener("click", () => {
        window.location.href = `${basePath}/pages/addresse.html`;
    });

    
    function calculeTotal() {
        let total = cart.map((item) => item.price * item.qty).reduce((a, b) => a + b, 0);
    let qty = cart.map((item) => item.qty).reduce((a, b) => a + b, 0);

    const sommeTotalElement = document.querySelector(".somme-total");
    const qtyTotalElement = document.querySelector(".qty-total");
    const cartQty = document.querySelector(".cartqty");

    // Vérifie si les éléments existent
    if (sommeTotalElement) {
        sommeTotalElement.innerHTML = `${total} FCFA`;
    } else {
        console.error('Élément ".somme-total" non trouvé dans le DOM');
    }
    
    if (qtyTotalElement) {
        qtyTotalElement.innerHTML = qty;
        if(cart.length > 0){
           cartQty.innerHTML = qty; 
        }
        
    } else {
        console.error('Élément ".qty-total" non trouvé dans le DOM');
    }
    }

    // Initialisation lors du chargement de la page
document.addEventListener("DOMContentLoaded",function(){
    loadCart(); // Charger le panier existant
    calculeTotal();
})
    
