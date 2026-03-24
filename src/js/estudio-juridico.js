function toggleFaq(el){el.parentElement.classList.toggle('open')}
async function enviarLaw(){
  var btn=document.getElementById('l-btn'),status=document.getElementById('form-status');
  var nombre=document.getElementById('l-nombre').value.trim(),contacto=document.getElementById('l-contacto').value.trim(),area=document.getElementById('l-area').value,mensaje=document.getElementById('l-mensaje').value.trim();
  if(!nombre||!contacto||!area){status.style.color='#B8975A';status.textContent='Complete los campos obligatorios.';return}
  btn.textContent='Enviando...';btn.disabled=true;status.textContent='';
  try{
    var r=await fetch('https://formspree.io/f/xpqynaqq',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({nombre,contacto,area,mensaje})});
    if(r.ok){status.style.color='#B8975A';status.textContent='Consulta recibida. Le contactaremos dentro de las 24 horas hábiles.';document.getElementById('l-nombre').value='';document.getElementById('l-contacto').value='';document.getElementById('l-area').value='';document.getElementById('l-mensaje').value=''}
    else throw new Error();
  }catch(e){status.style.color='#8B1A1A';status.textContent='Error al enviar. Contáctenos por WhatsApp.'}
  btn.textContent='Solicitar consulta gratuita';btn.disabled=false;
}