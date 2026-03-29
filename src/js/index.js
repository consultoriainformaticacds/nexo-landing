document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('nexoForm');
    const status = document.getElementById('form-status');
    const btn = document.getElementById('nexo-btn');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // AQUÍ SE FRENA EL SALTO A FORMSPREE
        
        const originalText = btn.innerText;
        btn.innerText = "ENVIANDO...";
        btn.disabled = true;

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                status.innerText = "¡Solicitud enviada con éxito!";
                status.style.color = "var(--gold)";
                form.reset();
                setTimeout(() => { 
                    btn.innerText = originalText;
                    btn.disabled = false;
                    status.innerText = "";
                }, 5000);
            } else {
                throw new Error();
            }
        } catch (error) {
            status.innerText = "Error. Intente por WhatsApp.";
            status.style.color = "#ef4444";
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });
});