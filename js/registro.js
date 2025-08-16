const formRegistro = document.getElementById("registerForm");
const regMessage = document.getElementById("regMessage");

formRegistro.addEventListener("submit", function(e) {
    e.preventDefault();

    const usuario = document.getElementById("newUsername").value.trim();
    const contrasena = document.getElementById("newPassword").value.trim();
    const repetirContrasena = document.getElementById("repeatPassword").value.trim();

    if (!usuario || !contrasena) {
        regMessage.textContent = "Por favor, completa todos los campos";
        regMessage.style.color = "red";
        return;
    }

    if (contrasena !== repetirContrasena) {
        regMessage.textContent = "Las contraseñas no coinciden";
        regMessage.style.color = "red";
        return;
    }

    // Guardar usuario y contraseña
    localStorage.setItem("usuario", usuario);
    localStorage.setItem("contrasena", contrasena);

    // Marcar al usuario como logueado automáticamente
    localStorage.setItem("usuarioLogueado", usuario);

    regMessage.textContent = "Registro exitoso. Redirigiendo a la página principal...";
    regMessage.style.color = "green";

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
});
