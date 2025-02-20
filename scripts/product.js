
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}


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
        <div class="product-card">
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}">
            <p>Price: ${product.price}</p>
            <button class="btn btn-success" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `;
}


window.onload = loadProductDetails;
