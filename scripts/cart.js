// Массив для хранения товаров в корзине (изначально пустой, загружается с сервера)
let cart = [];

// Функция для загрузки корзины с сервера
function loadCartFromServer() {
    fetch("/cart/get")
        .then(response => response.json())
        .then(data => {
            cart = data;  // Полученные данные загружаем в массив cart
            updateCartUI();
        })
        .catch(error => console.error("Ошибка загрузки корзины:", error));
}

// Функция для добавления товара в корзину
function addToCart(product) {
    fetch("/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id })
    })
        .then(response => response.json())
        .then(data => {
            cart = data;  // Обновляем корзину после добавления
            updateCartUI();
        })
        .catch(error => console.error("Ошибка добавления в корзину:", error));
}

// Функция для удаления товара из корзины
function removeFromCart(productId) {
    fetch("/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId })
    })
        .then(response => response.json())
        .then(data => {
            cart = data;
            updateCartUI();
        })
        .catch(error => console.error("Ошибка удаления из корзины:", error));
}

// Функция для обновления количества товара
function updateQuantity(productId, quantity) {
    fetch("/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity })
    })
        .then(response => response.json())
        .then(data => {
            cart = data;
            updateCartUI();
        })
        .catch(error => console.error("Ошибка обновления количества:", error));
}

// Функция для обновления интерфейса корзины
function updateCartUI() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartTotalContainer = document.querySelector(".cart-total h3");

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = "";

        cart.forEach((item) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Price: ${item.price}</p>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;

            cartItemsContainer.appendChild(cartItem);
        });

        cartTotalContainer.textContent = `Total: ${calculateTotal()}`;
    }
}

// Функция для подсчета общей стоимости
function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Загружаем корзину при загрузке страницы
window.onload = loadCartFromServer;
