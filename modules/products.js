
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
        category: "sneakers",
        features: ["Амортизация", "Дышащий материал", "Стильный дизайн"],
        colors: ["black", "white", "red"]
    },
    {
        id: 2,
        name: "👟 Кеды Converse Classic",
        price: 4990,
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=300&fit=crop",
        description: "Классические кеды на любой случай. Вечная классика, которая никогда не выходит из моды.",
        sizes: [37, 38, 39, 40, 41, 42],
        category: "sneakers",
        features: ["Классический дизайн", "Универсальность", "Комфорт"],
        colors: ["black", "white", "blue"]
    },
    {
        id: 3,
        name: "👢 Сапоги зимние утепленные",
        price: 7590,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=350&fit=crop",
        description: "Теплые сапоги для суровой зимы. Меховая подкладка и водонепроницаемая мембрана.",
        sizes: [36, 37, 38, 39, 40, 41],
        category: "boots",
        features: ["Утепление", "Водоотталкивающие", "Меховая подкладка"],
        colors: ["brown", "black"]
    },
    {
        id: 4,
        name: "👞 Туфли офисные кожаные",
        price: 6590,
        image: "https://images.unsplash.com/photo-1560769684-55015cee73d7?w=400&h=300&fit=crop",
        description: "Элегантные туфли для делового стиля. Качественная натуральная кожа и удобная колодка.",
        sizes: [38, 39, 40, 41, 42, 43],
        category: "shoes",
        features: ["Натуральная кожа", "Деловой стиль", "Качественная строчка"],
        colors: ["black", "brown"]
    },
    {
        id: 5,
        name: "👠 Туфли вечерние на каблуке",
        price: 8990,
        image: "https://images.unsplash.com/photo-1534653299134-96a9b2b7f1e6?w=400&h=300&fit=crop",
        description: "Элегантные вечерние туфли для особых случаев. Идеальны для торжественных мероприятий.",
        sizes: [36, 37, 38, 39],
        category: "shoes",
        features: ["Вечерний стиль", "Удобный каблук", "Элегантность"],
        colors: ["black", "red", "silver"]
    },
    {
        id: 6,
        name: "👟 Кроссовки Adidas Ultraboost",
        price: 10990,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop",
        description: "Ультралегкие кроссовки с технологией Boost. Максимальная энергоотдача и комфорт.",
        sizes: [39, 40, 41, 42, 43, 44],
        category: "sneakers",
        features: ["Технология Boost", "Энергоотдача", "Легкий вес"],
        colors: ["black", "white", "gray"]
    },
    {
        id: 7,
        name: "👟 Кроссовки Puma RS-X",
        price: 7990,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop",
        description: "Стильные кроссовки в ретро-стиле. Яркий дизайн и максимальный комфорт для повседневной носки.",
        sizes: [38, 39, 40, 41, 42, 43],
        category: "sneakers",
        features: ["Ретро стиль", "Яркий дизайн", "Комфорт"],
        colors: ["red", "blue", "yellow"]
    },
    {
        id: 8,
        name: "👞 Лоферы классические",
        price: 5590,
        image: "https://images.unsplash.com/photo-1542280756-74b2f55e73ab?w=400&h=300&fit=crop",
        description: "Стильные лоферы для повседневной носки. Натуральная кожа и универсальный дизайн.",
        sizes: [39, 40, 41, 42, 43],
        category: "shoes",
        features: ["Универсальность", "Натуральная кожа", "Классический стиль"],
        colors: ["brown", "black", "burgundy"]
    },
    {
        id: 9,
        name: "👢 Сапоги демисезонные",
        price: 6890,
        image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=300&fit=crop",
        description: "Стильные демисезонные сапоги. Идеальны для весны и осени, качественные материалы.",
        sizes: [37, 38, 39, 40, 41],
        category: "boots",
        features: ["Демисезонные", "Стильный дизайн", "Качественные материалы"],
        colors: ["black", "brown", "gray"]
    },
    {
        id: 10,
        name: "👟 Кроссовки New Balance 574",
        price: 7490,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
        description: "Классические кроссовки New Balance 574. Легендарная модель с современным комфортом.",
        sizes: [38, 39, 40, 41, 42, 43, 44],
        category: "sneakers",
        features: ["Классика", "Комфорт", "Качество"],
        colors: ["gray", "blue", "green"]
    }
];

/**
 * Вспомогательные функции для работы с товарами
 */
export const ProductUtils = {
    // Получить товары по категории
    getByCategory: (category) => {
        if (category === 'all') return products;
        return products.filter(product => product.category === category);
    },

    // Поиск товаров
    search: (query) => {
        const searchTerm = query.toLowerCase();
        return products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.features.some(feature => feature.toLowerCase().includes(searchTerm))
        );
    },

    // Фильтр по цене
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

    // Получить уникальные категории
    getCategories: () => {
        const categories = [...new Set(products.map(product => product.category))];
        return ['all', ...categories];
    },

    // Получить товар по ID
    getById: (id) => {
        return products.find(product => product.id === id);
    },

    // Получить доступные размеры для товара
    getSizes: (productId) => {
        const product = products.find(p => p.id === productId);
        return product ? product.sizes : [];
    },

    // Получить товары по массиву ID
    getByIds: (ids) => {
        return products.filter(product => ids.includes(product.id));
    }
};

// Для обратной совместимости
export default products;
