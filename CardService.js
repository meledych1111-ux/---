export class CartService {
    constructor() {
        this.cart = this.loadCartFromStorage();
    }

    addToCart(product, size, quantity = 1) {
        const existingItem = this.cart.find(item =>
            item.product.id === product.id && item.size === size
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                product,
                size,
                quantity,
                addedAt: new Date()
            });
        }

        this.saveCartToStorage();
        return this.cart;
    }

    removeFromCart(productId, size) {
        this.cart = this.cart.filter(item =>
            !(item.product.id === productId && item.size === size)
        );
        this.saveCartToStorage();
        return this.cart;
    }

    updateQuantity(productId, size, delta) {
        const item = this.cart.find(item =>
            item.product.id === productId && item.size === size
        );

        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                this.removeFromCart(productId, size);
            } else {
                this.saveCartToStorage();
            }
        }

        return this.cart;
    }

    clearCart() {
        this.cart = [];
        this.saveCartToStorage();
        return this.cart;
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    }

    getCartItemsCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }

    saveCartToStorage() {
        try {
            localStorage.setItem('shoeStoreCart', JSON.stringify(this.cart));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    loadCartFromStorage() {
        try {
            const savedCart = localStorage.getItem('shoeStoreCart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }
}
