document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario

        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        if (email && password) {
            // Aquí puedes agregar cualquier validación adicional si es necesario
            window.location.href = '/main'; // Cambia '/pagina-destino' a la ruta que desees
        } else {
            alert('Por favor, completa ambos campos antes de continuar.');
        }
    });
});
