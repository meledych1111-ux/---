export class UIService {
    constructor() {
        this.selectedSizes = {};
    }

    // Отображение товаров
    displayProducts(products, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (products.length === 0) {
            container.innerHTML = this.getNoProductsHTML();
            return;
        }

        container.innerHTML = products.map(product => this.getProductHTML(product)).join('');
    }

    getProductHTML(product) {
        return `
            <div class="product-card" data-id="${product.id}" data-category="${product.category}">
                <img src="${product.image}" alt="${product.name}" 
                     onerror="this.src='https://via.placeholder.com/400x300/CCCCCC/white?text=Нет+фото'">
                <h3>${product.name}</h3>
                <p class="description">${product.description}</p>
                <div class="price">${product.price.toLocaleString('ru-RU')} руб.</div>
                
                <div class="sizes">
                    <strong>Размеры:</strong>
                    ${product.sizes.map(size => this.getSizeButtonHTML(product.id, size)).join('')}
                </div>
                
                <button class="add-to-cart" 
                        onclick="app.addToCart(${product.id})"
                        ${!this.selectedSizes[product.id] ? 'disabled' : ''}>
                    🛒 Добавить в корзину
                </button>
            </div>
        `;
    }

    getSizeButtonHTML(productId, size) {
        const isSelected = this.selectedSizes[productId] === size;
        return `
            <button class="size-btn ${isSelected ? 'selected' : ''}" 
                    onclick="app.selectSize(${productId}, ${size})">
                ${size}
            </button>
        `;
    }

    getNoProductsHTML() {
        return `
            <div class="empty-cart">
                <h3>😔 Товары не найдены</h3>
                <p>Попробуйте изменить параметры поиска или фильтры</p>
            </div>
        `;
    }

    // Работа с корзиной
    updateCartDisplay(cart) {
        const badge = document.getElementById('cart-badge');
        const totalElement = document.getElementById('cart-total');
        
        if (badge) badge.textContent = cart.getCartItemsCount();
        if (totalElement) totalElement.textContent = cart.getCartTotal().toLocaleString('ru-RU');
    }

    showCartModal() {
        const modal = document.getElementById('cart-modal');
        if (modal) modal.style.display = 'flex';
    }

    hideCartModal() {
        const modal = document.getElementById('cart-modal');
        if (modal) modal.style.display = 'none';
    }

    // Уведомления
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Выбор размера
    selectSize(productId, size) {
        this.selectedSizes[productId] = size;
        this.updateSizeSelection(productId, size);
    }

    updateSizeSelection(productId, size) {
        const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
        if (!productCard) return;

        const sizeButtons = productCard.querySelectorAll('.size-btn');
        sizeButtons.forEach(btn => btn.classList.remove('selected'));
        
        const selectedBtn = productCard.querySelector(`.size-btn[onclick="app.selectSize(${productId}, ${size})"]`);
        if (selectedBtn) selectedBtn.classList.add('selected');

        const addButton = productCard.querySelector('.add-to-cart');
        if (addButton) addButton.disabled = false;
    }
}
