// ===============================
// VARIABLES GLOBALES
// ===============================
const productID = localStorage.getItem("productID");
const url = `https://japceibal.github.io/emercado-api/products/${productID}.json`;

let comentariosAPI = []; // comentarios obtenidos de la API
let comentariosUsuario = []; // comentarios que guarda el cliente en localStorage

// ===============================
// CARGA INICIAL
// ===============================
window.addEventListener("DOMContentLoaded", () => {
    mostrarUsuarioLogueado("#userNav", false);

    // 1) Cargar comentarios del usuario desde localStorage
    cargarComentariosUsuario();

    // 2) Cargar info del producto
    fetch(url)
        .then((res) => res.json())
        .then((producto) => {
            mostrarProducto(producto);
        })
        .catch((err) => {
            document.querySelector(".container").innerHTML = `
        <div class="alert alert-danger text-center" role="alert">
          Error al cargar el producto: ${err}
        </div>`;
        });

    // 3) Cargar comentarios de la API
    fetch(
        `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`
    )
        .then((res) => res.json())
        .then((comments) => {
            comentariosAPI = comments;
            // mostrar todos (API + usuario)
            mostrarComentarios([...comentariosAPI, ...comentariosUsuario]);
        })
        .catch((err) => {
            console.error("Error al cargar los comentarios:", err);
        });

    // 4) Evento para agregar comentario
    document
        .getElementById("send-rating")
        .addEventListener("click", agregarComentario);

    // 5) Botón de regreso a la categoría
    document
        .getElementById("back-to-category")
        .addEventListener("click", () => {
            const catID = localStorage.getItem("catID");
            if (catID) {
                window.location.href = "products.html";
            } else {
                window.location.href = "categories.html";
            }
        });
});

// ===============================
// MOSTRAR PRODUCTO
// ===============================
function mostrarProducto(producto) {
    document.getElementById("product-name").textContent = producto.name;
    document.getElementById(
        "product-category"
    ).textContent = ` ${producto.category}`;
    document.getElementById(
        "product-sold"
    ).textContent = `Vendidos: ${producto.soldCount}`;
    document.getElementById("product-description").innerHTML = `
    <h5 class="fw-bold mb-2">Descripción del producto:</h5>
    <p>${producto.description}</p>
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
    const carouselElement = document.getElementById("product-images");
    const thumbs = thumbsContainer.querySelectorAll("img");
    if (thumbs.length > 0) thumbs[0].classList.add("active-thumb");

    carouselElement.addEventListener("slide.bs.carousel", function (e) {
        thumbs.forEach((img) => img.classList.remove("active-thumb"));
        thumbs[e.to].classList.add("active-thumb");
    });
}

// ===============================
// MOSTRAR COMENTARIOS
// ===============================
function mostrarComentarios(comments) {
    const contenedor = document.getElementById("comentarios-container");
    contenedor.innerHTML = "";

    comments.forEach((comment) => {
        const comentarioSitio = document.createElement("div");
        comentarioSitio.className = "list-group-item";

        let estrellasHTML = "";
        for (let i = 1; i <= 5; i++) {
            if (i <= comment.score) {
                estrellasHTML += `<span class="fa fa-star checked text-warning"></span>`;
            } else {
                estrellasHTML += `<span class="fa fa-star"></span>`;
            }
        }
        comentarioSitio.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="mb-1">${comment.user}</h5>
        <small class="text-muted">${comment.dateTime}</small>
      </div>
      <p class="mb-1">${comment.description}</p>
      <div>${estrellasHTML}</div>
    `;
        contenedor.appendChild(comentarioSitio);
    });
}

// ===============================
// COMENTARIOS DEL USUARIO EN LOCALSTORAGE
// ===============================
function cargarComentariosUsuario() {
    const guardados = localStorage.getItem(`userComments_${productID}`);
    comentariosUsuario = guardados ? JSON.parse(guardados) : [];
}

function guardarComentariosUsuario() {
    localStorage.setItem(
        `userComments_${productID}`,
        JSON.stringify(comentariosUsuario)
    );
}

// ===============================
// AGREGAR COMENTARIO NUEVO
// ===============================
function agregarComentario(e) {
    e.preventDefault(); // Evitar que el formulario recargue la página

    // Obtener la puntuación seleccionada
    const estrellasSeleccionadas = document.querySelector(
        'input[name="rating"]:checked'
    );
    const score = estrellasSeleccionadas
        ? parseInt(estrellasSeleccionadas.value)
        : 0;

    // Obtener el texto del comentario
    const texto = document.getElementById("comentario").value.trim();
    if (!texto) {
        alert("Por favor, escribe tu comentario.");
        return;
    }
    if (score === 0) {
        alert("Por favor, selecciona una calificación.");
        return;
    }

    // Usuario logueado (ajusta según tu lógica de login)
    const usuario = localStorage.getItem("usuarioLogueado") || "Usuario";

    const nuevoComentario = {
        user: usuario,
        description: texto,
        score: score,
        dateTime: new Date().toLocaleString(),
    };

    // Guardar en el array y en localStorage
    comentariosUsuario.push(nuevoComentario);
    guardarComentariosUsuario();

    // Mostrar todos los comentarios nuevamente
    mostrarComentarios([...comentariosAPI, ...comentariosUsuario]);

    // Resetear el formulario
    document.querySelector("form.rating-form").reset();
}
