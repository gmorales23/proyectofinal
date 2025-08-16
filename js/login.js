const formLogin = document.querySelector("form");

formLogin.addEventListener("submit", function(e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();

    const usuarioGuardado = localStorage.getItem("usuario");
    const contrasenaGuardada = localStorage.getItem("contrasena");

    if (!usuarioGuardado || !contrasenaGuardada) {
        alert("No estás registrado. Por favor regístrate primero.");
        window.location.href = "registro.html";
        return;
    }

    if (usuario === usuarioGuardado && contrasena === contrasenaGuardada) {
        localStorage.setItem("usuarioLogueado", usuario);
        window.location.href = "index.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});

// Detecta si ya hay sesión activa y reemplaza el formulario
window.addEventListener("DOMContentLoaded", () => {
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");

    if (usuarioLogueado) {
        const loginContainer = document.querySelector(".loginContenedor");
        loginContainer.innerHTML = `
            <div class="d-flex flex-column align-items-center gap-3">
                <p class="mb-0 fs-4">Hola, ${usuarioLogueado}</p>
                <div class="d-flex gap-2">
                    <button id="goHome" class="btn btn-dark-custom">Ir a inicio</button>
                    <button id="logout" class="btn btn-outline-dark">Cerrar sesión</button>
                </div>
            </div>
        `;

        document.getElementById("logout").addEventListener("click", () => {
            localStorage.removeItem("usuarioLogueado");
            window.location.reload();
        });

        document.getElementById("goHome").addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }
});
