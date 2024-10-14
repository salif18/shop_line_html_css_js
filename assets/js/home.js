// Initialisation de l'index des éléments 
let currentIndex = 0;

// Récupération des éléments HTML du DOM
const btnStore1 = document.querySelector(".btn-explore-1");
const btnStore2 = document.querySelector(".btn-explore-2");
const arrivalContainer = document.querySelector(".arrival-container");
const articlesContainer = document.querySelector(".articles-items");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

// Nombre d'articles visibles en même temps
const itemsToShow = 2;
const totalItems = dataSlider.length;

btnStore1.addEventListener('click', () => {
    window.location.href = `${basePath}/pages/products.html`;
})

btnStore2.addEventListener('click', () => {
    window.location.href = `${basePath}/pages/products.html`;
})

// Afficher les nouveaux arrivages
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
};

// Afficher les données du slider
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
        div.addEventListener('click', () => {
            window.location.href = `${basePath}/pages/single.html?id=${item.id}`
        })
        articlesContainer.appendChild(div);

    });

    updateSliderPosition(); // Met à jour la position après avoir ajouté les articles
};

// Fonction pour faire défiler les articles
const updateSliderPosition = () => {
    const card = articlesContainer.querySelector(".card");

    if (card) {
        const itemWidth = card.offsetWidth; // Vérifie que l'élément est présent
        const newPosition = -currentIndex * itemWidth;
        articlesContainer.style.transform = `translateX(${newPosition}px)`;
    } else {
        console.error("Aucun élément de type '.card' n'a été trouvé dans 'articlesContainer'.");
    }
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

// Initialisation
displayItemArrival();
displayArticleSlider();
