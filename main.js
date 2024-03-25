let products = [
    {
        id: 1,
        name: "ชาไทย",
        price: 35,
        image: "./images/82afce4e-c45f-43b6-ae7d-1f683d758518.jpg",
        quality: 0,
    },
    {
        id: 2,
        name: "ชาเขียว",
        price: 40,
        image: "./images/aea3111f-17ea-4f11-98a9-b0e7d9ab8080.jpg",
        quality: 0,
    },
    {
        id: 3,
        name: "โอวัลติน",
        price: 35,
        image: "./images/2629569c-f893-445e-9cec-5987d57235b5.jpg",
        quality: 0,
    },
    {
        id: 4,
        name: "ลาเต้",
        price: 50,
        image: "./images/18757a56-b68c-49ec-9f5d-5a356c8d0b4c.jpg",
        quality: 0,
    },
    {
        id: 5,
        name: "คาปูชิโน่",
        price: 55,
        image: "./images/e14afa76-cb90-4088-b9b2-2a835728e7a4.jpg",
        quality: 0,
    },
    {
        id: 6,
        name: "กาแฟส้ม",
        price: 75,
        image: "./images/01159376-0f46-46cc-8984-6c970f1dd1e8.jpg",
        quality: 0,
    },
];

let productCards = document.getElementById("productCards");
let productCarts = document.getElementById("AddToCart");

let totalItems = 0;
let totalPrice = 0;

products.forEach((product, index) => {
    productCards.innerHTML += `
        <div class="card card-compact w-64 bg-base-100 shadow-xl">
            <figure><img src="${product.image}" alt="${product.name}" class="h-72 w-full object-cover"/></figure>
            <div class="card-body">
                <h2 class="card-title">${product.name}</h2>
                
                <div class="card-actions justify-end">
                    <p class="text-lg font-bold text-[#926F4D]">${product.price}฿</p>
                    <button class="btn bg-[#94907a] rounded-full text-white" onclick="addToCart(${index})">Buy Now</button>
                </div>
            </div>
        </div>
    `;

    productCarts.innerHTML += `
        <tr id="cartItem-${index}" class="text-center hidden">
            <td>
                <div class="flex items-center gap-4">
                    <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                            <img src="${product.image}" alt="${product.name}" />
                        </div>
                    </div>
                    <div>
                        <div class="font-bold text-center">${product.name}</div>
                    </div>
                </div>
            </td>
            <td>
                ${product.price}
            </td>
            <td id="quality-${index}">
                ${product.quality}
            </td>
        </tr>
    `;
});

function addToCart(index) {
    document.getElementById(`cartItem-${index}`).classList.remove("hidden");
    totalItems++;
    document.getElementById("totalItems").innerText = totalItems;

    // Update totalPrice
    totalPrice += products[index].price;
    document.getElementById("cartCount").innerText = totalPrice;

    // Update quality
    products[index].quality++;
    document.getElementById(`quality-${index}`).innerText =
        products[index].quality;
}

function exportToPdf() {
    const cartItems = document.querySelectorAll("#AddToCart tr:not(.hidden)");
    let cartHtml = "";

    cartItems.forEach((item) => {
        cartHtml += item.outerHTML;
    });

    const content = `
        <html>
        <head>
            <style>
                .hidden {
                    display: table-row !important;
                }
                .avatar {
                    width: 50px;
                    height: 50px;
                    overflow: hidden;
                    border-radius: 15px;
                }
                .mask {
                    width: 100%;
                    height: 100%;
                }
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th, td {
                    padding: 8px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <h2 class="text-center text-2xl">Product Cart</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Menu</th>
                        <th>Price</th>
                        <th>Quality</th>
                    </tr>
                </thead>
                <tbody>
                    ${cartHtml}
                </tbody>
            </table>
            <div class="mt-4 text-center">
                <p>Total Items: ${totalItems}</p>
                <p>Total Price: ${totalPrice}฿</p>
            </div>
        </body>
        </html>
    `;

    const opt = {
        margin: 1,
        filename: "product_cart.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(content).set(opt).save();
}
