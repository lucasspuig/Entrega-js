const products = [
    { id: 1, name: 'Cerveza', price: 30, img: './assets/cerveza.png' },
    { id: 2, name: 'Campari', price: 90, img: './assets/campari.png' },
    { id: 3, name: 'Fernet', price: 90, img: './assets/fernetR.png' },
    { id: 4, name: 'Vino', price: 180, img: './assets/vino.jpg' },
    { id: 5, name: 'Gin tonic Premium', price: 95, img: './assets/ee-3.jpg' },
    { id: 6, name: 'Vodka', price: 90, img: './assets/vodka.jpeg' },
    { id: 7, name: 'Tequila', price: 120, img: './assets/tequi.jpeg' },
    { id: 8, name: 'Whisky', price: 170, img: './assets/red.jpeg' },
    { id: 9, name: 'Ron', price: 170, img: './assets/ron.jpeg' },
    { id: 10, name: 'Champagne', price: 170, img: './assets/donperig.jpg' },
];

let allProducts = JSON.parse(localStorage.getItem('cart')) || [];
const containerItems = document.querySelector('.container-items');

const createProductCards = () => {
    containerItems.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('item');
        productDiv.id = `product-${product.id}`;

        productDiv.innerHTML = `
            <figure>
                <img src="${product.img}" alt="${product.name}">
            </figure>
            <div class="info-product">
                <h2>${product.name}</h2>
                <p class="price">$${product.price}</p>
                <button class="btn-add-cart">Añadir al carrito</button>
            </div>
        `;

        containerItems.appendChild(productDiv);
    });
};

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
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.name}</p>
                <span class="precio-producto-carrito">$${product.price}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
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

showHTML();

containerItems.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        const productElement = e.target.closest('.item');
        const productId = parseInt(productElement.id.split('-')[1]);
        const product = products.find(p => p.id === productId);

        const productInCart = allProducts.find(p => p.id === product.id);
        if (productInCart) {
            productInCart.quantity++;
        } else {
            allProducts.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(allProducts));
        showHTML();
    }
});

const validateAge = () => {
    Swal.fire({
        title: 'Ingrese su edad',
        input: 'number',
        inputAttributes: {
            min: 0,
            max: 100,
            step: 1
        },
        showCancelButton: false,
        confirmButtonText: 'Enviar',
        allowOutsideClick: false,
        inputValidator: (value) => {
            if (!value || value < 18) {
                return 'Debes ser mayor de edad para acceder a la tienda.';
            }
        }
    }).then((result) => {
        if (result.value && result.value >= 18) {
            createProductCards();
        } else {
            window.location.href = 'https://www.example.com';
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    validateAge();
});

const orderForm = document.querySelector('#order-form');

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    Swal.fire({
        title: 'Compra exitosa',
        text: '¡Gracias por tu compra! Tu pedido ha sido procesado correctamente.',
        icon: 'success',
        confirmButtonText: 'OK'
    }).then(() => {
        orderForm.reset();
        allProducts = [];
        localStorage.setItem('cart', JSON.stringify(allProducts));
        showHTML();
    });
});