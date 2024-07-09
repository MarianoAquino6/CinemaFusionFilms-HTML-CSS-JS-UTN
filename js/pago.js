function validarFormulario() {
    let titular = document.getElementById('titular').value;
    let numero = document.getElementById('numero').value;
    let date = document.getElementById('date').value;
    let codigo = document.getElementById('codigo').value;
    let dni = document.getElementById('dni').value;
    
    if (!titular || !numero || !date || !codigo || !dni) {
        showToast('Por favor, completa todos los campos.', true);
        return false;
    }
    
    if (numero.length !== 1) {
        showToast('El número de la tarjeta debe tener 16 dígitos.', true);
        return false;
    }
    if (codigo.length !== 3) {
        showToast('El código de seguridad debe tener 3 dígitos.', true);
        return false;
    }
    if (dni.length < 7) {
        showToast('El DNI debe tener al menos 7 dígitos.', true);
        return false;
    }
    
    alert("pago realizado")
    return true;
}

function showToast(message, isError = false) {
    Toastify({
        text: message,
        backgroundColor: isError ? 'linear-gradient(to right, #801a04, #d42904)' : 'linear-gradient(to right, #115702, #247a11)',
    }).showToast();
}
