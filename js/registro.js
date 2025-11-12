const formRegistro = document.getElementById("registerForm");
const regMessage = document.getElementById("regMessage");
const emailError = document.getElementById("emailError");

const validarEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validación en tiempo real del email
document.getElementById("newEmail").addEventListener("input", function() {
  const email = this.value;
  if (email && !validarEmail(email)) {
    emailError.textContent = "Por favor, ingresa un email válido";
    emailError.classList.remove("d-none");
    this.classList.add("is-invalid");
  } else {
    emailError.classList.add("d-none");
    this.classList.remove("is-invalid");
  }
});

formRegistro.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("newEmail").value;
  const contrasena = document.getElementById("newPassword").value;
  const repetirContrasena = document.getElementById("repeatPassword").value;

  // Validar campos vacíos
  if (!email || !contrasena) {
    regMessage.textContent = "Por favor, completa todos los campos";
    regMessage.style.color = "red";
    return;
  }

  // Validar formato de email
  if (!validarEmail(email)) {
    regMessage.textContent = "Por favor, ingresa un email válido";
    regMessage.style.color = "red";
    emailError.textContent = "Por favor, ingresa un email válido";
    emailError.classList.remove("d-none");
    return;
  }

  // Validar contraseñas iguales
  if (contrasena !== repetirContrasena) {
    regMessage.textContent = "Las contraseñas no coinciden";
    regMessage.style.color = "red";
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verificar si ya existe el email
  const emailExistente = usuarios.find(u => u.email === email);
  if (emailExistente) {
    regMessage.textContent = "El email ya está registrado, usa otro email";
    regMessage.style.color = "red";
    return;
  }

  // Agregar nuevo usuario
  usuarios.push({ email, contrasena });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.setItem("usuarioLogueado", JSON.stringify({ email }));

  regMessage.textContent = "Registro exitoso. Redirigiendo a la página principal...";
  regMessage.style.color = "green";

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
});

window.addEventListener("DOMContentLoaded", () => {
  mostrarUsuarioLogueado(".loginContenedor", true);
});
