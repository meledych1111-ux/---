import { ProductService } from './modules/ProductService.js';
import { FilterService } from './modules/FilterService.js';
import { NotificationService } from './modules/NotificationService.js';
import { UIService } from './modules/UIService.js';

class ShoeStore {
    constructor() {
        this.filters = {
            category: 'all',
            maxPrice: 10000,
            size: 'all'
        };
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
        const filterManager = FilterService.initFilters(() => {
            this.filters = filterManager.getFilters();
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
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                NotificationService.show('Корзина пуста!', 'error');
                return;
            }
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
            
            // Очистка формы
            e.target.reset();
        });

        // Быстрые фильтры по категориям (добавляем в шапку)
        this.addQuickCategoryFilters();
    }

    addQuickCategoryFilters() {
        // Добавляем быстрые кнопки категорий в шапку
        const nav = document.querySelector('.nav');
        const quickFilters = document.createElement('div');
        quickFilters.className = 'quick-filters';
        quickFilters.innerHTML = `
            <button class="quick-filter" data-category="sneakers">Кроссовки</button>
            <button class="quick-filter" data-category="boots">Ботинки</button>
            <button class="quick-filter" data-category="sandals">Сандалии</button>
            <button class="quick-filter" data-category="heels">Туфли</button>
            <button class="quick-filter" data-category="all">Все товары</button>
        `;
        nav.appendChild(quickFilters);

        // Обработчики для быстрых фильтров
        document.querySelectorAll('.quick-filter').forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                document.getElementById('categoryFilter').value = category;
                this.filters.category = category;
                this.renderProducts();
            });
        });
    }

    renderProducts() {
        const filteredProducts = ProductService.filterProducts(this.filters);
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
