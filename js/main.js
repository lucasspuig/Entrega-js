const products = [
    { id: 1, name: 'Cerveza', price: 30, img: './assets/cerveza.png' },
    { id: 2, name: 'Campari', price: 90, img: './assets/campari.png' },
    { id: 3, name: 'Fernet', price: 90, img: './assets/fernetR.png' },
    { id: 4, name: 'Vino', price: 180, img: './assets/vino.jpg' },
    { id: 5, name: 'Gin tonic Premium', price: 95, img: './assets/ee-3.jpg' },
    { id: 6, name: 'Vodka', price: 90, img: './assets/vodka.jpeg' },
    { id: 7, name: 'Tequila', price: 150, img: './assets/tequila.jpg' },
    { id: 8, name: 'Whiskey', price: 100, img: './assets/whiskey.jpg' },
];

let allProducts = [];

const showHTML = () => {
    const rowProduct = document.querySelector('.row-product');
    const valorTotal = document.querySelector('.total-pagar');
    const countProducts = document.querySelector('#contador-productos');
    const cartEmpty = document.querySelector('.cart-empty');
    const cartTotal = document.querySelector('.cart-total');

    if (!allProducts.length) {
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }

    rowProduct.innerHTML = '';
    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.name}</p>
                <span class="precio-producto-carrito">$${product.price}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close" onclick="removeProduct(${product.id})">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        `;

        rowProduct.append(containerProduct);

        total += product.quantity * product.price;
        totalOfProducts += product.quantity;
    });

    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;
};

const addProduct = (id) => {
    const productInCart = allProducts.find(product => product.id === id);
    if (productInCart) {
        productInCart.quantity++;
    } else {
        const productToAdd = products.find(product => product.id === id);
        allProducts.push({ ...productToAdd, quantity: 1 });
    }
    showHTML();
};

const removeProduct = (id) => {
    allProducts = allProducts.filter(product => product.id !== id);
    showHTML();
};

const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

document.addEventListener('DOMContentLoaded', () => {
    const containerItems = document.querySelector('.container-items');
    products.forEach(product => {
        const item = document.createElement('div');
        item.classList.add('item');
        item.innerHTML = `
            <figure>
                <img src="${product.img}" alt="${product.name}">
            </figure>
            <div class="info-product">
                <h2>${product.name}</h2>
                <p>$${product.price}</p>
                <button class="btn-add-cart" onclick="addProduct(${product.id})">Agregar al Carrito</button>
            </div>
        `;
        containerItems.appendChild(item);
    });

    // Validación de edad
    Swal.fire({
        title: 'Verificación de Edad',
        text: '¿Tienes más de 18 años?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            // Continuar
        } else {
            Swal.fire('Lo sentimos', 'Debes ser mayor de 18 años para acceder.', 'error').then(() => {
                window.location.href = 'https://www.example.com';
            });
        }
    });
});
