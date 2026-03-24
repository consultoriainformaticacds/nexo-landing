async function enviarCont(){
  var btn=document.getElementById('c-btn'),status=document.getElementById('form-status');
  var nombre=document.getElementById('c-nombre').value.trim(),contacto=document.getElementById('c-contacto').value.trim(),servicio=document.getElementById('c-servicio').value,mensaje=document.getElementById('c-mensaje').value.trim();
  if(!nombre||!contacto||!servicio){status.style.color='#1A6BB5';status.textContent='Completá los campos obligatorios.';return}
  btn.textContent='Enviando...';btn.disabled=true;status.textContent='';
  try{
    var r=await fetch('https://formspree.io/f/xpqynaqq',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({nombre,contacto,servicio,mensaje})});
    if(r.ok){status.style.color='#1A6BB5';status.textContent='Consulta recibida. Te contactamos en menos de 24 horas.';document.getElementById('c-nombre').value='';document.getElementById('c-contacto').value='';document.getElementById('c-servicio').value='';document.getElementById('c-mensaje').value=''}
    else throw new Error();
  }catch(e){status.style.color='#c0392b';status.textContent='Error. Contactanos por WhatsApp.'}
  btn.textContent='Solicitar consulta gratuita';btn.disabled=false;
}