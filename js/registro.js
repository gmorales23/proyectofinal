const formRegistro = document.getElementById("registerForm");
const regMessage = document.getElementById("regMessage");

formRegistro.addEventListener("submit", function(e) {
    e.preventDefault();

    const usuario = document.getElementById("newUsername").value.trim();
    const contrasena = document.getElementById("newPassword").value.trim();
    const repetirContrasena = document.getElementById("repeatPassword").value.trim();

    if (contrasena !== repetirContrasena) {
        regMessage.textContent = "Las contraseñas no coinciden";
        regMessage.style.color = "red";
        return;
    }

    localStorage.setItem("usuario", usuario);
    localStorage.setItem("contrasena", contrasena);

    regMessage.textContent = "Registro exitoso. Redirigiendo al login...";
    regMessage.style.color = "green";

    setTimeout(() => {
        window.location.href = "../index.html";
    }, 1500);
});