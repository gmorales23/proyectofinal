const formLogin = document.querySelector("form");

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const contrasena = document.getElementById("contrasena").value;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioValido = usuarios.find(user => user.email === email && user.contrasena === contrasena);

  if (usuarioValido) {
    localStorage.setItem("usuarioLogueado", JSON.stringify({ email: usuarioValido.email }));
    window.location.href = "index.html";
  } else {
    alert("Email o contraseña incorrectos");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  mostrarUsuarioLogueado(".loginContenedor", true);
});

// Toggle contraseña
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('contrasena');
const ojoAbierto = "./img/ojo abierto.png";
const ojoCerrado = "./img/ojo cerrado.png";

togglePassword.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.src = ojoCerrado;
  } else {
    passwordInput.type = "password";
    togglePassword.src = ojoAbierto;
  }
});
