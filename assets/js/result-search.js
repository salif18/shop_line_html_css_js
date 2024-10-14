// Sur la page de recherche
const zoneReponse = document.querySelector(".reponse-data");
// Récupérer la valeur de recherche depuis localStorage
const searchValue = localStorage.getItem("searchValue");

// Fonction pour afficher les résultats
const displayResponseSearch = (value) => {
    const dataFilter = dataSlider.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
    
    // Effacer les anciennes réponses
    const zoneReponse = document.querySelector(".reponse-data");
    zoneReponse.innerHTML = '';

    dataFilter.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("card-search");
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}" />
            <section class="card-search-info">
                <h2>${item.name}</h2>
                <p>$${item.price}</p>
            </section>
             <button class="add-to-cart" onclick="addToCart(${item.id})">Ajouter <i class="fas fa-shopping-cart"></i></button>
        `;
        zoneReponse.appendChild(div);
        zoneReponse.addEventListener('click',()=>{
            window.location.href=`${basePath}/pages/single.html?id=${item.id}`
        })
    });

    // Effacer la valeur après l'affichage
    localStorage.removeItem("searchValue");
}


if (searchValue) {
    displayResponseSearch(searchValue);
}
