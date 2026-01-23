/**
 * Widget de Accesibilidad
 * Funcionalidades: Aumentar texto, Alto contraste, Escala de grises
 */

document.addEventListener('DOMContentLoaded', () => {
    createAccessWidget();
});

function createAccessWidget() {
    // Crear el botón flotante
    const btn = document.createElement('button');
    btn.id = 'access-btn';
    btn.innerHTML = '♿';
    btn.ariaLabel = 'Opciones de Accesibilidad';
    btn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color, #c9a961);
        color: white;
        border: none;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        font-size: 24px;
        cursor: pointer;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s;
    `;

    // Crear el panel de opciones
    const panel = document.createElement('div');
    panel.id = 'access-panel';
    panel.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 250px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        padding: 1rem;
        z-index: 9999;
        display: none;
        border: 2px solid var(--primary-color, #c9a961);
    `;

    panel.innerHTML = `
        <h4 style="margin: 0 0 1rem 0; color: #333; font-family: sans-serif; text-align: center;">Accesibilidad</h4>
        <div style="display: grid; gap: 0.8rem;">
            <button onclick="toggleFontSize()" style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 8px; background: #f9f9f9; cursor: pointer;">🔍 Aumentar Texto</button>
            <button onclick="toggleContrast()" style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 8px; background: #000; color: #fff; cursor: pointer;">🌗 Alto Contraste</button>
            <button onclick="toggleGrayscale()" style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 8px; background: #f9f9f9; cursor: pointer;">⚪ Escala de Grises</button>
            <button onclick="resetAccess()" style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 8px; background: #ffeba0; cursor: pointer;">↺ Restablecer</button>
        </div>
    `;

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    // Toggle panel
    btn.addEventListener('click', () => {
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        btn.setAttribute('aria-expanded', panel.style.display === 'block');
    });
}

// Funciones de Accesibilidad
let isLargeText = false;
let isHighContrast = false;
let isGrayscale = false;

window.toggleFontSize = function () {
    isLargeText = !isLargeText;
    if (isLargeText) {
        document.documentElement.style.fontSize = '125%';
    } else {
        document.documentElement.style.fontSize = '';
    }
    saveState();
}

window.toggleContrast = function () {
    isHighContrast = !isHighContrast;
    document.body.classList.toggle('high-contrast', isHighContrast);
    if (isHighContrast) {
        const style = document.createElement('style');
        style.id = 'hc-style';
        style.textContent = `
            body.high-contrast { background: #000 !important; color: #fff !important; }
            body.high-contrast p, body.high-contrast h1, body.high-contrast h2, body.high-contrast h3 { color: #fff !important; }
            body.high-contrast a { color: #ffff00 !important; text-decoration: underline !important; }
            body.high-contrast .card, body.high-contrast .modal-content { background: #000 !important; border: 2px solid #fff !important; }
        `;
        document.head.appendChild(style);
    } else {
        const style = document.getElementById('hc-style');
        if (style) style.remove();
    }
    saveState();
}

window.toggleGrayscale = function () {
    isGrayscale = !isGrayscale;
    document.body.style.filter = isGrayscale ? 'grayscale(100%)' : '';
    saveState();
}

window.resetAccess = function () {
    isLargeText = false;
    isHighContrast = false;
    isGrayscale = false;

    document.documentElement.style.fontSize = '';
    document.body.classList.remove('high-contrast');
    const style = document.getElementById('hc-style');
    if (style) style.remove();
    document.body.style.filter = '';
    saveState();
}

function saveState() {
    localStorage.setItem('accessState', JSON.stringify({
        isLargeText,
        isHighContrast,
        isGrayscale
    }));
}

// Restaurar estado al cargar
const saved = localStorage.getItem('accessState');
if (saved) {
    const state = JSON.parse(saved);
    if (state.isLargeText) window.toggleFontSize();
    if (state.isHighContrast) window.toggleContrast();
    if (state.isGrayscale) window.toggleGrayscale();
}
