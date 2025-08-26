export class FilterService {
    static initFilters(onFilterChange) {
        const categoryFilter = document.getElementById('categoryFilter');
        const priceFilter = document.getElementById('priceFilter');
        const priceValue = document.getElementById('priceValue');
        const sizeFilter = document.getElementById('sizeFilter');

        // Установка начальных значений
        priceFilter.value = 10000;
        priceValue.textContent = '10000 руб.';

        // Обработчики событий
        categoryFilter.addEventListener('change', onFilterChange);
        sizeFilter.addEventListener('change', onFilterChange);
        
        priceFilter.addEventListener('input', (e) => {
            priceValue.textContent = `${e.target.value} руб.`;
            onFilterChange();
        });

        return {
            getFilters: () => ({
                category: categoryFilter.value,
                maxPrice: parseInt(priceFilter.value),
                size: sizeFilter.value
            })
        };
    }
}
