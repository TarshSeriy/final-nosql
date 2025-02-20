const products = [
    { id: 1, name: "Laptop", price: 500000, image: "images/laptop.png", category: "laptops" },
    { id: 2, name: "Phone", price: 400000, image: "images/phone.png", category: "phones" },
    // Добавьте больше товаров
];

// Функция для отображения товаров
function renderProducts(filterCategory = "all", searchQuery = "") {
    const productContainer = document.getElementById("productContainer");
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
            <p>Price: ${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="viewProduct(${product.id})" class="view-btn">View Product</button>
        `;

        productContainer.appendChild(productCard);
    });
}

// Функция для перехода на страницу товара
function viewProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

// Фильтрация товаров
document.getElementById("categoryFilter").addEventListener("change", (event) => {
    renderProducts(event.target.value, document.getElementById("searchInput").value);
});

// Поиск товаров
document.getElementById("searchInput").addEventListener("input", (event) => {
    renderProducts(document.getElementById("categoryFilter").value, event.target.value);
});

// Инициализация при загрузке
window.onload = () => renderProducts();
