// ===============================
// GLOBAL VARIABLES
// ===============================
const productID = localStorage.getItem("productID");
const url = `https://japceibal.github.io/emercado-api/products/${productID}.json`;

let comentariosAPI = [];
let comentariosUsuario = [];

// ===============================
// INITIALIZATION
// ===============================
window.addEventListener("DOMContentLoaded", () => {
    mostrarUsuarioLogueado("#userNav", false);
    cargarComentariosUsuario();
    cargarProducto();
    cargarComentariosAPI();
    configurarEventos();
});

// ===============================
// DATA LOADING FUNCTIONS
// ===============================
function cargarProducto() {
    fetch(url)
        .then(res => res.json())
        .then(producto => {
            mostrarProducto(producto);
            mostrarRelacionados(producto.relatedProducts);
        })
        .catch(err => {
            document.querySelector(".container").innerHTML = `
                <div class="alert alert-danger text-center" role="alert">
                    Error al cargar el producto: ${err}
                </div>`;
        });
}

function cargarComentariosAPI() {
    fetch(`https://japceibal.github.io/emercado-api/products_comments/${productID}.json`)
        .then(res => res.json())
        .then(comments => {
            comentariosAPI = comments;
            mostrarComentarios([...comentariosAPI, ...comentariosUsuario]);
        })
        .catch(err => console.error("Error al cargar los comentarios:", err));
}

function cargarComentariosUsuario() {
    const guardados = localStorage.getItem(`userComments_${productID}`);
    comentariosUsuario = guardados ? JSON.parse(guardados) : [];
}

function guardarComentariosUsuario() {
    localStorage.setItem(`userComments_${productID}`, JSON.stringify(comentariosUsuario));
}

// ===============================
// EVENT CONFIGURATION
// ===============================
function configurarEventos() {
    const btnSend = document.getElementById("send-rating");
    if (btnSend) {
        btnSend.addEventListener("click", agregarComentario);
    }

    const btnBack = document.getElementById("back-to-category");
    if (btnBack) {
        btnBack.addEventListener("click", () => {
            const catID = localStorage.getItem("catID");
            window.location.href = catID ? "products.html" : "categories.html";
        });
    }
}

// ===============================
// DISPLAY FUNCTIONS
// ===============================
function mostrarProducto(producto) {
    // Basic info
    document.getElementById("product-name").textContent = producto.name;
    document.getElementById("product-category").textContent = ` ${producto.category}`;
    document.getElementById("product-sold").textContent = `Vendidos: ${producto.soldCount}`;
    document.getElementById("product-description").innerHTML = `
        <h5 class="fw-bold mb-2">Descripción del producto:</h5>
        <p>${producto.description}</p>
    `;

    // Carousel setup
    configurarCarrusel(producto);
}

function configurarCarrusel(producto) {
    const carouselInner = document.getElementById("carousel-inner");
    const thumbsContainer = document.getElementById("carousel-thumbs");
    
    if (!carouselInner || !thumbsContainer) return;
    
    carouselInner.innerHTML = "";
    thumbsContainer.innerHTML = "";

    // Create carousel items
    producto.images.forEach((imgUrl, index) => {
        // Main carousel image
        const item = document.createElement("div");
        item.className = "carousel-item" + (index === 0 ? " active" : "");
        item.innerHTML = `<img src="${imgUrl}" class="d-block w-100" alt="${producto.name}">`;
        carouselInner.appendChild(item);

        // Thumbnail
        const thumbCol = document.createElement("div");
        thumbCol.className = "col-auto mb-2";
        thumbCol.innerHTML = `
            <img src="${imgUrl}" class="img-fluid img-thumbnail"
                 style="cursor:pointer; max-width:80px;"
                 data-bs-target="#product-images" 
                 data-bs-slide-to="${index}"
                 alt="Miniatura ${index + 1}">
        `;
        thumbsContainer.appendChild(thumbCol);
    });

    // Thumbnail highlighting
    configurarMiniaturas(thumbsContainer);
}

function configurarMiniaturas(thumbsContainer) {
    const carouselElement = document.getElementById("product-images");
    const thumbs = thumbsContainer.querySelectorAll("img");
    
    if (thumbs.length > 0) {
        thumbs[0].classList.add("active-thumb");
    }

    if (carouselElement) {
        carouselElement.addEventListener("slide.bs.carousel", e => {
            thumbs.forEach(img => img.classList.remove("active-thumb"));
            if (thumbs[e.to]) {
                thumbs[e.to].classList.add("active-thumb");
            }
        });
    }
}

function mostrarComentarios(comments) {
    const contenedor = document.getElementById("comentarios-container");
    if (!contenedor) return;
    
    contenedor.innerHTML = "";

    comments.forEach(comment => {
        const comentarioDiv = document.createElement("div");
        comentarioDiv.className = "list-group-item";
        comentarioDiv.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <h5 class="mb-1">${comment.user}</h5>
                <small class="text-muted">${comment.dateTime}</small>
            </div>
            <p class="mb-1">${comment.description}</p>
            <div>${generarEstrellas(comment.score)}</div>
        `;
        contenedor.appendChild(comentarioDiv);
    });
}

function generarEstrellas(score) {
    let html = "";
    for (let i = 1; i <= 5; i++) {
        const clase = i <= score ? "checked text-warning" : "";
        html += `<span class="fa fa-star ${clase}"></span>`;
    }
    return html;
}

function mostrarRelacionados(relacionados) {
    const container = document.getElementById("related-products");
    if (!container) return;
    
    container.innerHTML = "";

    relacionados.forEach(prod => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjetarelacionada";
        tarjeta.innerHTML = `
            <img src="${prod.image}" alt="${prod.name}">
            <h5>${prod.name}</h5>
        `;
        tarjeta.addEventListener("click", () => {
            localStorage.setItem("productID", prod.id);
            window.location = "product-info.html";
        });
        container.appendChild(tarjeta);
    });
}

// ===============================
// COMMENT SUBMISSION
// ===============================
function agregarComentario(e) {
    e.preventDefault();

    const estrellasSeleccionadas = document.querySelector('input[name="rating"]:checked');
    const score = estrellasSeleccionadas ? parseInt(estrellasSeleccionadas.value) : 0;
    const texto = document.getElementById("comentario").value.trim();

    // Validation
    if (!texto) {
        alert("Por favor, escribe tu comentario.");
        return;
    }
    if (score === 0) {
        alert("Por favor, selecciona una calificación.");
        return;
    }

    const usuario = localStorage.getItem("usuarioLogueado") || "Usuario";

    const nuevoComentario = {
        user: usuario,
        description: texto,
        score: score,
        dateTime: new Date().toLocaleString(),
    };

    comentariosUsuario.push(nuevoComentario);
    guardarComentariosUsuario();
    mostrarComentarios([...comentariosAPI, ...comentariosUsuario]);
    
    // Reset form
    const form = document.querySelector("form.rating-form");
    if (form) form.reset();
}