function sendEmail() {
    const form = document.getElementById('contactForm');

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const website = document.getElementById('website').value;
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value;

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        showToast('Por favor, ingrese un email válido.', 'error');
      return;
    }

    const templateParams = {
      nombre: nombre,
      email: email,
      telefono: telefono,
      website: website,
      asunto: asunto,
      mensaje: mensaje
    };

    emailjs.send('service_42dc0ua', 'template_wobjqco', templateParams)
      .then(function(response) {
        showToast('Formulario enviado con éxito.', 'success');
        form.reset();
      }, function(error) {
        showToast('Hubo un problema al enviar el formulario: ' + JSON.stringify(error), 'error');
      });
  }

function showToast(message, type) {
Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: type === 'success' ? "green" : "red",
    stopOnFocus: true,
}).showToast();
}

const button = document.getElementById('runawayButton');

    button.addEventListener('mouseover', function() {
      const maxWidth = window.innerWidth - this.clientWidth;
      const maxHeight = window.innerHeight - this.clientHeight;

      const randomX = Math.floor(Math.random() * maxWidth);
      const randomY = Math.floor(Math.random() * maxHeight);

      this.style.left = `${randomX}px`;
      this.style.top = `${randomY}px`;

      const texts = ['Pedilo', 'Solicitalo', 'Requerilo'];
      const randomIndex = Math.floor(Math.random() * texts.length);

      this.textContent = texts[randomIndex];
    });