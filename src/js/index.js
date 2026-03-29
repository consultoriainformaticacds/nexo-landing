document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('nexoForm');
    const status = document.getElementById('form-status');
    const btn = document.getElementById('nexo-btn');

    if (!form) return; // Si no encuentra el formulario, no hace nada

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // CRÍTICO: Esto es lo que evita que salte a Formspree
        
        const originalText = btn.innerText;
        btn.innerText = "ENVIANDO...";
        btn.disabled = true;

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // ÉXITO: Mostramos mensaje en tu propia web
                status.innerText = "¡Solicitud enviada con éxito! Te contactaremos pronto.";
                status.style.color = "var(--gold)";
                form.reset();
                btn.innerText = "¡ENVIADO!";
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    status.innerText = "";
                }, 5000);
            } else {
                throw new Error("Error en el servidor");
            }
        } catch (error) {
            // ERROR: Falló la conexión o el servidor
            status.innerText = "Error al enviar. Por favor, intenta por WhatsApp.";
            status.style.color = "#ef4444";
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });
});