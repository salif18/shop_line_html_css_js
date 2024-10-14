// Changement de l'image principale quand on clique sur une miniature
function changeImage(element) {
    const mainImage = document.getElementById('main-image');
    mainImage.src = element.src;
}

// Fonction pour ajouter au panier (simple console log pour l'exemple)
function addToCart() {
    const size = document.getElementById('size').value;
    const color = document.getElementById('color').value;
    console.log(`Produit ajouté au panier - Taille: ${size}, Couleur: ${color}`);
    alert('Produit ajouté au panier');
}
