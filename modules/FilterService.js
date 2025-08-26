export class FilterService {
    constructor() {
        this.filters = {
            searchText: '',
            priceRange: 'all',
            category: 'all'
        };
    }

    applyFilters(products, filters) {
        let filteredProducts = products;

        // Фильтр по категории
        if (filters.category !== 'all') {
            filteredProducts = filteredProducts.filter(product => 
                product.category === filters.category
            );
        }

        // Поиск по тексту
        if (filters.searchText) {
            const searchLower = filters.searchText.toLowerCase();
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(searchLower) ||
                product.description.toLowerCase().includes(searchLower)
            );
        }

        // Фильтр по цене
        filteredProducts = this.filterByPrice(filteredProducts, filters.priceRange);

        return filteredProducts;
    }

    filterByPrice(products, priceRange) {
        switch (priceRange) {
            case '0-5000':
                return products.filter(product => product.price <= 5000);
            case '5000-10000':
                return products.filter(product => product.price > 5000 && product.price <= 10000);
            case '10000+':
                return products.filter(product => product.price > 10000);
            default:
                return products;
        }
    }

    updateFilter(key, value) {
        this.filters[key] = value;
        return this.filters;
    }

    getCurrentFilters() {
        return { ...this.filters };
    }
}
