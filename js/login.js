const formLogin = document.querySelector("form");

formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const contrasena = document.getElementById("contrasena").value;

    // Obtener lista de usuarios del localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscar si existe el usuario con ese email y contraseña
    const usuarioValido = usuarios.find(
        (user) => user.email === email && user.contrasena === contrasena
    );

    if (usuarioValido) {
        // Guardar solo el email (ya no hay nombre de usuario)
        localStorage.setItem("usuarioLogueado", JSON.stringify({ 
            email: usuarioValido.email 
        }));
        window.location.href = "index.html";
    } else {
        alert("Email o contraseña incorrectos");
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