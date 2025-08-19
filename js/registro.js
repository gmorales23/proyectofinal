const formRegistro = document.getElementById("registerForm");
const regMessage = document.getElementById("regMessage");

formRegistro.addEventListener("submit", function(e) {
    e.preventDefault();

    const usuario = document.getElementById("newUsername").value;
    const contrasena = document.getElementById("newPassword").value;
    const repetirContrasena = document.getElementById("repeatPassword").value;

    // Validar campos vacíos
    if (!usuario || !contrasena) {
        regMessage.textContent = "Por favor, completa todos los campos";
        regMessage.style.color = "red";
        return;
    }

    // Validar contraseñas iguales
    if (contrasena !== repetirContrasena) {
        regMessage.textContent = "Las contraseñas no coinciden";
        regMessage.style.color = "red";
        return;
    }

    // Obtener lista de usuarios existente o array vacío si no hay
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar si ya existe el usuario
    const usuarioExistente = usuarios.find(u => u.usuario === usuario);
    if (usuarioExistente) {
        regMessage.textContent = "El usuario ya existe, elige otro nombre";
        regMessage.style.color = "red";
        return;
    }

    // Agregar nuevo usuario al array
    usuarios.push({ usuario, contrasena });

    // Guardar de nuevo en localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Marcar al usuario como logueado
    localStorage.setItem("usuarioLogueado", usuario);

    regMessage.textContent = "Registro exitoso. Redirigiendo a la página principal...";
    regMessage.style.color = "green";

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
});

// Detecta si ya hay sesión activa y reemplaza el formulario
window.addEventListener("DOMContentLoaded", () => {
    mostrarUsuarioLogueado(".loginContenedor", true); // true = mostrar botón "Ir a inicio"
});