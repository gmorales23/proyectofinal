function mostrarUsuarioLogueado(containerSelector, mostrarGoHome = false) {
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");
    if (!usuarioLogueado) return;

    const container = document.querySelector(containerSelector);
    if (!container) return;

    // Contenido base
    let html = `
        <div class="d-flex align-items-center flex-column gap-3">
            <p class="mb-0 fs-4">Hola, ${usuarioLogueado}</p>
            <div class="d-flex gap-2">
    `;

    // Opcional: botón de ir a inicio
    if (mostrarGoHome) {
        html += `<button id="goHome" class="btn" style="background-color:#212529; color:white;">Ir a inicio</button>`;
    }

    // Botón cerrar sesión
    html += `<button id="logout" class="btn btn-outline-dark">Cerrar sesión</button>
            </div>
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
