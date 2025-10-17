document.addEventListener("DOMContentLoaded", function() {
    let halloweenActivo = localStorage.getItem('halloween') === 'true';
    const btnHalloween = document.getElementById('halloween-toggle');

    function aplicarHalloween() {
        document.body.classList.add("halloween");

        const heroText = document.querySelector(".hero-section .lead");
        if (heroText) heroText.textContent = "Ofertas tan buenas que asustan 💀";

        document.querySelectorAll(".custom-card").forEach(card => card.classList.add("halloween-card"));

        const header = document.querySelector("header");
        if (header) header.classList.add("halloween-header");

        const footer = document.querySelector("footer");
        if (footer) footer.classList.add("halloween-footer");

        const numeroCalabazas = 15;
        for (let i = 0; i < numeroCalabazas; i++) {
            const calabaza = document.createElement("img");
            calabaza.src = "img/calabaza.png";
            calabaza.classList.add("calabaza");
            const size = 50 + Math.random() * 100;
            calabaza.style.width = size + "px";
            calabaza.style.left = Math.random() * 90 + "%";
            calabaza.style.animationDuration = (5 + Math.random() * 10) + "s";
            calabaza.style.animationDelay = Math.random() * 5 + "s";
            calabaza.style.bottom = "-" + size + "px";
            document.body.appendChild(calabaza);
        }

        actualizarLogoHalloween(true);
    }

    function quitarHalloween() {
        document.body.classList.remove("halloween");

        const heroText = document.querySelector(".hero-section .lead");
        if (heroText) heroText.textContent = "Encuentra los mejores productos, ofertas y categorías pensadas para vos.";

        document.querySelectorAll(".custom-card").forEach(card => card.classList.remove("halloween-card"));

        const header = document.querySelector("header");
        if (header) header.classList.remove("halloween-header");

        const footer = document.querySelector("footer");
        if (footer) footer.classList.remove("halloween-footer");

        document.querySelectorAll(".calabaza").forEach(c => c.remove());

        actualizarLogoHalloween(false);
    }

    // Botón Halloween
    if (btnHalloween) {
        btnHalloween.textContent = halloweenActivo ? "🎃 Desenjalowinarse" : "👻 Enjalowinarse";

        btnHalloween.onclick = function () {
            halloweenActivo = !halloweenActivo;
            localStorage.setItem('halloween', halloweenActivo);

            if (halloweenActivo) {
                const sound = document.getElementById("ghost-sound");
                if (sound) {
                    sound.currentTime = 0;
                    sound.play().catch(err => console.log("Error al reproducir sonido:", err));
                }
                aplicarHalloween();
                btnHalloween.textContent = "🎃 Desenjalowinarse";
            } else {
                quitarHalloween();
                btnHalloween.textContent = "👻 Enjalowinarse";
            }
        }
    }

    // Activar automáticamente si estaba activo
    if (halloweenActivo) aplicarHalloween();

    function actualizarLogoHalloween(activo) {
        const logo = document.querySelector('.logo-nav');
        if (!logo) return;

        if (activo) {
            logo.src = 'img/logoHalloween.jpg';
            logo.alt = 'Logo JAP - Halloween';
        } else {
            const tema = localStorage.getItem('tema') || 'light';
            logo.src = tema === 'dark' ? 'img/japLogoWhite.png' : 'img/japLogo.png';
            logo.alt = tema === 'dark' ? 'Logo JAP - Modo Oscuro' : 'Logo JAP - Modo Claro';
        }
    }
});

