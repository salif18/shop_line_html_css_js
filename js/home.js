// initialisation de l'index des elements 
let currentIndex = 0;

// recuperation des element html de DOM
const arrivalContainer = document.querySelector(".arrival-container");
const articlesContainer = document.querySelector(".articles-items");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

// Nombre d'articles visibles en même temps
const itemsToShow = 2;
const totalItems = dataSlider.length;


// afficher les new arrivage
const displayItemArrival = () => {
    dataNewArrival.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}" />
            <section class="card-info">
                <h2>${item.name}</h2>
                <p>$${item.price}</p>
            </section>
        `;
        arrivalContainer.appendChild(div);
    });
}

// afficher les donneer slider
const displayArticleSlider = () => {
    dataSlider.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}" />
            <section class="card-info">
                <h2>${item.name}</h2>
                <p>$${item.price}</p>
            </section>
            <button class="add-to-cart" onclick="addToCart(${item.id})">Ajouter <i class="fas fa-shopping-cart"></i></button>
        `;
        articlesContainer.appendChild(div);
    });
}


// Fonction pour faire défiler les articles
const updateSliderPosition = () => {
    const itemWidth = articlesContainer.querySelector(".card").offsetWidth;
    const newPosition = -currentIndex * itemWidth;
    articlesContainer.style.transform = `translateX(${newPosition}px)`;
};


// Gestion des boutons
nextButton.addEventListener("click", () => {
    if (currentIndex < totalItems - itemsToShow) {
        currentIndex++;
        updateSliderPosition();
    }
});


prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSliderPosition();
    }
});

