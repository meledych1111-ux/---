export class CardService {
    static createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">${product.price} руб.</p>
            <p class="product-category">${this.getCategoryName(product.category)}</p>
            <p>Размеры: ${product.sizes.join(', ')}</p>
            <button class="add-to-cart" data-id="${product.id}">
                Добавить в корзину
            </button>
        `;
        return card;
    }

    static getCategoryName(category) {
        const categories = {
            sneakers: 'Кроссовки',
            boots: 'Ботинки',
            sandals: 'Сандалии',
            heels: 'Туфли'
        };
        return categories[category] || category;
    }
}
