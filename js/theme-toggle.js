// Sistema simple de cambio de tema - Modo Claro/Oscuro

// Aplicar tema al cargar la página
function aplicarTema() {
    const tema = localStorage.getItem('tema') || 'light';
    document.documentElement.setAttribute('data-theme', tema);
    
    // Actualizar el logo inmediatamente
    actualizarLogo(tema);
}

// Cambiar entre tema claro y oscuro
function cambiarTema(event) {
    // Prevenir que el botón redirija al index
    event.preventDefault();
    event.stopPropagation();
    
    const temaActual = localStorage.getItem('tema') || 'light';
    const nuevoTema = temaActual === 'light' ? 'dark' : 'light';
    
    // Desactivar transiciones temporalmente para evitar parpadeo
    document.documentElement.style.transition = 'none';
    
    localStorage.setItem('tema', nuevoTema);
    document.documentElement.setAttribute('data-theme', nuevoTema);
    
    // Reactivar transiciones después de un breve delay
    setTimeout(() => {
        document.documentElement.style.transition = '';
    }, 50);
    
    // Actualizar el botón
    actualizarBoton();
}

// El botón ahora está en el HTML, no necesitamos crearlo

// Actualizar el botón según el tema actual
function actualizarBoton() {
    const boton = document.getElementById('theme-toggle');
    if (!boton) return;

    const tema = localStorage.getItem('tema') || 'light';
    const icono = boton.querySelector('i');

    if (tema === 'light') {
        icono.className = 'fas fa-moon';
        boton.title = 'Cambiar a modo oscuro';
    } else {
        icono.className = 'fas fa-sun';
        boton.title = 'Cambiar a modo claro';
    }
    
    // Actualizar el logo según el tema
    actualizarLogo(tema);
}

// Actualizar el logo según el tema
function actualizarLogo(tema) {
    const logo = document.querySelector('.logo-nav');
    if (!logo) return;

    if (tema === 'dark') {
        logo.src = 'img/japLogoWhite.png';
        logo.alt = 'Logo JAP - Modo Oscuro';
    } else {
        logo.src = 'img/japLogo.png';
        logo.alt = 'Logo JAP - Modo Claro';
    }
}

// Aplicar tema INMEDIATAMENTE para evitar flash blanco
aplicarTema();

// Inicializar cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    actualizarBoton();
});
