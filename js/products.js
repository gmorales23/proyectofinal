const contenedor = document.getElementById("catalogo-autos");

fetch("https://japceibal.github.io/emercado-api/cats_products/101.json")
    .then((response) => response.json())
    .then((data) => {
        const productos = data.products;

        let htmlContent = "";

        productos.forEach((producto) => {
            htmlContent += `
            <div class="col-12 col-md-6 col-xl-4">
                <div class="card h-100 shadow-sm">
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
