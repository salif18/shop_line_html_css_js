// Sur la page d'accueil
const btnSearch = document.querySelector(".submit-search");
const valueSearch = document.querySelector("#search");

btnSearch.addEventListener("click", (e) => {
    e.preventDefault();

    if (valueSearch.value.length > 0) {
        // Utiliser localStorage pour stocker la valeur de recherche
        localStorage.setItem("searchValue", valueSearch.value);
        // Rediriger vers la page de recherche
        window.location.href = "search.html";
    }
});
