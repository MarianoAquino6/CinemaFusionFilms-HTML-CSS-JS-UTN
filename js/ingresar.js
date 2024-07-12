document.getElementById('btn-login').addEventListener('submit', function(event) {
    event.preventDefault();
    validarLogin();
});

function validarLogin() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
        mostrarMensajeBienvenida(username);
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 2000);
    } else {
        showToast('Credenciales incorrectas. Por favor, intenta nuevamente.', true);
    }

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

    mostrarMensajeRecuperacion(email);

    document.getElementById('email-recuperar').value = '';

    return false;
  }

  function mostrarMensajeRecuperacion(email) {
    let mensajeRecuperar = document.getElementById('mensaje-recuperar');
    mensajeRecuperar.textContent = `Se ha enviado una solicitud de recuperación de contraseña a ${email}.`;
  }