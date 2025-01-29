// Validaciones:

// Obtenemos todos los form que necesitamos validar
const forms = document.querySelectorAll('.needs-validation')

// Iteramos sobre ellos y evitamos el comportamiento por default y la propagación del evento
Array.from(forms).forEach(form => {
  form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }

    form.classList.add('was-validated')
  }, false)
});
  
document.getElementById("simular").addEventListener("click", function () {
  Swal.fire({
    title: 'Simulando...',
    text: 'Por favor, espera mientras se realiza la simulación.',
    icon: 'info',
    allowOutsideClick: false,
    showConfirmButton: false,
    timer: 2000 // Simula el proceso durante 2 segundos
  }).then(() => {
    Swal.fire({
      title: '¡Completado!',
      text: 'La simulación terminó con éxito.',
      icon: 'success',
      confirmButtonText: 'Cerrar'
    });
  });
});
