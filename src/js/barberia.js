async function enviarBarber(){
  var btn=document.getElementById('b-btn'),status=document.getElementById('form-status');
  var nombre=document.getElementById('b-nombre').value.trim(),wa=document.getElementById('b-wa').value.trim(),servicio=document.getElementById('b-servicio').value,mensaje=document.getElementById('b-mensaje').value.trim();
  if(!nombre||!wa||!servicio){status.style.color='#C9A55A';status.textContent='Completá los campos obligatorios.';return}
  btn.textContent='Enviando...';btn.disabled=true;status.textContent='';
  try{
    var r=await fetch('https://formspree.io/f/xpqynaqq',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({nombre,whatsapp:wa,servicio,mensaje})});
    if(r.ok){status.style.color='#C9A55A';status.textContent='Turno reservado. Te confirmamos pronto.';document.getElementById('b-nombre').value='';document.getElementById('b-wa').value='';document.getElementById('b-servicio').value='';document.getElementById('b-mensaje').value=''}
    else throw new Error();
  }catch(e){status.style.color='#C0392B';status.textContent='Error. Escribinos por WhatsApp.'}
  btn.textContent='Reservar turno';btn.disabled=false;
}