document.addEventListener("DOMContentLoaded", () => {

    // Constantes de los elementos del formulario
    const form = document.getElementById("profileForm");
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const email = document.getElementById("email");
    const telefono = document.getElementById("telefono");
    const inputImagen = document.getElementById("imagenPerfil");
    const preview = document.getElementById("preview");

    // Precargar posibles datos guardados 
    const perfilGuardado = JSON.parse(localStorage.getItem("perfilUsuario"));
    if (perfilGuardado) {
        nombre.value = perfilGuardado.nombre || "";
        apellido.value = perfilGuardado.apellido || "";
        email.value = perfilGuardado.email || "";
        telefono.value = perfilGuardado.telefono || "";
    }

    // Precargar el email del usuario logueado si es la primera vez
    const emailUsuario = localStorage.getItem("user");
    if (emailUsuario && !perfilGuardado?.email) {
        email.value = emailUsuario;
    }

    // Cargar imagen guardada (si existe)
    const imagenGuardada = localStorage.getItem("imagenPerfil");
    if (imagenGuardada) {
        preview.src = imagenGuardada;
    }

    // Guardar imagen al seleccionarla
    inputImagen.addEventListener("change", (event) => {
        const archivo = event.target.files[0];
        if (!archivo) return;

        const lector = new FileReader();
        lector.onload = function (e) {
            const base64 = e.target.result; 
            localStorage.setItem("imagenPerfil", base64); 
            preview.src = base64; // Mostrarla en pantalla
        };
        lector.readAsDataURL(archivo); // Convertir a base64
    });

    // Guardar los datos del formulario
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const datos = {
            nombre: nombre.value,
            apellido: apellido.value,
            email: email.value,
            telefono: telefono.value
        };

        localStorage.setItem("perfilUsuario", JSON.stringify(datos));

        alert("Perfil guardado correctamente ✅");
    });
});