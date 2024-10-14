// Récupérer le chemin actuel
const currentPath = window.location.pathname;

// Calculer le chemin de base
let basePath = "";
if (currentPath.includes("/pages/")) {
    basePath = ".."; // Remonte d'un dossier si on est dans /pages/
} else {
    basePath = "."; // Reste dans le même dossier si on est à la racine
}
