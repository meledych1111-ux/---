import { ProductService } from './modules/ProductService.js';
import { CartService } from './modules/CartService.js';
import { UIService } from './modules/UIService.js';
import { FilterService } from './modules/FilterService.js';
import { SupabaseAuthService } from './SupabaseAuthService.js';
import { SupabaseOrderService } from './SupabaseOrderService.js';
import { NotificationService } from './modules/NotificationService.js';

class ShoeStoreApp {
    constructor() {
        this.productService = new ProductService();
        this.cartService = new CartService();
        this.uiService = new UIService();
        this.filterService = new FilterService();
        this.authService = new SupabaseAuthService();
        this.orderService = new SupabaseOrderService(this.authService);
        this.notificationService = new NotificationService();
        
        this.selectedPaymentMethod = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.displayProducts();
        this.updateCartDisplay();
        this.loadUser();
    }

    // Загрузка пользователя
    loadUser() {
        this.authService.loadAuthData();
        if (this.authService.checkAuth()) {
            this.showUserMenu();
        }
    }

    // Показать меню пользователя
    showUserMenu() {
        const user = this.authService.getCurrentUser();
        const userGreeting = document.getElementById('user-greeting');
        const loginBtn = document.getElementById('login-btn');
        const registerBtn = document.getElementById('register-btn');
        const logoutBtn = document.getElementById('logout-btn');

        if (user && userGreeting) {
            userGreeting.textContent = `Привет, ${user.name || user.email}!`;
            userGreeting.style.display = 'block';
        }

        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
    }

    // Скрыть меню пользователя
    hideUserMenu() {
        const userGreeting = document.getElementById('user-greeting');
        const loginBtn = document.getElementById('login-btn');
        const registerBtn = document.getElementById('register-btn');
        const logoutBtn = document.getElementById('logout-btn');

        if (userGreeting) userGreeting.style.display = 'none';
        if (loginBtn) loginBtn.style.display = 'block';
        if (registerBtn) registerBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }

    // Показать модальное окно логина
    showLoginModal() {
        const modal = document.getElementById('login-modal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    // Скрыть модальное окно логина
    hideLoginModal() {
        const modal = document.getElementById('login-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Показать модальное окно регистрации
    showRegisterModal() {
        const modal = document.getElementById('register-modal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    // Скрыть модальное окно регистрации
    hideRegisterModal() {
        const modal = document.getElementById('register-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Показать модальное окно оплаты
    showPaymentModal() {
        const modal = document.getElementById('payment-modal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    // Скрыть модальное окно оплаты
    hidePaymentModal() {
        const modal = document.getElementById('payment-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Регистрация пользователя
    async registerUser(userData) {
        const result = await this.authService.register(userData);
        if (result.success) {
            this.notificationService.showSuccess('Регистрация успешна!');
            this.showUserMenu();
            this.hideRegisterModal();
        } else {
            this.notificationService.showError(result.error);
        }
    }

    // Вход пользователя
    async loginUser(email, password) {
        const result = await this.authService.login(email, password);
        if (result.success) {
            this.notificationService.showSuccess('Вход выполнен!');
            this.showUserMenu();
            this.hideLoginModal();
        } else {
            this.notificationService.showError(result.error);
        }
    }

    // Выход пользователя
    logout() {
        this.authService.logout();
        this.notificationService.showSuccess('Вы успешно вышли из системы');
        this.hideUserMenu();
    }

    // Оформление заказа с оплатой
    async processPayment() {
        if (!this.authService.checkAuth()) {
            this.showLoginModal();
            return;
        }

        if (this.cartService.cart.length === 0) {
            this.notificationService.showError('Корзина пуста!');
            return;
        }

        const user = this.authService.getCurrentUser();
        const orderData = {
            userId: user.id,
            items: this.cartService.cart,
            total: this.cartService.getCartTotal(),
            paymentMethod: this.selectedPaymentMethod,
            customerName: user.name,
            customerEmail: user.email,
            customerPhone: user.phone,
            timestamp: new Date().toISOString()
        };

        const result = await this.orderService.createOrder(orderData);

        if (result.success) {
            this.notificationService.showSuccess('Заказ успешно оформлен!');
            this.cartService.clearCart();
            this.updateCartDisplay();
            this.hidePaymentModal();
            this.hideCart();
        } else {
            this.notificationService.showError('Ошибка оплаты: ' + result.error);
        }
    }

    // Выбор способа оплаты
    selectPaymentMethod(method) {
        this.selectedPaymentMethod = method;
        
        // Визуальное выделение выбранного способа
        const paymentMethods = document.querySelectorAll('.payment-method');
        paymentMethods.forEach(m => {
            m.classList.remove('selected');
            if (m.dataset.method === method) {
                m.classList.add('selected');
            }
        });
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

        // Обработчики для авторизации
        this.setupAuthEventListeners();
        
        // Обработчики для оплаты
        this.setupPaymentEventListeners();
    }

    // Обработчики для авторизации
    setupAuthEventListeners() {
        // Форма регистрации
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const userData = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    password: formData.get('password'),
                    phone: formData.get('phone')
                };
                await this.registerUser(userData);
            });
        }

        // Форма входа
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const email = formData.get('email');
                const password = formData.get('password');
                await this.loginUser(email, password);
            });
        }

        // Кнопки
        const loginBtn = document.getElementById('login-btn');
        const registerBtn = document.getElementById('register-btn');
        const logoutBtn = document.getElementById('logout-btn');

        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.showLoginModal());
        }

        if (registerBtn) {
            registerBtn.addEventListener('click', () => this.showRegisterModal());
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
    }

    // Обработчики для оплаты
    setupPaymentEventListeners() {
        // Кнопки выбора способа оплаты
        const paymentMethods = document.querySelectorAll('.payment-method');
        paymentMethods.forEach(method => {
            method.addEventListener('click', (e) => {
                const selectedMethod = e.currentTarget.dataset.method;
                this.selectPaymentMethod(selectedMethod);
            });
        });

        // Кнопка оплаты
        const payButton = document.querySelector('.pay-button');
        if (payButton) {
            payButton.addEventListener('click', () => this.processPayment());
        }
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

    // Старый метод checkout для совместимости
    checkout() {
        if (!this.authService.checkAuth()) {
            this.showLoginModal();
            return;
        }

        if (this.cartService.cart.length === 0) {
            this.uiService.showNotification('⚠️ Корзина пуста!', 'warning');
            return;
        }

        this.showPaymentModal();
    }
}

// Инициализация приложения
const app = new ShoeStoreApp();
window.app = app;
