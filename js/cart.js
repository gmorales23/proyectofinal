const clave = "cartItems";
let cartItems = [];

window.addEventListener("DOMContentLoaded", function() {
    mostrarUsuarioLogueado("#userNav", false);
    cargarCarrito();
    configurarEventos();
    actualizarBadgeCarrito();
});

function continuarCompra() {
    document.getElementById("btn-continuar").addEventListener("click", function() {
        window.location.href = "buy-now.html";
    });
}

function cargarCarrito() {
    const guardado = localStorage.getItem(clave);
    cartItems = guardado ? JSON.parse(guardado) : [];
    renderizarCarrito();
}

function guardarCarrito() {
    localStorage.setItem(clave, JSON.stringify(cartItems));
    renderizarCarrito();
    actualizarBadgeCarrito();
}

function configurarEventos() {
    document.getElementById("btn-vaciar").addEventListener("click", vaciarCarrito);
    document.getElementById("btn-continuar").addEventListener("click", finalizarCompra);
}

function renderizarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");

    if (cartItems.length === 0) {
        listaCarrito.innerHTML = 
            '<div class="text-center py-5">' +
                '<i class="fas fa-shopping-cart fa-4x text-muted mb-3"></i>' +
                '<h3 class="text-muted mb-2">Tu carrito está vacío</h3>' +
                '<p class="text-muted">Agrega productos desde las categorías para comenzar a comprar</p>' +
                '<a href="categories.html" class="btn btn-primary mt-3">' +
                    '<i class="fas fa-th-large me-2"></i>Ver categorías' +
                '</a>' +
            '</div>';
        actualizarTotal();
        return;
    }

    listaCarrito.innerHTML = "";
    for (let i = 0; i < cartItems.length; i++) {
        const itemDiv = crearItemCarrito(cartItems[i], i);
        listaCarrito.appendChild(itemDiv);
    }

    actualizarTotal();
    actualizarBadgeCarrito();
}

function crearItemCarrito(item, index) {
    const div = document.createElement("div");
    div.className = "cart-item";

    const subtotal = item.unitCost * item.count;
    const precioFormateado = item.currency + " " + item.unitCost.toLocaleString();
    const subtotalFormateado = item.currency + " " + subtotal.toLocaleString();

    div.innerHTML = 
        '<img src="' + item.image + '" alt="' + item.name + '">' +
        '<div class="cart-info">' +
            '<h3>' + item.name + '</h3>' +
            '<p class="text-muted mb-0">' +
                'Precio unitario: <strong>' + precioFormateado + '</strong>' +
            '</p>' +
            '<p class="text-muted mb-0">' +
                'Subtotal: <strong>' + subtotalFormateado + '</strong>' +
            '</p>' +
        '</div>' +
        '<div class="cart-controls">' +
            '<button class="btn-restar" aria-label="Decrementar cantidad">' +
                '<i class="fas fa-minus"></i>' +
            '</button>' +
            '<input ' +
                'type="number" ' +
                'class="cantidad-input" ' +
                'value="' + item.count + '" ' +
                'min="1"' +
            '>' +
            '<button class="btn-sumar" aria-label="Incrementar cantidad">' +
                '<i class="fas fa-plus"></i>' +
            '</button>' +
            '<button class="btn-eliminar" aria-label="Eliminar producto">' +
                '<i class="fas fa-trash"></i>' +
            '</button>' +
        '</div>';

    const btnRestar = div.querySelector(".btn-restar");
    const btnSumar = div.querySelector(".btn-sumar");
    const btnEliminar = div.querySelector(".btn-eliminar");
    const inputCantidad = div.querySelector(".cantidad-input");

    btnRestar.addEventListener("click", function() {
        decrementarCantidad(index);
    });

    btnSumar.addEventListener("click", function() {
        incrementarCantidad(index);
    });

    btnEliminar.addEventListener("click", function() {
        eliminarItem(index);
    });

    inputCantidad.addEventListener("change", function() {
        actualizarCantidad(index, this.value);
    });

    return div;
}

function actualizarTotal() {
    const totalElement = document.getElementById("total");

    if (cartItems.length === 0) {
        totalElement.textContent = "Total: $0.00";
        return;
    }

    const totalesPorMoneda = {};
    
    for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        const subtotal = item.unitCost * item.count;
        const moneda = item.currency;
        
        if (!totalesPorMoneda[moneda]) {
            totalesPorMoneda[moneda] = 0;
        }
        totalesPorMoneda[moneda] += subtotal;
    }

    const textos = [];
    for (let moneda in totalesPorMoneda) {
        textos.push(moneda + " " + totalesPorMoneda[moneda]);
    }
    
    totalElement.textContent = "Total: " + textos.join(" + ");
}

function incrementarCantidad(index) {
    cartItems[index].count = cartItems[index].count + 1;
    guardarCarrito();
}

function decrementarCantidad(index) {
    const cantidadActual = cartItems[index].count;
    if (cantidadActual > 1) {
        cartItems[index].count = cantidadActual - 1;
        guardarCarrito();
    }
}

function actualizarCantidad(index, nuevaCantidad) {
    cartItems[index].count = parseInt(nuevaCantidad);
    guardarCarrito();
}

function eliminarItem(index) {
    if (confirm("¿Estás seguro de eliminar este producto del carrito?")) {
        cartItems.splice(index, 1);
        guardarCarrito();
    }
}

function vaciarCarrito() {
    if (confirm("¿Estás seguro de vaciar todo el carrito?")) {
        cartItems = [];
        guardarCarrito();
    }
}

// Actualiza el circulito con cantidad en el ícono del carrito
function actualizarBadgeCarrito() {
    const badge = document.getElementById("cart-count");
    if (!badge) return;
    const guardado = localStorage.getItem(clave);
    const items = guardado ? JSON.parse(guardado) : [];
    var total = 0;
    for (var i = 0; i < items.length; i++) {
        total += parseInt(items[i].count) || 0;
    }
    badge.textContent = total;
    badge.style.display = total > 0 ? "inline-block" : "none";
}
