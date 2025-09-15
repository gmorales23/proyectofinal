const formLogin = document.querySelector("form");

formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    // Obtener lista de usuarios del localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscar si existe el usuario con esa contraseña
    const usuarioValido = usuarios.find(
        (user) => user.usuario === usuario && user.contrasena === contrasena
    );

    if (usuarioValido) {
        localStorage.setItem("usuarioLogueado", usuario);
        window.location.href = "index.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});

// Detecta si ya hay sesión activa y reemplaza el formulario
window.addEventListener("DOMContentLoaded", () => {
    mostrarUsuarioLogueado(".loginContenedor", true);
});

//Ver contraseña (o no ahre)
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('contrasena');

// rutas a tus imágenes
const ojoAbierto = "./img/ojo abierto.png";
const ojoCerrado = "./img/ojo cerrado.png";

togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";            // muestra la contraseña
        togglePassword.src = ojoCerrado;        // cambia a ojo cerrado
    } else {
        passwordInput.type = "password";        // oculta la contraseña
        togglePassword.src = ojoAbierto;        // cambia a ojo abierto
    }
});