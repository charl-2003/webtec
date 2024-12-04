// Fetch product data
fetch('/data/script.json')
    .then(response => response.json())
    .then(data => {
        const products = data.Products; // Access the Products object

        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-item';

            // Create product content
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h3>${product.name}</h3>
                <p>Price: $${product.price.toFixed(2)}</p>
                <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
            `;

            document.getElementById('product-list').appendChild(productElement);
        });
    })
    .catch(error => console.error('Error fetching products:', error));

// Initialize cart items from localStorage
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display cart items
function displayCart() {
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = ''; // Clear the cart

    if (cartItems.length === 0) {
        cartElement.innerHTML = "<h2>Your Cart is Empty!</h2>";
        return;
    }

    let total = 0;

    cartItems.forEach((item, index) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';

        // Create item content
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;

        cartElement.appendChild(cartItemElement);
        total += item.price; // Add to total
    });

    const totalElement = document.createElement('div');
    totalElement.className = 'cart-total';
    totalElement.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
    cartElement.appendChild(totalElement);
}

// Function to add item to the cart
function addToCart(product) {
    cartItems.push(product);
    localStorage.setItem('cart', JSON.stringify(cartItems)); // Save to localStorage
    displayCart(); // Refresh cart display
}

// Function to remove item from the cart
function removeFromCart(index) {
    cartItems.splice(index, 1); // Remove item from array
    localStorage.setItem('cart', JSON.stringify(cartItems)); // Update localStorage
    displayCart(); // Refresh cart display
}

// Initial call to display cart items on page load
displayCart();