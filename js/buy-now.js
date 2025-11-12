// js/buy-now.js
console.log("buy-now.js se está cargando...");

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOMContentLoaded ejecutado");
  
  const form = document.getElementById("buy-form");
  const successMsg = document.getElementById("successMsg");
  const subtotalElem = document.getElementById("subtotal");
  const envioCostoElem = document.getElementById("envio-costo");
  const totalElem = document.getElementById("total");

  console.log("Elementos obtenidos:", {
    form: form ? "OK" : "ERROR",
    subtotal: subtotalElem ? "OK" : "ERROR",
    envio: envioCostoElem ? "OK" : "ERROR",
    total: totalElem ? "OK" : "ERROR"
  });

  // Leer carrito
  const carritoJSON = localStorage.getItem("cartItems");
  console.log("Carrito JSON:", carritoJSON);
  
  const carrito = JSON.parse(carritoJSON) || [];
  console.log("Carrito parseado:", carrito);

  if (carrito.length === 0) {
    alert("Tu carrito está vacío. Redirigiendo...");
    window.location.href = "cart.html";
    return;
  }

  // Función: convertir a pesos
  function convertirAPesos(precio, moneda) {
    if (!precio) return 0;
    return moneda === "USD" ? Number(precio) * 40 : Number(precio);
  }

  // Calcular subtotal
  function calcularSubtotal() {
    let subtotal = 0;
    carrito.forEach(item => {
      const precioEnPesos = convertirAPesos(item.unitCost, item.currency);
      const cantidad = Number(item.count) || 1;
      subtotal += precioEnPesos * cantidad;
    });
    console.log("Subtotal calculado:", subtotal);
    return subtotal;
  }

  // Actualizar costos
  function actualizarCostos() {
    console.log("Actualizando costos...");
    
    const subtotal = calcularSubtotal();
    
    if (subtotalElem) {
      subtotalElem.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
      console.log("Subtotal actualizado en UI");
    }

    const tipoEnvioSeleccionado = document.querySelector('input[name="envio"]:checked');
    let porcentaje = 0;

    if (tipoEnvioSeleccionado) {
      const valorEnvio = tipoEnvioSeleccionado.value;
      if (valorEnvio === "premium") porcentaje = 0.15;
      else if (valorEnvio === "express") porcentaje = 0.07;
      else if (valorEnvio === "standard") porcentaje = 0.05;
    }

    const costoEnvio = subtotal * porcentaje;

    if (envioCostoElem) {
      envioCostoElem.textContent = `Costo de envío: $${costoEnvio.toFixed(2)}`;
    }

    const total = subtotal + costoEnvio;
    if (totalElem) {
      totalElem.textContent = `Total: $${total.toFixed(2)}`;
    }

    console.log("Costos actualizados:", {
      subtotal: subtotal,
      envio: costoEnvio,
      total: total
    });
  }

  // Escuchar cambios en envío
  document.querySelectorAll('input[name="envio"]').forEach(radio => {
    radio.addEventListener("change", function() {
      console.log("Cambió tipo de envío a:", this.value);
      actualizarCostos();
    });
  });

  // Ejecutar al cargar
  console.log("Llamando a actualizarCostos()...");
  actualizarCostos();

  // Validación del formulario
  if (form) {
    form.addEventListener("submit", function(e) {
      console.log("Submit del formulario");
      e.preventDefault();
      e.stopPropagation();

      // Agregar clase de validación de Bootstrap
      form.classList.add("was-validated");

      // Verificar si el formulario es válido
      const departamento = document.getElementById("departamento").value.trim();
      const calle = document.getElementById("calle").value.trim();
      const numerodepuerta = document.getElementById("numerodepuerta").value.trim();
      const esquina = document.getElementById("esquina").value.trim();
      const tipoEnvio = document.querySelector('input[name="envio"]:checked');
      const formaPago = document.querySelector('input[name="pago"]:checked');

      // Mostrar/ocultar mensajes de error para radio buttons
      const envioError = document.getElementById("envio-error");
      const pagoError = document.getElementById("pago-error");

      if (!tipoEnvio && envioError) {
        envioError.style.display = "block";
      } else if (envioError) {
        envioError.style.display = "none";
      }

      if (!formaPago && pagoError) {
        pagoError.style.display = "block";
      } else if (pagoError) {
        pagoError.style.display = "none";
      }

      // Si hay campos inválidos, hacer scroll al primero
      if (!departamento || !calle || !numerodepuerta || !esquina || !tipoEnvio || !formaPago) {
        console.log("Formulario incompleto");
        
        // Encontrar el primer campo inválido y hacer scroll hacia él
        const primerInvalido = form.querySelector(":invalid") || 
                              (!tipoEnvio ? document.getElementById("envio-premium") : null) ||
                              (!formaPago ? document.getElementById("pago-tarjeta") : null);
        
        if (primerInvalido) {
          primerInvalido.scrollIntoView({ behavior: "smooth", block: "center" });
          primerInvalido.focus();
        }
        
        return;
      }

      console.log("Formulario válido, guardando...");

      const subtotal = calcularSubtotal();
      const porcentajeEnvio = tipoEnvio.value === "premium" ? 0.15 : 
                              tipoEnvio.value === "express" ? 0.07 : 0.05;
      const costoEnvio = subtotal * porcentajeEnvio;
      const total = subtotal + costoEnvio;

      const datosEnvio = {
        departamento: departamento,
        calle: calle,
        numerodepuerta: numerodepuerta,
        esquina: esquina,
        tipoEnvio: tipoEnvio.value,
        formaPago: formaPago.value,
        subtotal: subtotal,
        costoEnvio: costoEnvio,
        total: total,
        carrito: carrito,
        fecha: new Date().toISOString()
      };

      localStorage.setItem("datosEnvio", JSON.stringify(datosEnvio));
      console.log("Datos guardados:", datosEnvio);

      if (successMsg) {
        successMsg.classList.remove("d-none");
      }

      setTimeout(function() {
        window.location.href = "payment.html";
      }, 1200);
    });
  }
});

console.log("Final del archivo buy-now.js");