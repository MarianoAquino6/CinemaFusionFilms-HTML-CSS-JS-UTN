document.getElementById('btn-login').addEventListener('submit', function(event) {
    event.preventDefault();
    validarLogin();
});

function validarLogin() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // Recuperar usuario desde localStorage
    let storedUser = JSON.parse(localStorage.getItem('user'));

    // Verificar si las credenciales son correctas
    if (storedUser && storedUser.username === username && storedUser.password === password) {
        mostrarMensajeBienvenida(username);
        setTimeout(function() {
            window.location.href = 'index.html'; // Redireccionar a la página de inicio
        }, 2000); // 2 segundos
    } else {
        showToast('Credenciales incorrectas. Por favor, intenta nuevamente.', true);
    }

    // Limpiar campos de formulario
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';

    return false;
}

function mostrarMensajeBienvenida(username) {
    showToast(`Bienvenido, ${username}! Serás redirigido a la página de inicio en breve.`);
}

function showToast(message, isError = false) {
    Toastify({
        text: message,
        backgroundColor: isError ? 'linear-gradient(to right, #801a04, #d42904)' : 'linear-gradient(to right, #115702, #247a11)',
    }).showToast();
}

function mostrarFormularioRecuperar() {
    // Mostrar el formulario de recuperar contraseña
    let formRecuperar = document.querySelector('.recuperar-contrasena');
    formRecuperar.style.display = 'block';
  }

  function enviarSolicitud() {
    let email = document.getElementById('email-recuperar').value;

    // Aquí podrías enviar una solicitud al servidor para procesar la recuperación de contraseña
    // Por ahora, simplemente mostramos un mensaje
    mostrarMensajeRecuperacion(email);

    // Limpiar el campo de correo electrónico
    document.getElementById('email-recuperar').value = '';

    return false;
  }

  function mostrarMensajeRecuperacion(email) {
    let mensajeRecuperar = document.getElementById('mensaje-recuperar');
    mensajeRecuperar.textContent = `Se ha enviado una solicitud de recuperación de contraseña a ${email}.`;
  }