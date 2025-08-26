import { ProductService } from './services/ProductService.js';
import { Cart } from './services/CartService.js';

// Главный объект приложения
const app = {
    productService: new ProductService(),
    cart: new Cart(),
    filteredProducts: [],

    // Инициализация приложения
    init() {
        this.filteredProducts = this.productService.getAllProducts();
        this.renderProducts();
        this.setupEventListeners();
        this.updateCartUI();
    },

    // Настройка обработчиков событий
    setupEventListeners() {
        // Обработчики для кнопок категорий
        document.querySelectorAll('.category-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                document.querySelectorAll('.category-btn').forEach(btn => 
                    btn.classList.remove('active'));
                e.target.classList.add('active');
                this.applyFilters();
            });
        });

        // Обработчик для поиска
        document.getElementById('search-input').addEventListener('input', () => {
            this.applyFilters();
        });

        // Обработчик для фильтра цены
        document.getElementById('price-filter').addEventListener('change', () => {
            this.applyFilters();
        });
    },

    // Применение всех фильтров
    applyFilters() {
        const activeCategory = document.querySelector('.category-btn.active').dataset.category;
        const searchText = document.getElementById('search-input').value;
        const priceRange = document.getElementById('price-filter').value;
        
        // Получаем отфильтрованные товары
        let filtered = this.productService.getProductsByCategory(activeCategory);
        
        if (searchText) {
            filtered = this.productService.searchProducts(searchText, filtered);
        }
        
        filtered = this.productService.filterByPrice(filtered, priceRange);
        
        this.filteredProducts = filtered;
        this.renderProducts();
    },

    // Отрисовка товаров
    renderProducts() {
        const productsContainer = document.getElementById('products-container');
        productsContainer.innerHTML = '';

        if (this.filteredProducts.length === 0) {
            productsContainer.innerHTML = `
                <div class="no-products">
                    <p>Товары не найдены</p>
                    <p>Попробуйте изменить параметры поиска</p>
                </div>
            `;
            return;
        }

        this.filteredProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product';
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-details">
                    <span class="product-price">${product.price.toLocaleString()} руб.</span>
                    <span class="product-sizes">Размеры: ${product.sizes.join(', ')}</span>
                </div>
                <button class="add-to-cart-btn" onclick="app.addToCart(${product.id})">
                    🛒 В корзину
                </button>
            `;
            productsContainer.appendChild(productElement);
        });
    },

    // Добавление товара в корзину
    addToCart(productId) {
        const product = this.productService.getProductById(productId);
        if (product) {
            this.cart.addItem(product);
            this.updateCartUI();
            
            // Показываем уведомление
            this.showNotification(`Товар "${product.name}" добавлен в корзину!`);
        }
    },

    // Показать уведомление
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Показываем уведомление
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Убираем через 3 секунды
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    // Обновление UI корзины
    updateCartUI() {
        const badge = document.getElementById('cart-badge');
        const totalElement = document.getElementById('cart-total');
        
        if (badge) badge.textContent = this.cart.getItemCount();
        if (totalElement) totalElement.textContent = this.cart.getTotal().toLocaleString();
    },

    // Показать корзину
    showCart() {
        alert('Функция просмотра корзины будет реализована в следующей версии!');
        // Здесь будет модальное окно с деталями корзины
    },

    // Оформить заказ
    checkout() {
        if (this.cart.getItems().length === 0) {
            alert('Корзина пуста! Добавьте товары перед оформлением заказа.');
            return;
        }
        
        alert(`Заказ оформлен! Сумма: ${this.cart.getTotal().toLocaleString()} руб.`);
        this.cart.clear();
        this.updateCartUI();
    },

    // Очистить корзину
    clearCart() {
        if (confirm('Вы уверены, что хотите очистить корзину?')) {
            this.cart.clear();
            this.updateCartUI();
            alert('Корзина очищена!');
        }
    }
};

// Инициализация приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

// Делаем app глобальной для вызова из HTML
window.app = app;
