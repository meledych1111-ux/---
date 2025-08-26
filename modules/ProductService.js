import { products } from './products.js';

export class ProductService {
    static getAllProducts() {
        return products;
    }

    static getProductsByCategory(category) {
        if (category === 'all') return products;
        return products.filter(product => product.category === category);
    }

    static getProductsByPrice(maxPrice) {
        return products.filter(product => product.price <= maxPrice);
    }

    static getProductsBySize(size) {
        if (size === 'all') return products;
        return products.filter(product => product.sizes.includes(parseInt(size)));
    }

    static getProductById(id) {
        return products.find(product => product.id === id);
    }

    static filterProducts(filters) {
        let filteredProducts = products;

        if (filters.category && filters.category !== 'all') {
            filteredProducts = filteredProducts.filter(
                product => product.category === filters.category
            );
        }

        if (filters.maxPrice) {
            filteredProducts = filteredProducts.filter(
                product => product.price <= filters.maxPrice
            );
        }

        if (filters.size && filters.size !== 'all') {
            filteredProducts = filteredProducts.filter(
                product => product.sizes.includes(parseInt(filters.size))
            );
        }

        return filteredProducts;
    }
}
