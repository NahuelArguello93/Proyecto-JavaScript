document.addEventListener("DOMContentLoaded", () => {
    const productosContainer = document.getElementById("productos");
    const carritoBoton = document.getElementById("carritoBoton");
    const carritoPopup = document.getElementById("carritoPopup");
    const carritoItems = document.getElementById("carritoItems");
    const totalElement = document.getElementById("total");
    const cartCount = document.getElementById("cartCount");
    const cerrarCarrito = document.getElementById("cerrarCarrito");
    const finalizarCompra = document.getElementById("finalizarCompra");

    let carrito = [];
    let total = 0;

    // Función para cargar productos
    async function cargarProductos() {
        const response = await fetch("/js/productos.json");
        const productos = await response.json();

        productos.forEach(producto => {
            const div = document.createElement("div");
            div.className = "ofertas";
            div.innerHTML = `
                <img src="${producto.img}" alt="${producto.nombre}" class="producto-img">
                <h3>${producto.nombre}</h3>
                <p class="oferta-precio">${producto.precio}€</p>
                <button class="oferta-agregar" data-id="${producto.id}" data-precio="${producto.precio}" data-nombre="${producto.nombre}">Agregar al carrito</button>
            `;
            productosContainer.appendChild(div);
        });
    }

    cargarProductos();

    // Función para manejar agregar al carrito
    productosContainer.addEventListener("click", e => {
        if (e.target.classList.contains("oferta-agregar")) {
            const id = e.target.dataset.id;
            const precio = parseFloat(e.target.dataset.precio);
            const nombre = e.target.dataset.nombre;

            const productoEnCarrito = carrito.find(item => item.id === id);
            if (productoEnCarrito) {
                productoEnCarrito.cantidad++;
            } else {
                carrito.push({ id, nombre, precio, cantidad: 1 });
            }

            total += precio;
            actualizarCarrito();

            Swal.fire({
                icon: "success",
                title: "Producto agregado",
                text: `${nombre} añadido al carrito.`,
                timer: 1500,
                showConfirmButton: false
            });
        }
    });

    // Actualizar carrito
    function actualizarCarrito() {
        carritoItems.innerHTML = "";
        carrito.forEach(item => {
            const div = document.createElement("div");
            div.innerHTML = `
                <p>${item.nombre} x ${item.cantidad} - ${item.precio * item.cantidad}€</p>
                <button data-id="${item.id}" class="sumar">+</button>
                <button data-id="${item.id}" class="restar">-</button>
            `;
            carritoItems.appendChild(div);
        });

        cartCount.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        totalElement.textContent = total.toFixed(2);
    }

    // Manejar sumar/restar en el carrito
    carritoItems.addEventListener("click", e => {
        const id = e.target.dataset.id;
        const producto = carrito.find(item => item.id === id);

        if (e.target.classList.contains("sumar")) {
            producto.cantidad++;
            total += producto.precio;
        } else if (e.target.classList.contains("restar")) {
            if (producto.cantidad > 1) {
                producto.cantidad--;
                total -= producto.precio;
            } else {
                carrito = carrito.filter(item => item.id !== id);
                total -= producto.precio;
            }
        }

        actualizarCarrito();
    });

    // Mostrar/ocultar carrito
    carritoBoton.addEventListener("click", () => {
        carritoPopup.classList.toggle("hidden");
    });

    cerrarCarrito.addEventListener("click", () => {
        carritoPopup.classList.add("hidden");
    });

    finalizarCompra.addEventListener("click", () => {
        Swal.fire("¡Compra finalizada!", `Total a pagar: ${total.toFixed(2)}€`, "success");
        carrito = [];
        total = 0;
        actualizarCarrito();
        carritoPopup.classList.add("hidden");
    });
});
