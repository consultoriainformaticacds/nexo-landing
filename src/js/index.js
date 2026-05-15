// ===========================
// SCROLL REVEAL
// ===========================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ===========================
// FORMSPREE AJAX (DIAGNÓSTICO)
// ===========================
const form = document.getElementById('nexoForm');
const status = document.getElementById('form-status');
const btn = document.getElementById('nexo-btn');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const originalText = btn.textContent;
  btn.textContent = 'Procesando Solicitud...';
  btn.disabled = true;
  btn.style.opacity = '0.7';
  if (status) status.textContent = '';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      btn.textContent = '¡Diagnóstico Solicitado!';
      btn.style.opacity = '1';
      btn.style.background = '#fff';
      btn.style.color = '#000';
      if (status) {
        status.textContent = 'Tu solicitud formal ha sido enviada. Un especialista te contactará a la brevedad.';
        status.style.color = 'var(--gold)';
      }
      form.reset();

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.cssText = '';
        btn.disabled = false;
        if (status) status.textContent = '';
      }, 6000);

    } else {
      const result = await response.json();
      const msg = result?.errors?.[0]?.message ?? 'Error desconocido';
      if (status) { status.textContent = 'Error: ' + msg; status.style.color = '#ff4444'; }
      btn.textContent = originalText;
      btn.disabled = false;
      btn.style.opacity = '1';
    }

  } catch {
    if (status) {
      status.textContent = 'Error de conexión. Por favor, comunícate por WhatsApp.';
      status.style.color = '#ff4444';
    }
    btn.textContent = originalText;
    btn.disabled = false;
    btn.style.opacity = '1';
  }
});