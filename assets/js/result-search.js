document.addEventListener("DOMContentLoaded", function () {
    // Sur la page de recherche
    const zoneReponse = document.querySelector(".reponse-data");
    const titleResultat = document.querySelector(".titre");
    const resultaNumber = document.querySelector(".nombre-resultat");
    
    // Récupérer la valeur de recherche et l'historique depuis localStorage
    const searchValue = localStorage.getItem("searchValue");
    let valueHistorySearch = JSON.parse(localStorage.getItem("historiques")) || [];

    // Affichage de l'historique par défaut si aucune recherche n'a été effectuée
    if (!searchValue) {
        displayHistoriSearch();
    } else {
        displayResponseSearch(searchValue);
    }

    // Fonction pour afficher l'historique des recherches
    function displayHistoriSearch() {
        zoneReponse.innerHTML = ""; // Vide la zone avant d'afficher l'historique
        titleResultat.innerHTML = "Historique de recherches";
        valueHistorySearch.reverse().forEach((item, index) => {
            const div = document.createElement("div");
            div.classList.add("card-historiq");
            div.innerHTML = ` 
                <h2>${item}</h2>  
                <i class="fas fa-remove"></i>`;
     
            // Lorsque l'utilisateur clique sur un élément de l'historique
            div.addEventListener('click', (e) => {
                e.preventDefault();
                // Afficher les résultats de la recherche basée sur l'historique
                displayResponseSearch(item);
            });

            // Lorsque l'utilisateur clique sur le bouton de suppression
            div.querySelector(".fa-remove").addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Empêche la propagation du clic à l'élément parent
                deleteFromLocal(index); // Appeler la fonction de suppression
            });

            zoneReponse.appendChild(div);
        });
    }

    // Fonction pour supprimer un élément de l'historique
    function deleteFromLocal(index) {
        valueHistorySearch.splice(index, 1); // Supprimer l'élément à l'index donné
        localStorage.setItem("historiques", JSON.stringify(valueHistorySearch)); // Mettre à jour localStorage
        displayHistoriSearch(); // Réafficher l'historique mis à jour
    }

    // Fonction pour afficher les résultats de la recherche
    function displayResponseSearch(value) {
        // Filtrer les données en fonction de la valeur de recherche
        const dataFilter = data.filter(item => item.name.toLowerCase().includes(value.toLowerCase()) || 
        item.category.toLowerCase().includes(value.toLowerCase()) ||
        item.sousCategory.toLowerCase().includes(value.toLowerCase()) || 
        item.marque.toLowerCase().includes(value.toLowerCase())
      );

        zoneReponse.innerHTML = ''; // Vide la zone avant d'afficher les résultats
        titleResultat.innerHTML = "Résultats";
        resultaNumber.innerHTML = `Nous avons ${dataFilter.length} varietés de ${value} dans notre store`;
        
        dataFilter.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("card-search");
            div.innerHTML = `
            <img src="${item.img}" alt="${item.name}" />
            <section class="card-search-info">
                <h2>${item.name}</h2>
                <p>$${item.price}</p>
            </section>
            <button class="add-to-cart" onclick="addToCart(${item.id})">Ajouter <i class="fas fa-shopping-cart"></i></button>`;

            div.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = `${basePath}/pages/single.html?id=${item.id}`;
            });

            zoneReponse.appendChild(div);
        });

        // Ne pas supprimer l'historique, seulement la valeur de recherche actuelle
        localStorage.removeItem("searchValue");
    }
});
