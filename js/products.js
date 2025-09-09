const catID = localStorage.getItem("catID");
let url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

const contenedor = document.getElementById("catalogo");
const tituloCategoria = document.getElementById("titulo-categoria");
const mensajeAlerta = document.getElementById("mensaje-alerta");

const ordenarAsc = document.getElementById("sortAsc");
const ordenarDes = document.getElementById("sortDesc");
const ordenarRel = document.getElementById("sortByCount");

const filtrarBtn = document.getElementById("filtrarPrecio");     
const limpiarBtn = document.getElementById("clearRangeFilter");    
const inputMin = document.getElementById("precioMin");    
const inputMax = document.getElementById("precioMax");

let productosOriginales = {} ;
let minPrice = undefined;
let maxPrice = undefined

//Mostrar productos

function mostrarProductos(productos) {
    const productosFiltrados = productos.filter(producto => {
        return (minPrice === undefined || producto.cost >= minPrice) &&
               (maxPrice === undefined || producto.cost <= maxPrice);
    });

    if (productosFiltrados.length === 0) {
        mensajeAlerta.textContent = "Lo sentimos, no hay productos disponibles que correspondan al rango de precios seleccionado.";
        mensajeAlerta.classList.remove("d-none"); // mostrar el mensaje
        contenedor.innerHTML = ""; // vaciar el contenedor de tarjetas
        return; // salir de la función
    } else {
        mensajeAlerta.classList.add("d-none"); // ocultar mensaje si hay productos
    }
    let htmlContent = "";
    productosFiltrados.forEach((producto) => {
        htmlContent += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 custom-shadow">
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
            </div>`;
    });

    contenedor.innerHTML = htmlContent;
}

//Fetch 
{
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const nombreCategoria = data.catName;
            tituloCategoria.textContent = nombreCategoria;
            document.title = `eMercado - ${nombreCategoria}`;

            const productos = data.products;

            mostrarProductos(productos);

            productosOriginales = productos;
        })
        .catch((error) => {
            contenedor.innerHTML = `
        <div class="alert alert-danger text-center" role="alert">
            Error al cargar los productos: ${error}
        </div>`;
        });
}

window.addEventListener("DOMContentLoaded", () => {
    mostrarUsuarioLogueado("#userNav", false);
});

//Botons para ordenar por precio o relevancia
ordenarAsc.addEventListener("click", () => {
    const productosOrdenados = [...productosOriginales].sort((a, b) => a.cost - b.cost);
    mostrarProductos(productosOrdenados);
});

ordenarDes.addEventListener("click", () => {
    const productosOrdenados = [...productosOriginales].sort((a, b) => b.cost - a.cost);
    mostrarProductos(productosOrdenados);
});

ordenarRel.addEventListener("click", () => {
    const productosOrdenados = [...productosOriginales].sort((a, b) => b.soldCount - a.soldCount);
    mostrarProductos(productosOrdenados);
});

// Botón de filtrar

filtrarBtn.addEventListener("click", () => {
    if (inputMin.value !== "") {
        minPrice = parseInt(inputMin.value);
    } else {
        minPrice = undefined;
    }
    if (inputMax.value !== "") {
        maxPrice = parseInt(inputMax.value);
    } else {
        maxPrice = undefined;
    }
    mostrarProductos(productosOriginales);
});

// Botón de limpiar
limpiarBtn.addEventListener("click", () => {
    inputMin.value = "";
    inputMax.value = "";
    minPrice = undefined;
    maxPrice = undefined;
    mostrarProductos(productosOriginales);
});



