const catID = localStorage.getItem("catID");
const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

const contenedor = document.getElementById("catalogo");
const tituloCategoria = document.getElementById("titulo-categoria");

const btnOrdenAsc = document.getElementById("sortAsc");
const btnOrdenDesc = document.getElementById("sortDesc");
const btnOrdenRel = document.getElementById("sortByCount");

const inputMin = document.getElementById("precioMin");
const inputMax = document.getElementById("precioMax");

let productos = [];

function crearTarjetaProducto(producto) {
    return `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="producto card h-100 custom-shadow" data-id="${producto.id}">
            <img src="${producto.image}" class="card-img-top" alt="${producto.name}">
            <div class="card-body">
                <h5 class="card-title fw-bold">${producto.name}</h5>
                <p class="card-text">${producto.description}</p>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center bg-dark text-white">
                <span class="fw-bold fs-4">${producto.cost}<small> ${producto.currency}</small></span>
                <small style="opacity: 0.54;">Cant. Vendidos: ${producto.soldCount}</small>
            </div>
            </div>
        </div>
    `;
}

function agregarEventosClick() {
    document.querySelectorAll(".producto").forEach((product) => {
        product.addEventListener("click", () => {
            const idProducto = product.dataset.id;
            localStorage.setItem("productID", idProducto);
            window.location.href = "product-info.html";
        });
    });
}

function renderizarProductos(lista) {
    contenedor.innerHTML = lista.map(crearTarjetaProducto).join("");
    agregarEventosClick();
}

function ordenarPorPrecioAsc() {
    renderizarProductos([...productos].sort((a, b) => a.cost - b.cost));
}

function ordenarPorPrecioDesc() {
    renderizarProductos([...productos].sort((a, b) => b.cost - a.cost));
}

function ordenarPorRelevancia() {
    renderizarProductos(
        [...productos].sort((a, b) => b.soldCount - a.soldCount)
    );
}

function cargarCategoria() {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            tituloCategoria.textContent = data.catName;
            document.title = `eMercado - ${data.catName}`;

            productos = data.products;
            renderizarProductos(productos);
        })
        .catch((error) => {
            contenedor.innerHTML = `
                <div class="alert alert-danger text-center" role="alert">
                    Error al cargar los productos: ${error}
                </div>
            `;
        });
}

[inputMin, inputMax].forEach((input) => {
    input.addEventListener("input", () => {
        // Reemplaza todo lo que no sea dígito o punto
        if (inputMin.value === "") return;
        if (parseFloat(input.value) < 0) {
            inputMin.value = 0;
        }
        input.value = input.value.replace(/[^\d.]/g, "");

        // Evita números negativos
        if (parseFloat(input.value) < 0) input.value = "";
    });
});

window.addEventListener("DOMContentLoaded", () => {
    mostrarUsuarioLogueado("#userNav", false);
    cargarCategoria();

    btnOrdenAsc.addEventListener("click", ordenarPorPrecioAsc);
    btnOrdenDesc.addEventListener("click", ordenarPorPrecioDesc);
    btnOrdenRel.addEventListener("click", ordenarPorRelevancia);
});

// Buscador en tiempo real
searchInput.addEventListener("input", function() {
    const texto = this.value.toLowerCase();

    productosFiltrados = productos.filter(p =>
        p.name.toLowerCase().includes(texto) ||
        p.description.toLowerCase().includes(texto)
    );

    renderizarProductos(productosFiltrados);
});


// Inicialización al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    mostrarUsuarioLogueado("#userNav", false);
    cargarCategoria();

    btnOrdenAsc.addEventListener("click", ordenarPorPrecioAsc);
    btnOrdenDesc.addEventListener("click", ordenarPorPrecioDesc);
    btnOrdenRel.addEventListener("click", ordenarPorRelevancia);
});