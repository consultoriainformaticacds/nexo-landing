document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('nexoForm');
    const status = document.getElementById('form-status');
    const btn = document.getElementById('nexo-btn');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const originalText = btn.innerText;
            btn.innerText = "PROCESANDO...";
            btn.disabled = true;

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    status.innerText = "SOLICITUD ENVIADA CON ÉXITO";
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
                status.innerText = "ERROR. INTENTE POR WHATSAPP";
                status.style.color = "#ef4444";
                setTimeout(() => { 
                    btn.innerText = originalText;
                    btn.disabled = false;
                }, 4000);
            }
        });
    }
});