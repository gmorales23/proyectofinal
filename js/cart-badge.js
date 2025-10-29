(function() {
    // Refresca el número del carrito en el navbar
    function actualizarBadgeCarritoGlobal() {
        var badge = document.getElementById('cart-count');
        if (!badge) return;
        try {
            var items = JSON.parse(localStorage.getItem('cartItems') || '[]');
            var total = 0;
            for (var i = 0; i < items.length; i++) {
                total += parseInt(items[i].count) || 0;
            }
            badge.textContent = total;
            badge.style.display = total > 0 ? 'inline-block' : 'none';
        } catch (e) {}
    }

    // Ejecutar al cargar
    document.addEventListener('DOMContentLoaded', actualizarBadgeCarritoGlobal);
    // Actualizar si cambia localStorage desde otra pestaña
    window.addEventListener('storage', function(evt) {
        if (evt.key === 'cartItems') actualizarBadgeCarritoGlobal();
    });

})();


