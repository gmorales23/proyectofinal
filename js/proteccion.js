// Verificar si hay sesión activa
const usuarioLogueado = localStorage.getItem("usuarioLogueado");

if (!usuarioLogueado) {
    window.location.href = "login.html";
} else {
    // Mostrar saludo en la barra de navegación
    mostrarUsuarioLogueado("#userNav", false);
}
