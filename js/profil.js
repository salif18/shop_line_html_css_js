//cart data
const cartData = [
    { id: 1, img: "public/images/watch.png", price: 12, name: "Watch" },
    { id: 2, img: "public/images/img.png", price: 50, name: "Watch2" },
    { id: 3, img: "public/images/watch.png", price: 25, name: "Watch" },
    { id: 4, img: "public/images/img.png", price: 9, name: "Watch2" },
];

// recuperation des elements DOM
const cartContainer = document.querySelector(".cart-container");
const profilContainer = document.querySelector(".profil-container");
const userBtn = document.querySelector(".fa-user");
const cartBtn = document.querySelector(".fa-shopping-cart");

userBtn.addEventListener("click", (e) => {
    e.preventDefault();
    profilContainer.classList.toggle("profil-container-active");
    cartContainer.classList.remove("cart-container-active"); // On ferme le panier si le profil est ouvert
});

cartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cartContainer.classList.toggle("cart-container-active");
    profilContainer.classList.remove("profil-container-active"); // On ferme le profil si le panier est ouvert
});

// afficher les donner de la cart
const displayCartData = () => {
    const containerItem = document.querySelector(".cart-items");
    cartData.map((item)=>{
        const div = document.createElement("div");
        div.classList.add("cards");
        div.innerHTML= `
        <img src=${item.img} />
         <section class="cards-info">
                <h2>${item.name}</h2>
                <p>$${item.price}</p>
            </section>
             <section class="cards-btns">
                <button class="btn-minus">+</button>
                <span class="qty">1</span>
                <button class="btn-plus">-</button>
            </section>
        `;
        containerItem.appendChild(div)
    })
}

displayCartData()


