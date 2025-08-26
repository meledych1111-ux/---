/**
 * Данные товаров для магазина обуви
 * Легко редактировать и добавлять новые товары
 */

export const products = [
    {
        id: 1,
        name: "👟 Кроссовки Nike Air Max",
        price: 8990,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
        description: "Стильные и удобные кроссовки для повседневной носки. Технология Air Max для максимального комфорта.",
        sizes: [38, 39, 40, 41, 42, 43, 44],
        category: "sneakers"
    },
    {
        id: 2,
        name: "👟 Кеды Converse Classic",
        price: 4990,
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=300&fit=crop",
        description: "Классические кеды на любой случай. Вечная классика, которая никогда не выходит из моды.",
        sizes: [37, 38, 39, 40, 41, 42],
        category: "sneakers"
    },
    {
        id: 3,
        name: "👢 Сапоги зимние утепленные",
        price: 7590,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=350&fit=crop",
        description: "Теплые сапоги для суровой зимы. Меховая подкладка и водонепроницаемая мембрана.",
        sizes: [36, 37, 38, 39, 40, 41],
        category: "boots"
    },
    {
        id: 4,
        name: "👞 Туфли офисные кожаные",
        price: 6590,
        image: "https://images.unsplash.com/photo-1560769684-55015cee73d7?w=400&h=300&fit=crop",
        description: "Элегантные туфли для делового стиля. Качественная натуральная кожа и удобная колодка.",
        sizes: [38, 39, 40, 41, 42, 43],
        category: "shoes"
    },
    {
        id: 5,
        name: "👠 Туфли вечерние на каблуке",
        price: 8990,
        image: "https://images.unsplash.com/photo-1534653299134-96a9b2b7f1e6?w=400&h=300&fit=crop",
        description: "Элегантные вечерние туфли для особых случаев. Идеальны для торжественных мероприятий.",
        sizes: [36, 37, 38, 39],
        category: "shoes"
    }
];

/**
 * Вспомогательные функции для работы с товарами
 */
export const ProductUtils = {
    getByCategory: (category) => {
        if (category === 'all') return products;
        return products.filter(product => product.category === category);
    },

    search: (query) => {
        const searchTerm = query.toLowerCase();
        return products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    },

    filterByPrice: (productsArray, priceRange) => {
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
    },

    getById: (id) => products.find(product => product.id === id)
};
