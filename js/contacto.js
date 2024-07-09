
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
      alert('Por favor, ingrese un email válido.');
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

    alert("llegamos")

    emailjs.send('service_42dc0ua', 'template_wobjqco', templateParams)
      .then(function(response) {
        alert('Formulario enviado con éxito.');
        form.reset();
      }, function(error) {
        alert('Hubo un problema al enviar el formulario: ' + JSON.stringify(error));
      });
  }