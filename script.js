fetch('../data/script.json')
    .then(response => response.json())
    .then(data => {
        const products = data.Products; // Access the Products object
        
        // Iterate over the properties of the Products object
        for (const key in products) {
            if (products.hasOwnProperty(key)) {
                const product = products[key]; // Get each product object

                const productDiv = document.createElement('div');
                productDiv.className = 'products';

                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>${product.desc}</p>
                    <p>Size: ${product.size}</p>
                    <p>Type: ${product.type}</p>
                    <p>Price: ${product.price}</p>
                    <a href="cart.html" class="cta-button">Add To Cart</a>
                `;

                document.getElementById('product').appendChild(productDiv);
            }
        }
    })
    .catch(error => console.error('Error fetching products:', error));


    function addToCart(productId) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const isProductInCart = cart.some((id) => id === productId);
      
        if (!isProductInCart) {
          cart.push(productId);
          localStorage.setItem("cart", JSON.stringify(cart));
          alert("Product added to cart!");
        } else {
          alert("Product is already in the cart!");
        }
      }