// tableau pour les nouveaux arrivages
const dataNewArrival = [
    { id: 1, img: "public/images/watch.png", price: 12, name: "Watch" },
    { id: 2, img: "public/images/img.png", price: 50, name: "Watch2" },
    { id: 3, img: "public/images/watch.png", price: 25, name: "Watch" },
    { id: 4, img: "public/images/img.png", price: 9, name: "Watch2" },
];

// tableau des elements du sliders
const dataSlider = [
    { id: 1, img: "public/images/watch.png", price: 12, name: "Watch" },
    { id: 2, img: "public/images/img.png", price: 50, name: "Watch2" },
    { id: 3, img: "public/images/watch.png", price: 25, name: "Watch" },
    { id: 4, img: "public/images/img.png", price: 9, name: "Watch2" },
    { id: 5, img: "public/images/watch.png", price: 25, name: "Watch" },
    { id: 6, img: "public/images/img.png", price: 9, name: "Watch2" },
];

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

displayItemArrival();
displayArticleSlider();
