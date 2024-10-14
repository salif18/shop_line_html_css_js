document.getElementById('price-filter').addEventListener('input', function() {
    let priceValue = document.getElementById('price-filter').value;
    document.getElementById('price-value').textContent = `Max: $${priceValue}`;
});

document.getElementById('sort').addEventListener('change', function() {
    const sortBy = this.value;
    // Sort products based on the selected option (add sorting logic here)
    console.log("Sorting by: " + sortBy);
});

// Implement the search functionalityq
document.getElementById('search-input').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('h2').textContent.toLowerCase();
        if (productName.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});
