// Variables globales
const form = document.getElementById("loanForm");
const loanList = document.getElementById("loanList");
const tasaInteresAnual = 0.2; // 20% anual

// Función para cargar los préstamos desde simulaciones.json
function cargarBotonesPredefinidosDesdeJSON() {
  fetch("simulaciones.json")
      .then((response) => {
          if (!response.ok) {
              throw new Error("Error al cargar el archivo JSON");
          }
          return response.json();
      })
      .then((prestamosPredefinidos) => {
          generarBotonesPredefinidos(prestamosPredefinidos);
      })
      .catch((error) => console.error("Error al cargar los préstamos predefinidos:", error));
}

// Función para generar los botones dinámicamente
function generarBotonesPredefinidos(prestamosPredefinidos) {
  const contenedorBotones = document.getElementById("predefinedLoans");
  contenedorBotones.innerHTML = ""; // Limpiar el contenedor

  prestamosPredefinidos.forEach((prestamo) => {
      const button = document.createElement("button");
      button.textContent = `${prestamo.nombre} ($${prestamo.monto} - ${prestamo.cuotas} cuotas)`;
      button.className = "btn btn-outline-primary me-2 mb-2";
      button.addEventListener("click", () => autocompletarFormulario(prestamo));
      contenedorBotones.appendChild(button);
  });
}

// Función para autocompletar el formulario con un préstamo seleccionado
function autocompletarFormulario(prestamo) {
  document.getElementById("monto").value = prestamo.monto;
  document.getElementById("cuotas").value = prestamo.cuotas;
}

// Cargar los botones de préstamos predefinidos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  cargarBotonesPredefinidosDesdeJSON();
  mostrarSolicitudes(); // Mantener las solicitudes dinámicas
});

// Evento para manejar el envío del formulario
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evitar recargar la página

    // Obtener valores del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const monto = parseFloat(document.getElementById("monto").value);
    const cuotas = parseInt(document.getElementById("cuotas").value);

    // Validar los datos ingresados
    if (!nombre || !email || isNaN(monto) || isNaN(cuotas) || monto <= 0 || cuotas <= 0) {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }

    // Calcular el préstamo
    const tasaInteresMensual = tasaInteresAnual / 12;
    const totalIntereses = monto * tasaInteresMensual * cuotas;
    const totalDevolver = monto + totalIntereses;
    const cuotaMensual = totalDevolver / cuotas;

    // Crear un objeto con los datos de la simulación
    const nuevaSimulacion = {
        nombre,
        email,
        monto,
        cuotas,
        totalDevolver: totalDevolver.toFixed(2),
        totalIntereses: totalIntereses.toFixed(2),
        cuotaMensual: cuotaMensual.toFixed(2),
    };

    // Guardar en localStorage
    guardarEnStorage(nuevaSimulacion);

    // Mostrar los resultados
    mostrarSolicitudes();

    // Limpiar el formulario
    form.reset();
});

// Función para guardar una simulación en localStorage
function guardarEnStorage(simulacion) {
    const simulaciones = JSON.parse(localStorage.getItem("simulaciones")) || [];
    simulaciones.push(simulacion); // Agregar la nueva simulación
    localStorage.setItem("simulaciones", JSON.stringify(simulaciones));
}

// Función para mostrar todas las solicitudes desde localStorage
function mostrarSolicitudes() {
    const simulaciones = JSON.parse(localStorage.getItem("simulaciones")) || [];
    loanList.innerHTML = ""; // Limpiar la lista anterior

    simulaciones.forEach((simulacion, index) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        li.textContent = `${simulacion.nombre} solicitó $${simulacion.monto} en ${simulacion.cuotas} cuotas. Total a devolver: $${simulacion.totalDevolver}`;

        // Crear botón de eliminación
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Eliminar";
        deleteBtn.className = "btn btn-danger btn-sm";
        deleteBtn.addEventListener("click", () => eliminarSolicitud(index));

        li.appendChild(deleteBtn);
        loanList.appendChild(li);
    });
}

// Función para eliminar una simulación por índice
function eliminarSolicitud(index) {
    const simulaciones = JSON.parse(localStorage.getItem("simulaciones")) || [];
    simulaciones.splice(index, 1); // Eliminar la simulación
    localStorage.setItem("simulaciones", JSON.stringify(simulaciones));
    mostrarSolicitudes(); // Actualizar la lista
}

// Mostrar las simulaciones al cargar la página
document.addEventListener("DOMContentLoaded", mostrarSolicitudes);

function simularAccion() {
  // Simulando algo, como un delay de 2 segundos
  setTimeout(() => {
    // Mostrar la notificación al terminar la simulación
    Swal.fire({
      title: '¡Simulación completada!',
      text: 'La acción se realizó con éxito.',
      icon: 'success',
      confirmButtonText: 'Entendido'
    });
  }, 2000); // Simula un proceso de 2 segundos
}

// Llamás a la función para que arranque la simulación
simularAccion();
