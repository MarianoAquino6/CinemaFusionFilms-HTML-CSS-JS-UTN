document.getElementById('register-btn').addEventListener('click', function(event) {
    event.preventDefault();
    validarFormulario();
});

function validarFormulario() {
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirm-password').value;
    
    if (!username) {
        showToast('Por favor, ingresa un nombre de usuario.', true);
        return false;
    }
    
    if (!validateEmail(email)) {
        showToast('Por favor, ingresa un correo electrónico válido.', true);
        return false;
    }
    
    if (!/^\d+$/.test(phone)) {
        showToast('Por favor, ingresa un número de teléfono válido.', true);
        return false;
    }
    
    if (password.length < 8) {
        showToast('La contraseña debe tener al menos 8 caracteres.', true);
        return false;
    }
    
    if (password !== confirmPassword) {
        showToast('Las contraseñas no coinciden.', true);
        return false;
    }
    
    saveUser(username, email, phone, password);
    showToast('Su usuario ha sido registrado exitosamente.', false);
    return false;
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.[^<>()[\]\.,;:\s@"]{2,}))$/i;
    return re.test(String(email).toLowerCase());
}

function showToast(message, isError = false) {
    Toastify({
        text: message,
        backgroundColor: isError ? 'linear-gradient(to right, #801a04, #d42904)' : 'linear-gradient(to right, #115702, #247a11)',
        duration: 3000,
        close: true
    }).showToast();
}

function saveUser(username, email, phone, password) {
    let user = { username, email, phone, password };
    localStorage.setItem('user', JSON.stringify(user));
}