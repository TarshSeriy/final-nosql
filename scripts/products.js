const products = [
    { id: 1, name: "Laptop X", price: 500000, image: "images/laptop.png", category: "laptops" },
    { id: 2, name: "Phone Y", price: 400000, image: "images/phone.png", category: "phones" }
];


function renderProducts(filterCategory = "all", searchQuery = "") {
    const productContainer = document.getElementById("productContainer");
    if (!productContainer) return; // Проверка, чтобы код выполнялся только на нужной странице

    productContainer.innerHTML = ""; // Очищаем контейнер перед рендерингом

    const filteredProducts = products.filter(product =>
        (filterCategory === "all" || product.category === filterCategory) &&
        (product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    filteredProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: ${product.price} KZT</p>
            <button class="btn btn-success" onclick="addToCart(${product.id})">Add to Cart</button>
            <button class="btn btn-primary" onclick="viewProduct(${product.id})">View Product</button>
        `;

        productContainer.appendChild(productCard);
    });
}


function viewProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}


const categoryFilter = document.getElementById("categoryFilter");
if (categoryFilter) {
    categoryFilter.addEventListener("change", (event) => {
        renderProducts(event.target.value, document.getElementById("searchInput").value);
    });
}

const searchInput = document.getElementById("searchInput");
if (searchInput) {
    searchInput.addEventListener("input", (event) => {
        renderProducts(document.getElementById("categoryFilter").value, event.target.value);
    });
}


window.onload = () => renderProducts();
