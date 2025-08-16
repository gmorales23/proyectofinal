document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

// Detectar sesión al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");
    const userNav = document.getElementById("userNav");

    if (usuarioLogueado) {
        // Cambiar el link de login por nombre y botón de logout
        userNav.innerHTML = `
    <div class="d-flex align-items-center">
        <span class="nav-link mb-0">Hola, ${usuarioLogueado}</span>
        <button id="logoutBtn" class="btn btn-sm btn-outline-light ms-2">Cerrar sesión</button>
    </div>
`;

        document.getElementById("logoutBtn").addEventListener("click", () => {
            localStorage.removeItem("usuarioLogueado");
            window.location.reload();
        });
    }
});