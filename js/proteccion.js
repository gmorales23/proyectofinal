// Verificar sesión activa
const usuarioLogueado = localStorage.getItem("usuarioLogueado");

if (!usuarioLogueado) {
  window.location.href = "login.html";
} else {
  mostrarUsuarioLogueado("#userNav", false);
}
