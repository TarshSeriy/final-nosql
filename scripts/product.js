// Получаем ID товара из URL
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

// Загружаем информацию о товаре
function loadProductDetails() {
    const productId = getProductIdFromUrl();
    const productInfoContainer = document.getElementById("product-info");

    if (!productId) {
        productInfoContainer.innerHTML = "<p>Product not found.</p>";
        return;
    }

    const product = products.find(p => p.id == productId);
    if (!product) {
        productInfoContainer.innerHTML = "<p>Product not found.</p>";
        return;
    }

    productInfoContainer.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}">
        <p>Price: ${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
}

// Загружаем данные при загрузке страницы
window.onload = loadProductDetails;
