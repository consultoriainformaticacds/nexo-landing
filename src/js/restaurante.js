function setTab(btn){document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));btn.classList.add('active')}
function toggleFaq(el){el.parentElement.classList.toggle('open')}
async function enviarRest(){
  var btn=document.getElementById('r-btn'),status=document.getElementById('form-status');
  var nombre=document.getElementById('r-nombre').value.trim(),wa=document.getElementById('r-wa').value.trim(),fecha=document.getElementById('r-fecha').value,personas=document.getElementById('r-personas').value,horario=document.getElementById('r-horario').value,notas=document.getElementById('r-notas').value.trim();
  if(!nombre||!wa||!fecha||!personas||!horario){status.style.color='#E8956A';status.textContent='Completá los campos obligatorios.';return}
  btn.textContent='Enviando...';btn.disabled=true;status.textContent='';
  try{
    var r=await fetch('https://formspree.io/f/xpqynaqq',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({nombre,whatsapp:wa,fecha,personas,horario,notas})});
    if(r.ok){status.style.color='#E8956A';status.textContent='Reserva recibida. Te confirmamos pronto.';document.getElementById('r-nombre').value='';document.getElementById('r-wa').value='';document.getElementById('r-fecha').value='';document.getElementById('r-personas').value='';document.getElementById('r-horario').value='';document.getElementById('r-notas').value=''}
    else throw new Error();
  }catch(e){status.style.color='#C0392B';status.textContent='Error. Escribinos por WhatsApp.'}
  btn.textContent='Confirmar reserva';btn.disabled=false;
}