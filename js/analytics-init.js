/**
 * Google Analytics 4 (GA4) - Script de Inicialización
 * ---------------------------------------------------
 * INSTRUCCIONES:
 * 1. Crea una propiedad en Google Analytics (analytics.google.com)
 * 2. Obtén tu "ID de Medición" (Empieza con 'G-')
 * 3. Reemplaza 'G-TU-CODIGO-AQUI' por tu ID real abajo.
 */

(function () {
    // === CONFIGURACIÓN ===
    // REEMPLAZAR ESTE TEXTO CON TU ID REAL DE GOOGLE ANALYTICS
    const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
    // ======================

    if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
        console.warn('Google Analytics: ID de medición no configurado. Edita js/analytics-init.js');
        return;
    }

    // Cargar librería gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Configurar dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', GA_MEASUREMENT_ID, {
        'page_title': document.title,
        'page_path': window.location.pathname
    });

    console.log(`Google Analytics (${GA_MEASUREMENT_ID}) inicializado correctamente.`);
})();
