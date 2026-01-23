/**
 * OBSERVATORIO DE INTELIGENCIA LEGISLATIVA & SOCIAL (MVP)
 * Arquitectura: Zero-Cost Serverless
 * Motor: Gemini 1.5 Flash
 */

const CONFIG = {
  GEMINI_API_KEY: 'TU_API_KEY_AQUI',
  SHEET_ID: SpreadsheetApp.getActiveSpreadsheet().getId(),
  CAMARA_API_URL: 'https://opendatacamara.cl/wscamaradiputados.asmx/getVotacionesArticulo',
  JSON_SEARCH_API_KEY: 'TU_SEARCH_API_KEY_AQUI',
  CX: 'TU_CX_ID_AQUI' // Google Custom Search Engine ID
};

/**
 * Función Principal para Ejecutar el Ciclo de Rastreo e IA
 */
function runCivicWatchdog() {
  Logger.log('Iniciando ciclo de vigilancia...');
  
  // 1. Obtener perfiles de la hoja de configuración
  const targets = getTrackingTargets();
  
  targets.forEach(target => {
    // 2. Buscar Votos Recientes
    const votes = fetchLegislativeData(target.id_diputado);
    
    // 3. Buscar Actividad Social (Google Search API Bypass)
    const mentions = fetchSocialListening(target.nombre);
    
    // 4. Procesar Inteligencia con Gemini
    const insights = analyzeWithGemini(target.nombre, votes, mentions);
    
    // 5. Almacenar resultados
    storeInsights(target.nombre, insights);
  });
  
  Logger.log('Ciclo completado con éxito.');
}

/**
 * Conexión a la API de la Cámara de Diputados
 */
function fetchLegislativeData(diputadoId) {
  try {
    const url = `${CONFIG.CAMARA_API_URL}?idDiputado=${diputadoId}`;
    const response = UrlFetchApp.fetch(url);
    const xml = response.getContentText();
    return xml.substring(0, 1000); // Truncado para el ejemplo de MVP
  } catch (e) {
    Logger.log('Error en API Cámara: ' + e);
    return null;
  }
}

/**
 * Social Listening vía Google Custom Search JSON API
 */
function fetchSocialListening(query) {
  const url = `https://www.googleapis.com/customsearch/v1?key=${CONFIG.JSON_SEARCH_API_KEY}&cx=${CONFIG.CX}&q=${encodeURIComponent(query)}`;
  try {
    const response = UrlFetchApp.fetch(url);
    const data = JSON.parse(response.getContentText());
    return data.items ? data.items.map(item => item.snippet).join('\n') : "";
  } catch (e) {
    Logger.log('Error en Social Listening: ' + e);
    return "";
  }
}

/**
 * Integración con Gemini 1.5 Flash
 */
function analyzeWithGemini(nombre, votes, social) {
  const prompt = `Actúa como un analista político senior. Analiza la consistencia entre los votos legislativos y el sentimiento social para: ${nombre}.
  VOTOS: ${votes}
  OPINIÓN/PRENSA: ${social}
  
  Responde ÚNICAMENTE en JSON estructurado con:
  {
    "sentimiento": "positivo|negativo|neutral",
    "nivel_alerta": 1-10,
    "resumen": "string",
    "contradicciones_detectadas": ["string"]
  }`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { response_mime_type: "application/json" }
  };

  const options = {
    method: 'POST',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  };

  try {
    const response = UrlFetchApp.fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${CONFIG.GEMINI_API_KEY}`, options);
    const result = JSON.parse(response.getContentText());
    return JSON.parse(result.candidates[0].content.parts[0].text);
  } catch (e) {
    Logger.log('Error en Gemini: ' + e);
    return { error: e.toString() };
  }
}

function getTrackingTargets() {
  // Simulación: En un entorno real, lee la hoja 'Config'
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Config');
    const data = sheet.getDataRange().getValues();
    data.shift(); // Cabecera
    return data.map(row => ({ nombre: row[0], id_diputado: row[1] }));
  } catch (e) {
    return [{ nombre: 'Diputado Ejemplo', id_diputado: '123' }];
  }
}

function storeInsights(nombre, insights) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Analisis_IA');
    sheet.appendRow([
      new Date(),
      nombre,
      insights.sentimiento,
      insights.nivel_alerta,
      insights.resumen,
      JSON.stringify(insights.contradicciones_detectadas)
    ]);
  } catch (e) {
    Logger.log('Error al guardar insights: ' + e);
  }
}
