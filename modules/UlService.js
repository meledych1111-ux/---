import { CardService } from './CardService.js';
import { ProductService } from './ProductService.js';

export class UIService {
    static renderProducts(products) {
        const productsGrid = document.getElementById('productsGrid');
        productsGrid.innerHTML = '';

        if (products.length === 0) {
            productsGrid.innerHTML = '<p>Товары не найдены</p>';
            return;
        }

        products.forEach(product => {
            const card = CardService.createProductCard(product);
            productsGrid.appendChild(card);
        });
    }

    static initModals() {
        const modals = document.querySelectorAll('.modal');
        const closeButtons = document.querySelectorAll('.close');

        // Закрытие модальных окон
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                modals.forEach(modal => modal.style.display = 'none');
            });
        });

        // Закрытие при клике вне окна
        window.addEventListener('click', (e) => {
            modals.forEach(modal => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // Открытие модальных окон
        document.getElementById('authBtn').addEventListener('click', () => {
            document.getElementById('authModal').style.display = 'block';
        });

        document.getElementById('cartBtn').addEventListener('click', () => {
            document.getElementById('cartModal').style.display = 'block';
            this.renderCart();
        });
    }

    static renderCart() {
        const cartItems = document.getElementById('cartItems');
        const totalPrice = document.getElementById('totalPrice');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        cartItems.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Корзина пуста</p>';
            totalPrice.textContent = '0';
            return;
        }

        cart.forEach(item => {
            const product = ProductService.getProductById(item.id);
            if (product) {
                total += product.price * item.quantity;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${product.name}</h4>
                        <p class="cart-item-price">${product.price} руб. x ${item.quantity}</p>
                    </div>
                    <button class="remove-from-cart" data-id="${product.id}">Удалить</button>
                `;
                cartItems.appendChild(cartItem);
            }
        });

        totalPrice.textContent = total;

        // Обработчики для кнопок удаления
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                this.removeFromCart(productId);
            });
        });
    }

    static updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cartCount').textContent = totalItems;
    }

    static removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        this.renderCart();
        this.updateCartCount();
    }
}
