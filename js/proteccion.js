// session.js
const usuarioLogueado = localStorage.getItem("usuarioLogueado");

if (!usuarioLogueado) {
    // Redirige al login si no hay sesión activa
    window.location.href = "login.html";
} else {
    // Opcional: actualizar header si existe userNav
    const userNav = document.getElementById("userNav");
    if (userNav) {
        userNav.innerHTML = `
    <div class="d-flex align-items-center">
        <span class="nav-link mb-0">Hola, ${usuarioLogueado}</span>
        <button id="logoutBtn" class="btn btn-sm btn-outline-light ms-2">Cerrar sesión</button>
    </div>
`;

        document.getElementById("logoutBtn").addEventListener("click", () => {
            localStorage.removeItem("usuarioLogueado");
            window.location.href = "login.html";
        });
    }
}