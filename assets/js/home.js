document.addEventListener("DOMContentLoaded", () => {
    let currentIndex = 0;
    const btnStore1 = document.querySelector(".btn-explore-1");
    const btnStore2 = document.querySelector(".btn-explore-2");
    const arrivalContainer = document.querySelector(".arrival-container");
    const articlesContainer = document.querySelector(".articles-items");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");
    
    const itemsToShow = 2;
    const totalItems = data ? data.length : 0; // Assurez-vous que les données existent
    
    if (!btnStore1 || !btnStore2 || !arrivalContainer || !articlesContainer || !prevButton || !nextButton) {
        console.error("Un ou plusieurs éléments du DOM sont manquants.");
        return;
    }

    btnStore1.addEventListener('click', () => {
        window.location.href = `${basePath}/pages/products.html`;
    });

    btnStore2.addEventListener('click', () => {
        window.location.href = `${basePath}/pages/products.html`;
    });

    const displayItemArrival = () => {
        data.slice(0,2).map(item => {
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

    const displayArticleSlider = () => {
        data.forEach(item => {
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
            div.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = `${basePath}/pages/single.html?id=${item.id}`;
            });
            articlesContainer.appendChild(div);
        });

        updateSliderPosition();
    };

    const updateSliderPosition = () => {
        const card = articlesContainer.querySelector(".card");

        if (card) {
            const itemWidth = card.offsetWidth;
            const newPosition = -currentIndex * itemWidth;
            articlesContainer.style.transform = `translateX(${newPosition}px)`;
        } else {
            console.error("Aucun élément de type '.card' n'a été trouvé dans 'articlesContainer'.");
        }
    };

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
});
