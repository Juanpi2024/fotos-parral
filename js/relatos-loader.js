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
                <p style="color: #4a3b32; font-style: italic; font-size: 0.95rem; font-weight: 500;">
                    (Maqueta de ejemplo para futuras Mateadas Patrimoniales)
                </p>
                <p style="color: #666; font-size: 0.8rem; margin-top: 0.5rem; max-width: 500px; margin-left: auto; margin-right: auto;">
                    Los testimonios presentados son demostrativos para ilustrar el sistema de memoria oral.
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
                <div class="empty-relatos" style="grid-column: 1/-1; text-align: center; padding: 2rem; background: rgba(201, 169, 97, 0.15); border-radius: 12px; border: 1px dashed #c9a961;">
                    <p style="color: #3a3a3a; margin-bottom: 0.5rem; font-size: 1rem;">Aún no hay historias registradas para esta colección.</p>
                    <p style="font-weight: bold; color: #1a1a1a; font-size: 1.05rem;">¿Tienes un recuerdo de este lugar?</p>
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
    // Initial letter for avatar
    const authorInitial = relato.autor ? relato.autor.charAt(0) : '?';

    return `
        <div class="relato-card" style="background: #fff; padding: 1.5rem; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.08); display: flex; flex-direction: column;">
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid #f0f0f0; padding-bottom: 0.5rem;">
                <span style="font-family: 'Lato', sans-serif; font-size: 0.75rem; color: #6b5a50; text-transform: uppercase; font-weight: 600;">${relato.formattedDate || relato.fecha}</span>
                <span style="font-size: 0.7rem; padding: 0.2rem 0.6rem; border-radius: 20px; background: #fcfbf8; color: #c9a961; border: 1px solid rgba(201, 169, 97, 0.3); font-weight: bold;">
                    ${relato.emotion || 'Relato'}
                </span>
            </div>

            <h4 style="font-family: 'Merriweather', serif; color: #1a1a1a; margin: 0 0 0.8rem 0; font-size: 1.2rem; line-height: 1.3;">${relato.titulo}</h4>
            
            <p style="font-style: normal; font-family: 'Merriweather', serif; color: #3a3a3a; line-height: 1.7; font-size: 0.95rem; margin-bottom: 1.5rem; flex-grow: 1;">
                "${relato.texto}"
            </p>
            
            <div style="margin-top: auto; display: flex; align-items: center; justify-content: space-between; padding-top: 1rem; border-top: 1px dotted #e0e0e0;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 32px; height: 32px; background: #f0f0f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #c9a961; font-weight: bold; font-size: 0.9rem;">
                        ${authorInitial}
                    </div>
                    <div style="display: flex; flex-direction: column;">
                         <span style="font-weight: bold; font-size: 0.8rem; color: #333;">${relato.autor.split(',')[0]}</span>
                    </div>
                </div>

                <button onclick="event.stopPropagation(); window.RelatoPlayer.toggle(this.closest('.relato-card').querySelector('p').textContent, this)" 
                        style="background: #fff; border: 1px solid #ddd; color: #555; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: all 0.2s;"
                        title="Escuchar relato">
                    🔊
                </button>
            </div>
        </div>
    `;
}

function addRelatosStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .relato-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 25px rgba(0,0,0,0.08) !important;
            border-color: rgba(201, 169, 97, 0.4) !important;
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}
