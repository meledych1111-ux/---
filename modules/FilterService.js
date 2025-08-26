export class FilterService {
    constructor() {
        this.filters = {
            category: 'all',
            searchText: '',
            priceRange: 'all'
        };
    }

    updateFilter(key, value) {
        this.filters[key] = value;
    }

    getCurrentFilters() {
        return this.filters;
    }

    applyFilters(products, filters) {
        let result = [...products];

        // Фильтр по категории
        if (filters.category && filters.category !== 'all') {
            result = result.filter(p => p.category === filters.category);
        }

        // Фильтр по поиску
        if (filters.searchText && filters.searchText.trim() !== '') {
            const query = filters.searchText.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
        }

        // Фильтр по цене
        if (filters.priceRange && filters.priceRange !== 'all') {
            switch (filters.priceRange) {
                case '0-5000':
                    result = result.filter(p => p.price <= 5000);
                    break;
                case '5000-10000':
                    result = result.filter(p => p.price > 5000 && p.price <= 10000);
                    break;
                case '10000+':
                    result = result.filter(p => p.price > 10000);
                    break;
            }
        }

        return result;
    }
}
