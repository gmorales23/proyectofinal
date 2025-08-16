// Seleccionamos el formulario
const formLogin = document.querySelector("form");

formLogin.addEventListener("submit", function(e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();

    const usuarioGuardado = localStorage.getItem("usuario");
    const contrasenaGuardada = localStorage.getItem("contrasena");

    // Si no hay usuario registrado
    if (!usuarioGuardado || !contrasenaGuardada) {
        alert("No estás registrado. Por favor regístrate primero.");
        window.location.href = "registro.html"; // redirige al registro
        return;
    }

    // Si los datos coinciden
    if (usuario === usuarioGuardado && contrasena === contrasenaGuardada) {
        localStorage.setItem("usuarioLogueado", usuario);
        window.location.href = "index.html"; // redirige al index
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});

// Detectar si ya hay sesión activa y reemplazar el formulario
window.addEventListener("DOMContentLoaded", () => {
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");

    if (usuarioLogueado) {
        // Reemplaza todo el formulario por un contenedor con los botones
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

        // Botón para cerrar sesión
        document.getElementById("logout").addEventListener("click", () => {
            localStorage.removeItem("usuarioLogueado");
            window.location.reload();
        });

        // Botón para ir a la página principal
        document.getElementById("goHome").addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }
});
