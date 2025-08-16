// login.js
const formLogin = document.querySelector("form");

formLogin.addEventListener("submit", function(e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();

    const usuarioGuardado = localStorage.getItem("usuario");
    const contrasenaGuardada = localStorage.getItem("contrasena");

    // Si no hay usuario registrado
    if (!usuarioGuardado || !contrasenaGuardada) {
        alert("No estás registrado. Por favor registrate primero.");
        window.location.href = "registro.html"; // redirige al registro
        return;
    }

    // Si los datos coinciden
    if (usuario === usuarioGuardado && contrasena === contrasenaGuardada) {
        localStorage.setItem("usuarioLogueado", usuario);
        window.location.href ="/index.html"; // redirige al index
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});

// Detectar si ya hay sesión activa y actualizar header
window.addEventListener("DOMContentLoaded", () => {
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");
    const loginDiv = document.querySelector("form > div:last-child");

    if (usuarioLogueado) {
        loginDiv.innerHTML = `<p>Hola, ${usuarioLogueado}</p>
                            <button id="logout">Cerrar sesión</button>`;

        document.getElementById("logout").addEventListener("click", () => {
            localStorage.removeItem("usuarioLogueado");
            window.location.reload();
        });
    }
});