import { products } from './products.js';

export class ProductService {
    constructor() {
        this.products = products;
    }

    getAllProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    getProductsByCategory(category) {
        if (category === 'all') return this.products;
        return this.products.filter(product => product.category === category);
    }

    searchProducts(searchText, productsArray = this.products) {
        const searchLower = searchText.toLowerCase();
        return productsArray.filter(product =>
            product.name.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower)
        );
    }

    filterByPrice(productsArray, priceRange) {
        switch (priceRange) {
            case '0-5000':
                return productsArray.filter(product => product.price <= 5000);
            case '5000-10000':
                return productsArray.filter(product => product.price > 5000 && product.price <= 10000);
            case '10000+':
                return productsArray.filter(product => product.price > 10000);
            default:
                return productsArray;
        }
    }
}
