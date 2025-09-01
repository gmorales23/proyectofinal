const catID = localStorage.getItem("catID");
let url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

const contenedor = document.getElementById("catalogo");
const tituloCategoria = document.getElementById("titulo-categoria");

{
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const nombreCategoria = data.catName;
            tituloCategoria.textContent = nombreCategoria;
            document.title = `eMercado - ${nombreCategoria}`;

            const productos = data.products;

            let htmlContent = "";

            productos.forEach((producto) => {
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
