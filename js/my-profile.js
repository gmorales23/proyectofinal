document.addEventListener('DOMContentLoaded', () => {
  const emailField = document.getElementById('email');
  const nombre = document.getElementById('nombre');
  const apellido = document.getElementById('apellido');
  const telefono = document.getElementById('telefono');
  const form = document.getElementById('profileForm');
  const imagenInput = document.getElementById('imagenPerfil');
  const preview = document.getElementById('preview');

  // 1 precargar email del usuario logueado (solo primera vez)
  const usuarioLogueado = localStorage.getItem('usuarioLogueado');
  if (usuarioLogueado) emailField.value = usuarioLogueado;

  // 2 cargar datos guardados en localStorage (si existen)
  const perfil = JSON.parse(localStorage.getItem('perfilUsuario'));
  if (perfil) {
    nombre.value = perfil.nombre || '';
    apellido.value = perfil.apellido || '';
    telefono.value = perfil.telefono || '';
  }

  // 3 vista previa de imagen (no se guarda)
  imagenInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  });

  // 4 guardar datos en localStorage
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const datos = {
      nombre: nombre.value,
      apellido: apellido.value,
      telefono: telefono.value,
    };
    localStorage.setItem('perfilUsuario', JSON.stringify(datos));
    alert('Perfil guardado correctamente.');
  });
});
