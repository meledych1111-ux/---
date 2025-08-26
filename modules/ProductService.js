export class ProductService {
    constructor() {
        this.products = [
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
                description: "Классические кеды на любой случай. Вечная классика.",
                sizes: [37, 38, 39, 40, 41, 42],
                category: "sneakers"
            },
            {
                id: 3,
                name: "👢 Сапоги зимние утепленные",
                price: 7590,
                image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=350&fit=crop",
                description: "Теплые сапоги для суровой зимы. Меховая подкладка.",
                sizes: [36, 37, 38, 39, 40, 41],
                category: "boots"
            },
            {
                id: 4,
                name: "👞 Туфли офисные кожаные",
                price: 6590,
                image: "https://images.unsplash.com/photo-1560769684-55015cee73d7?w=400&h=300&fit=crop",
                description: "Элегантные туфли для делового стиля. Качественная кожа.",
                sizes: [38, 39, 40, 41, 42, 43],
                category: "shoes"
            },
            {
                id: 5,
                name: "👠 Туфли вечерние на каблуке",
                price: 8990,
                image: "https://images.unsplash.com/photo-1534653299134-96a9b2b7f1e6?w=400&h=300&fit=crop",
                description: "Элегантные вечерние туфли для особых случаев.",
                sizes: [36, 37, 38, 39],
                category: "shoes"
            }
        ];
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

    searchProducts(searchText) {
        const searchLower = searchText.toLowerCase();
        return this.products.filter(product =>
            product.name.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower)
        );
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
}
