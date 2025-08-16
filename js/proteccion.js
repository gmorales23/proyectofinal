const usuarioLogueado = localStorage.getItem("usuarioLogueado");
const nombreUsuario = localStorage.getItem("usuario");

if (!usuarioLogueado || !nombreUsuario) {
    window.location.href = "login.html";
} else {
    const userNav = document.getElementById("userNav");
    if (userNav) {
        userNav.innerHTML = `
            <div class="d-flex align-items-center">
                <span class="nav-link mb-0">Hola, ${nombreUsuario}</span>
                <button id="logoutBtn" class="btn btn-sm btn-outline-light ms-2">Cerrar sesión</button>
            </div>
        `;

        document.getElementById("logoutBtn").addEventListener("click", () => {
            localStorage.removeItem("usuarioLogueado");
            localStorage.removeItem("usuario");
            window.location.href = "login.html";
        });
    }
}
