const contenedor = document.getElementById("catalogo-autos");

// Petición al JSON
fetch("https://japceibal.github.io/emercado-api/cats_products/101.json")
    .then((response) => response.json())
    .then((data) => {
        const productos = data.products;

        productos.forEach((producto) => {
            // Crear el contenedor de cada producto
            const divProducto = document.createElement("div");
            divProducto.className = "col-12 col-xl-4 mb-4";

            // Crear el contenido interno de la tarjeta
            divProducto.innerHTML = `
        <div class="card h-100">
          <img src="${producto.image}" class="card-img-top" alt="${producto.name}">
          <div class="card-body">
            <div class="info-producto">
              <h5 class="card-title">${producto.name}</h5>
              <p class="card-text">${producto.description}</p>
            </div>
            <div class="bg-dark">
              <div class="precio-producto">
                <span class="monto">${producto.cost}</span><span class="moneda">${producto.currency}</span>
              </div>
              <small class="vendidos">Cant. Vendidos: ${producto.soldCount}</small>
            </div>
          </div>
        </div>
      `;

            // Insertar la tarjeta en el contenedor principal
            contenedor.appendChild(divProducto);
        });
    })
    .catch((error) => console.error("Error al cargar productos:", error));
