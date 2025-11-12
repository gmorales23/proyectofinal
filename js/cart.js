const clave = "cartItems";
let cartItems = [];

// Cambié function por arrow
window.addEventListener("DOMContentLoaded", () => {
    mostrarUsuarioLogueado("#userNav", false);
    cargarCarrito();
    configurarEventos();
    actualizarBadgeCarrito();
});

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

//Borré la función continuarCompra() para añadir el evento acá. 
// Además, agregué validaciones if para verificar que los elementos existan antes de agregar listeners y vefirifaciones de que el carrito no esté vacío
function configurarEventos() {
    const btnVaciar = document.getElementById("btn-vaciar");
    const btnContinuar = document.getElementById("btn-continuar");

    if (btnVaciar) {
        btnVaciar.addEventListener("click", vaciarCarrito);
    }

if (btnContinuar) {
  btnContinuar.addEventListener("click", function() {
    const carritoGuardado = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (carritoGuardado.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    window.location.href = "buy-now.html";
  });
}

}

//Cambié la concatenación de strings por template literals y el for por forEach
function renderizarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalElement = document.getElementById("total");

    if (!listaCarrito || !totalElement) return;

    if (cartItems.length === 0) {
        listaCarrito.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-4x text-muted mb-3"></i>
                <h3 class="text-muted mb-2">Tu carrito está vacío</h3>
                <p class="text-muted">Agrega productos desde las categorías para comenzar a comprar</p>
                <a href="categories.html" class="btn btn-primary mt-3">
                    <i class="fas fa-th-large me-2"></i>Ver categorías
                </a>
            </div>
        `;
        totalElement.textContent = "Total: $0.00";
        return;
    }

    listaCarrito.innerHTML = "";

    cartItems.forEach((item, index) => {
        const itemDiv = crearItemCarrito(item, index);
        listaCarrito.appendChild(itemDiv);
    });

    actualizarTotal();
}

//También cambié la concatenación por backstick y metí bootstrap, además de meter arrow en los listeners
function crearItemCarrito(item, index) {
    const div = document.createElement("div");
    div.className = "cart-item d-flex align-items-center p-3 border-bottom";

    const subtotal = item.unitCost * item.count;
    const precioFormateado = `${item.currency} ${item.unitCost.toLocaleString()}`;
    const subtotalFormateado = `${item.currency} ${subtotal.toLocaleString()}`;

    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="me-3" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
        <div class="flex-grow-1">
            <h3 class="h5 mb-1">${item.name}</h3>
            <p class="text-muted mb-0">Precio: <strong>${precioFormateado}</strong></p>
            <p class="text-muted mb-0">Subtotal: <strong>${subtotalFormateado}</strong></p>
        </div>
        <div class="d-flex align-items-center gap-2">
            <button class="btn btn-sm btn-outline-secondary btn-restar" aria-label="Restar">
                <i class="fas fa-minus"></i>
            </button>
            <input type="number" class="form-control form-control-sm text-center cantidad-input" value="${item.count}" min="1" style="width: 60px;">
            <button class="btn btn-sm btn-outline-secondary btn-sumar" aria-label="Sumar">
                <i class="fas fa-plus"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger btn-eliminar" aria-label="Eliminar">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    const btnRestar = div.querySelector(".btn-restar");
    const btnSumar = div.querySelector(".btn-sumar");
    const btnEliminar = div.querySelector(".btn-eliminar");
    const inputCantidad = div.querySelector(".cantidad-input");

    btnRestar.addEventListener("click", () => decrementarCantidad(index));
    btnSumar.addEventListener("click", () => incrementarCantidad(index));
    btnEliminar.addEventListener("click", () => eliminarItem(index));
    inputCantidad.addEventListener("change", () => actualizarCantidad(index, inputCantidad.value));

    return div;
}

function actualizarTotal() {
    const totalElement = document.getElementById("total");
    if (!totalElement) return;

    if (cartItems.length === 0) {
        totalElement.textContent = "Total: $0.00";
        return;
    }

    const totalesPorMoneda = {};

    cartItems.forEach(item => {
        const subtotal = item.unitCost * item.count;
        const moneda = item.currency;
        totalesPorMoneda[moneda] = (totalesPorMoneda[moneda] || 0) + subtotal;
    });

    const textos = Object.keys(totalesPorMoneda).map(moneda => 
        `${moneda} ${totalesPorMoneda[moneda].toLocaleString()}`
    );

    totalElement.textContent = "Total: " + textos.join(" + ");
}

// Simplifiqué el código con el operador de incremento
function incrementarCantidad(index) {
    cartItems[index].count++;
    guardarCarrito();
}

// Simplifiqué el código con el operador de decremento

function decrementarCantidad(index) {
    if (cartItems[index].count > 1) {
        cartItems[index].count--;
        guardarCarrito();
    }
}

// Mofiqué para que, si el usuario ingresa un valor inválido (NaN) o menor a 1, se establece automáticamente en 1. 
// Previene errores y comportamientos inesperados.

function actualizarCantidad(index, nuevaCantidad) {
    const cant = parseInt(nuevaCantidad);
    cartItems[index].count = isNaN(cant) || cant < 1 ? 1 : cant;
    guardarCarrito();
}

function eliminarItem(index) {
    if (confirm("¿Quieres eliminar este producto del carrito?")) {
        cartItems.splice(index, 1);
        guardarCarrito();
    }
}

function vaciarCarrito() {
    if (confirm("¿Quieres vaciar todo el carrito?")) {
        cartItems = [];
        guardarCarrito();
    }
}

//Eliminé la variable guardado redundante, usé directamente en el parsing: JSON.parse(localStorage.getItem(clave)) || [] 
// y cambié el bucle for con var por reduce() con arrow function. Código más conciso, moderno y eficiente usando programación funcional.

function actualizarBadgeCarrito() {
    const badge = document.getElementById("cart-count");
    if (!badge) return;

    const items = JSON.parse(localStorage.getItem(clave)) || [];
    const total = items.reduce((sum, item) => sum + (parseInt(item.count) || 0), 0);

    badge.textContent = total;
    badge.style.display = total > 0 ? "inline-block" : "none";
}