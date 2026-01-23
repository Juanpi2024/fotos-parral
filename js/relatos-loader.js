/**
 * Sistema de Relatos Vivos - Integración en Modales
 * Carga historias desde relatos-data.js y las inserta en los modales correspondientes
 */

document.addEventListener('DOMContentLoaded', function () {
    // Esperar un poco para asegurar que la estructura del modal esté lista
    setTimeout(initRelatosSystem, 1000);
});

function initRelatosSystem() {
    if (typeof window.relatosData === 'undefined') {
        console.warn('No se encontraron datos de relatos (window.relatosData)');
        return;
    }

    console.log('Iniciando sistema de relatos...', window.relatosData.length, 'historias encontradas.');

    // Iterar sobre todos los modales existentes en el DOM
    const modals = document.querySelectorAll('.modal');

    modals.forEach(modal => {
        const modalId = modal.id;
        const relatosDelModal = window.relatosData.filter(r => r.modalId === modalId);

        // Buscar punto de inserción: Después de la sección de videos o al final del contenido
        // Buscamos el contenedor principal del contenido del modal
        const modalContent = modal.querySelector('.modal-content');

        if (!modalContent) return;

        // Crear contenedor de relatos
        const cleanModalId = modalId.replace('Modal', '');
        const relatosContainer = document.createElement('div');
        relatosContainer.className = 'relatos-section-container';
        relatosContainer.style.marginTop = '2.5rem';
        relatosContainer.style.marginBottom = '2rem';

        // Header de la sección
        let htmlContent = `
            <div class="relatos-header" style="text-align: center; margin-bottom: 1.5rem; border-top: 1px dashed #c9a961; padding-top: 2rem;">
                <h3 style="font-family: 'Merriweather', serif; color: var(--primary-color); font-size: 1.5rem;">
                    🗣️ Memoria Viva: Relatos de la Comunidad
                </h3>
                <p style="color: var(--text-light); font-style: italic; font-size: 0.9rem;">
                    Historias y recuerdos compartidos por vecinos de Parral
                </p>
            </div>
            
            <div class="relatos-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
        `;

        if (relatosDelModal.length > 0) {
            // Generar tarjetas para relatos existentes
            relatosDelModal.forEach(relato => {
                htmlContent += createRelatoCard(relato);
            });
        } else {
            // Mensaje si no hay relatos aún
            htmlContent += `
                <div class="empty-relatos" style="grid-column: 1/-1; text-align: center; padding: 2rem; background: rgba(201, 169, 97, 0.1); border-radius: 12px; border: 1px dashed #c9a961;">
                    <p style="color: var(--text-color); margin-bottom: 0.5rem;">Aún no hay historias registradas para esta colección.</p>
                    <p style="font-weight: bold; color: var(--primary-color);">¿Tienes un recuerdo de este lugar?</p>
                </div>
            `;
        }

        // Cerrar grid
        htmlContent += `</div>`;

        // Botón de participación
        htmlContent += `
            <div style="text-align: center; margin-top: 2rem;">
                <button onclick="window.location.href='participa.html?ref=${cleanModalId}'" class="btn-relato" 
                    style="background: transparent; border: 2px solid var(--primary-color); color: var(--primary-color); padding: 0.8rem 1.5rem; border-radius: 30px; font-family: 'Merriweather', serif; cursor: pointer; transition: all 0.3s;">
                    ✍️ Contar mi historia
                </button>
            </div>
        `;

        relatosContainer.innerHTML = htmlContent;

        // Insertar en el modal: Preferiblemente antes del "Contexto Histórico" si existe
        // Buscamos h3 que contenga "Contexto" o similar
        const headings = Array.from(modalContent.querySelectorAll('h3'));
        const contextoHeading = headings.find(h => h.textContent.includes('Contexto') || h.textContent.includes('Historia'));

        if (contextoHeading && contextoHeading.parentElement) {
            // Insertar ANTES del contenedor del contexto (que suele ser un div padre)
            // Asumimos que el h3 está dentro de un div contenedor del contexto
            let targetDiv = contextoHeading.parentElement;

            // Verificacion simple: si el padre es modal-content, entonces el h3 es solido, insertar antes
            if (targetDiv === modalContent) {
                modalContent.insertBefore(relatosContainer, contextoHeading);
            } else {
                // Si está dentro de un div wrapper (común en nuestro diseño)
                modalContent.insertBefore(relatosContainer, targetDiv);
            }
        } else {
            // Si no encuentra contexto, al final
            modalContent.appendChild(relatosContainer);
        }
    });

    // Agregar estilos dinámicos para las tarjetas
    addRelatosStyles();
}

function createRelatoCard(relato) {
    return `
        <div class="relato-card" style="background: #fffdf5; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border-left: 4px solid #c9a961; position: relative;">
            <div class="quote-icon" style="position: absolute; top: 10px; right: 15px; font-size: 3rem; color: rgba(201, 169, 97, 0.2); font-family: serif;">"</div>
            <h4 style="font-family: 'Merriweather', serif; color: var(--primary-color); margin-bottom: 0.5rem; padding-right: 20px;">${relato.titulo}</h4>
            <p style="font-style: italic; color: #555; line-height: 1.6; font-size: 0.95rem; margin-bottom: 1rem;">
                "${relato.texto}"
            </p>
            <div class="relato-footer" style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.8rem;">
                <span style="font-weight: bold; font-size: 0.85rem; color: var(--primary-color);">${relato.autor}</span>
                <span style="font-size: 0.75rem; color: #999;">${relato.categoria}</span>
            </div>
        </div>
    `;
}

function addRelatosStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .relato-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.1) !important;
            transition: all 0.3s ease;
        }
        .btn-relato:hover {
            background: var(--primary-color) !important;
            color: white !important;
        }
    `;
    document.head.appendChild(style);
}
