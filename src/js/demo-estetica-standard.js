async function enviarLum() {
  var btn = document.getElementById('lum-btn');
  var status = document.getElementById('form-status');
  var nombre = document.getElementById('lum-nombre').value.trim();
  var contacto = document.getElementById('lum-contacto').value.trim();
  var servicio = document.getElementById('lum-servicio').value;
  var mensaje = document.getElementById('lum-mensaje').value.trim();
  if (!nombre || !contacto || !servicio) {
    status.style.color = '#C9957A';
    status.textContent = 'Por favor completá los campos obligatorios.';
    return;
  }
  btn.textContent = 'Enviando...';
  btn.disabled = true;
  status.textContent = '';
  try {
    var response = await fetch('https://formspree.io/f/xpqynaqq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ nombre, contacto, servicio, mensaje })
    });
    if (response.ok) {
      status.style.color = '#8B5E52';
      status.textContent = 'Turno solicitado. Te contactamos en menos de 24 horas.';
      document.getElementById('lum-nombre').value = '';
      document.getElementById('lum-contacto').value = '';
      document.getElementById('lum-servicio').value = '';
      document.getElementById('lum-mensaje').value = '';
    } else { throw new Error('Error'); }
  } catch(err) {
    status.style.color = '#C9957A';
    status.textContent = 'Error al enviar. Contactanos por WhatsApp.';
  }
  btn.textContent = 'Reservar turno';
  btn.disabled = false;
}