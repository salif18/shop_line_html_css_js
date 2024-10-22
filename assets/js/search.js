let historySearch = JSON.parse(localStorage.getItem("historiques")) || [];

document.addEventListener("DOMContentLoaded", function () {
    // Sur la page d'accueil
    const btnSearch = document.querySelector(".submit-search");
    const valueSearch = document.querySelector("#search");

    

    btnSearch.addEventListener("click", (e) => {
        e.preventDefault();

        if (valueSearch.value.length > 0) {
            // Ajouter la nouvelle recherche à l'historique
            historySearch.push(valueSearch.value);
        }
            // Utiliser localStorage pour stocker la valeur de recherche et l'historique
            localStorage.setItem("searchValue", valueSearch.value);
            localStorage.setItem("historiques", JSON.stringify(historySearch));
            
            // Rediriger vers la page de recherche
            window.location.href = `${basePath}/pages/search.html`;
        
    });

});
