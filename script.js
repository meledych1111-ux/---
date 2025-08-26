import { ProductService } from './modules/ProductService.js';
import { FilterService } from './modules/FilterService.js';
import { NotificationService } from './modules/NotificationService.js';
import { UIService } from './modules/UIService.js';

class ShoeStore {
    constructor() {
        this.init();
    }

    init() {
        this.initEventListeners();
        this.renderProducts();
        UIService.initModals();
        UIService.updateCartCount();
    }

    initEventListeners() {
        // Фильтрация товаров
        FilterService.initFilters(() => {
            this.renderProducts();
        });

        // Добавление в корзину
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                const productId = parseInt(e.target.dataset.id);
                this.addToCart(productId);
            }
        });

        // Форма входа
        document.getElementById('authForm').addEventListener('submit', (e) => {
            e.preventDefault();
            NotificationService.show('Вход выполнен успешно!');
            document.getElementById('authModal').style.display = 'none';
        });

        // Оформление заказа
        document.getElementById('checkoutBtn').addEventListener('click', () => {
            document.getElementById('cartModal').style.display = 'none';
            document.getElementById('paymentModal').style.display = 'block';
        });

        // Форма оплаты
        document.getElementById('paymentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            NotificationService.show('Заказ успешно оформлен!');
            localStorage.removeItem('cart');
            UIService.updateCartCount();
            document.getElementById('paymentModal').style.display = 'none';
        });
    }

    renderProducts() {
        const filters = FilterService.initFilters(() => {}).getFilters();
        const filteredProducts = ProductService.filterProducts(filters);
        UIService.renderProducts(filteredProducts);
    }

    addToCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id: productId, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        UIService.updateCartCount();
        NotificationService.show('Товар добавлен в корзину!');
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    new ShoeStore();
});
