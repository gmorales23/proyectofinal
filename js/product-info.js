
const productID = localStorage.getItem("productID");
const url = `https://japceibal.github.io/emercado-api/products/${productID}.json`;

window.addEventListener("DOMContentLoaded", () => {
	mostrarUsuarioLogueado("#userNav", false);

	fetch(url)
		.then(res => res.json())
		.then(producto => {
			document.getElementById("product-name").textContent = producto.name;
			document.getElementById("product-category").textContent = ` ${producto.category}`;
			document.getElementById("product-sold").textContent = `Vendidos: ${producto.soldCount}`;
			document.getElementById("product-description").innerHTML = `  <h5 class="fw-bold mb-2">Descripción</h5>  <p>${producto.description}</p>
`;
			const carouselInner = document.getElementById("carousel-inner");
			const thumbsContainer = document.getElementById("carousel-thumbs");

			producto.images.forEach((imgUrl, index) => {
				// Imagen grande
				const item = document.createElement("div");
				item.className = "carousel-item" + (index === 0 ? " active" : "");
				item.innerHTML = `<img src="${imgUrl}" class="d-block w-100" alt="${producto.name}">`;
				carouselInner.appendChild(item);
				// Miniaturas
				const thumbCol = document.createElement("div");
				thumbCol.className = "col-auto mb-2";
				thumbCol.innerHTML = `
        <img src="${imgUrl}" class="img-fluid img-thumbnail" style="cursor:pointer; max-width:80px;" data-bs-target="#product-images" data-bs-slide-to="${index}">
        `;
				thumbsContainer.appendChild(thumbCol);
			});

			// Resaltar miniatura activa
			const carouselElement = document.getElementById('product-images');
			const thumbs = thumbsContainer.querySelectorAll('img');
			thumbs[0].classList.add('active-thumb');

			carouselElement.addEventListener('slide.bs.carousel', function (e) {
				thumbs.forEach(img => img.classList.remove('active-thumb'));
				thumbs[e.to].classList.add('active-thumb');
			});
			// Mostrar productos relacionados
			mostrarRelacionados(producto.relatedProducts);
		})
		.catch(err => {
			document.querySelector(".container").innerHTML = `
        <div class="alert alert-danger text-center" role="alert">
        Error al cargar el producto: ${err}
        </div>
    `;
		});
});

// Botón de regreso a la categoría
document.getElementById("back-to-category").addEventListener("click", () => {
	const catID = localStorage.getItem("catID");
	if (catID) {
		window.location.href = "products.html";
	} else {
		window.location.href = "categories.html";
	}
});

// Renderizar las tarjetas de productos relacionados
function mostrarRelacionados(relacionados) {
    const container = document.getElementById("related-products");
    container.innerHTML = "";

    relacionados.forEach(producto => {
        let tarjetarelacionada = document.createElement("div");
        tarjetarelacionada.className = "tarjetarelacionada";
        tarjetarelacionada.innerHTML = `
            <img src="${producto.image}" alt="${producto.name}">
            <h5>${producto.name}</h5>
        `;

        tarjetarelacionada.addEventListener("click", () => {
            localStorage.setItem("productID", producto.id);
            window.location = "product-info.html";
        });

        container.appendChild(tarjetarelacionada);
    });
}

