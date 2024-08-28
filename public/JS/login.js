document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email && password) {
            // Aquí puedes agregar cualquier validación adicional si es necesario
            window.location.href = '/main'; 
        } else {
            alert('Por favor, completa ambos campos antes de continuar.');
        }
    });
});
