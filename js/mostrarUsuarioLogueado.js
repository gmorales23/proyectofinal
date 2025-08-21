function mostrarUsuarioLogueado(containerSelector, mostrarGoHome = false) {
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");
    if (!usuarioLogueado) return;

    const container = document.querySelector(containerSelector);
    if (!container) return;

    // Estructura base
    let html = `
        <div class="d-flex align-items-center h-100">
            <span class="me-3 ${mostrarGoHome ? "text-dark" : "nav-link"}">Hola, ${usuarioLogueado}</span>
    `;

    // Botón Ir a inicio (si corresponde)
    if (mostrarGoHome) {
        html += `<button id="goHome" class="btn me-2 no-focus" style="background-color:#212529; color:white;">Ir a inicio</button>`;
    }

    // Botón Cerrar sesión
    if (mostrarGoHome) {
        html += `<button id="logout" class="btn btn-outline-dark no-focus">Cerrar sesión</button>`;
    } else {
        html += `<button id="logout" class="btn btn-sm btn-outline-light no-focus">Cerrar sesión</button>`;
    }

    html += `</div>`;
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
