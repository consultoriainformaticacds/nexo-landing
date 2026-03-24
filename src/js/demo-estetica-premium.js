function setTab(btn) { document.querySelectorAll('.tab').forEach(t => t.classList.remove('active')); btn.classList.add('active'); }
function toggleFaq(el) { var item = el.parentElement; item.classList.toggle('open'); }
async function enviarLum() {
  var btn = document.getElementById('lum-btn');
  var status = document.getElementById('form-status');
  var nombre = document.getElementById('lum-nombre').value.trim();
  var contacto = document.getElementById('lum-contacto').value.trim();
  var servicio = document.getElementById('lum-servicio').value;
  var dia = document.getElementById('lum-dia').value;
  var mensaje = document.getElementById('lum-mensaje').value.trim();
  if (!nombre || !contacto || !servicio) { status.style.color='#C9957A'; status.textContent='Completá los campos obligatorios.'; return; }
  btn.textContent='Enviando...'; btn.disabled=true; status.textContent='';
  try {
    var r = await fetch('https://formspree.io/f/xpqynaqq', { method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'}, body:JSON.stringify({nombre,contacto,servicio,dia,mensaje}) });
    if (r.ok) { status.style.color='#8B5E52'; status.textContent='Turno solicitado. Te confirmamos pronto.'; document.getElementById('lum-nombre').value=''; document.getElementById('lum-contacto').value=''; document.getElementById('lum-servicio').value=''; document.getElementById('lum-dia').value=''; document.getElementById('lum-mensaje').value=''; }
    else throw new Error();
  } catch(e) { status.style.color='#C9957A'; status.textContent='Error. Contactanos por WhatsApp.'; }
  btn.textContent='Reservar turno'; btn.disabled=false;
}