function mostrarUsuarioLogueado(containerSelector, mostrarGoHome = false) {
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");
    if (!usuarioLogueado) return;

    const container = document.querySelector(containerSelector);
    if (!container) return;

    // Flex para centrar vertical y horizontalmente en navbar
    let html = `
        <div class="d-flex align-items-center h-100">
            <span class="me-3 nav-link">Hola, ${usuarioLogueado}</span>
            ${mostrarGoHome ? `<button id="goHome" class="btn btn-sm btn-light me-2">Ir a inicio</button>` : ""}
            <button id="logout" class="btn btn-sm btn-outline-light">Cerrar sesión</button>
        </div>
    `;

    container.innerHTML = html;

    // Eventos
    if (mostrarGoHome) {
        document.getElementById("goHome").addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("usuarioLogueado");
        window.location.reload();
    });
}
