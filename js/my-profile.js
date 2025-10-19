document.addEventListener("DOMContentLoaded", () => {

    // Constantes de los elementos del formulario
    const form = document.getElementById("profileForm");
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const email = document.getElementById("email");
    const telefono = document.getElementById("telefono");
    const inputImagen = document.getElementById("imagenPerfil");
    const preview = document.getElementById("preview");
    const profileImageContainer = document.getElementById("profileImageContainer");
    const mensajeConfirmacion = document.getElementById("mensajeConfirmacion");
    
    // Variable para almacenar la imagen temporalmente
    let imagenTemporal = null;

    // Obtener el usuario logueado
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");
    let emailUsuario = null;
    if (usuarioLogueado) {
        const usuario = JSON.parse(usuarioLogueado);
        emailUsuario = usuario.email;
    }

    // Precargar posibles datos guardados del usuario específico
    if (emailUsuario) {
        const perfilGuardado = JSON.parse(localStorage.getItem(`perfilUsuario_${emailUsuario}`));
        if (perfilGuardado) {
            nombre.value = perfilGuardado.nombre || "";
            apellido.value = perfilGuardado.apellido || "";
            email.value = perfilGuardado.email || "";
            telefono.value = perfilGuardado.telefono || "";
        } else {
            // Si no hay datos guardados, precargar el email del usuario logueado
            email.value = emailUsuario;
        }
    }

    // Cargar imagen guardada del usuario específico (si existe)
    if (emailUsuario) {
        const imagenGuardada = localStorage.getItem(`imagenPerfil_${emailUsuario}`);
        if (imagenGuardada) {
            preview.src = imagenGuardada;
        }
    }

    // Hacer clickeable el contenedor de la imagen
    profileImageContainer.addEventListener("click", () => {
        inputImagen.click();
    });

    // Guardar imagen temporalmente al seleccionarla
    inputImagen.addEventListener("change", (event) => {
        const archivo = event.target.files[0];
        if (!archivo) return;

        const lector = new FileReader();
        lector.onload = function (e) {
            const base64 = e.target.result; 
            // Solo guardar temporalmente, no en localStorage aún
            imagenTemporal = base64;
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

        // Guardar datos específicos del usuario
        if (emailUsuario) {
            localStorage.setItem(`perfilUsuario_${emailUsuario}`, JSON.stringify(datos));
            
            // Guardar imagen solo si hay una imagen temporal
            if (imagenTemporal) {
                localStorage.setItem(`imagenPerfil_${emailUsuario}`, imagenTemporal);
                imagenTemporal = null; // Limpiar la imagen temporal
            }
        }

        // Mostrar mensaje de confirmación
        mensajeConfirmacion.classList.remove("d-none");
        
        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
            mensajeConfirmacion.classList.add("d-none");
        }, 3000);
    });
});