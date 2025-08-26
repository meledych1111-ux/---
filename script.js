import { ProductService } from './modules/ProductService.js';
import { CartService } from './modules/CartService.js';
import { UIService } from './modules/UIService.js';
import { FilterService } from './modules/FilterService.js';

class ShoeStoreApp {
    constructor() {
        this.productService = new ProductService();
        this.cartService = new CartService();
        this.uiService = new UIService();
        this.filterService = new FilterService();
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.displayProducts();
        this.updateCartDisplay();
    }

    setupEventListeners() {
        // Поиск
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterService.updateFilter('searchText', e.target.value);
                this.displayProducts();
            });
        }

        // Фильтр по цене
        const priceFilter = document.getElementById('price-filter');
        if (priceFilter) {
            priceFilter.addEventListener('change', (e) => {
                this.filterService.updateFilter('priceRange', e.target.value);
                this.displayProducts();
            });
        }

        // Фильтр по категориям
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                categoryButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                this.filterService.updateFilter('category', e.target.dataset.category);
                this.displayProducts();
            });
        });
    }

    displayProducts() {
        const allProducts = this.productService.getAllProducts();
        const filters = this.filterService.getCurrentFilters();
        const filteredProducts = this.filterService.applyFilters(allProducts, filters);
        
        this.uiService.displayProducts(filteredProducts, 'products-container');
    }

    selectSize(productId, size) {
        this.uiService.selectSize(productId, size);
    }

    addToCart(productId) {
        const size = this.uiService.selectedSizes[productId];
        if (!size) {
            this.uiService.showNotification('⚠️ Пожалуйста, выберите размер!', 'warning');
            return;
        }

        const product = this.productService.getProductById(productId);
        if (!product) return;

        this.cartService.addToCart(product, size);
        this.updateCartDisplay();
        this.uiService.showNotification(`✅ Добавлено: ${product.name} (размер ${size})`, 'success');
    }

    updateCartDisplay() {
        this.uiService.updateCartDisplay(this.cartService);
    }

    showCart() {
        this.uiService.showCartModal();
        this.updateCartItems();
    }

    hideCart() {
        this.uiService.hideCartModal();
    }

    updateCartItems() {
        const cartItems = document.getElementById('cart-items');
        if (!cartItems) return;

        if (this.cartService.cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Корзина пуста</p>';
            return;
        }

        cartItems.innerHTML = this.cartService.cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <strong>${item.product.name}</strong><br>
                    Размер: ${item.size}<br>
                    ${item.product.price.toLocaleString('ru-RU')} руб. × ${item.quantity}
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-btn" onclick="app.changeQuantity(${index}, -1)">-</button>
                    <span style="margin: 0 10px; font-weight: bold;">${item.quantity}</span>
                    <button class="quantity-btn" onclick="app.changeQuantity(${index}, 1)">+</button>
                    <button class="quantity-btn btn-danger" onclick="app.removeFromCart(${index})">×</button>
                </div>
            </div>
        `).join('');
    }

    changeQuantity(index, delta) {
        const item = this.cartService.cart[index];
        this.cartService.updateQuantity(item.product.id, item.size, delta);
        this.updateCartDisplay();
        this.updateCartItems();
    }

    removeFromCart(index) {
        const item = this.cartService.cart[index];
        this.cartService.removeFromCart(item.product.id, item.size);
        this.updateCartDisplay();
        this.updateCartItems();
    }

    clearCart() {
        this.cartService.clearCart();
        this.updateCartDisplay();
        this.updateCartItems();
        this.hideCart();
        this.uiService.showNotification('🗑️ Корзина очищена!', 'success');
    }

    checkout() {
        if (this.cartService.cart.length === 0) {
            this.uiService.showNotification('⚠️ Корзина пуста!', 'warning');
            return;
        }
        
        const total = this.cartService.getCartTotal();
        this.uiService.showNotification(`🎉 Заказ оформлен! Сумма: ${total.toLocaleString('ru-RU')} руб. Спасибо!`, 'success');
        this.clearCart();
    }
}

// Инициализация приложения
const app = new ShoeStoreApp();
window.app = app;
