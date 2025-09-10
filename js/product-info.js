const productID = localStorage.getItem("productID");
const url = `https://japceibal.github.io/emercado-api/products/${productID}.json`;

window.addEventListener("DOMContentLoaded", () => {
    mostrarUsuarioLogueado("#userNav", false);

    fetch(url)
        .then(res => res.json())
        .then(producto => {
            document.getElementById("product-name").textContent = producto.name;
            document.getElementById("product-category").textContent = `Categoría: ${producto.category}`;
            document.getElementById("product-sold").textContent = `Vendidos: ${producto.soldCount}`;
            document.getElementById("product-description").textContent = producto.description;

            const carouselInner = document.getElementById("carousel-inner");

            producto.images.forEach((imgUrl, index) => {
                const item = document.createElement("div");
                item.className = "carousel-item" + (index === 0 ? " active" : "");
                item.innerHTML = `<img src="${imgUrl}" class="d-block w-100" alt="${producto.name}">`;
                carouselInner.appendChild(item);
            });
        })
        .catch(err => {
            document.querySelector(".container").innerHTML = `
                <div class="alert alert-danger text-center" role="alert">
                    Error al cargar el producto: ${err}
                </div>
            `;
        });
});
