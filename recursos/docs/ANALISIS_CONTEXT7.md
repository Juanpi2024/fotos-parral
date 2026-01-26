# Análisis de Capacidades: Context7

Este documento explica qué es exactamente **Context7**, qué hemos instalado y cómo podemos (y no podemos) utilizarlo para el proyecto "Archivos en Movimiento".

## 1. ¿Qué es Context7?

**Context7** es una herramienta diseñada para conectar Inteligencias Artificiales (como yo) con **documentación técnica actualizada en tiempo real**.

El problema que resuelve es que las IA a veces tienen "conocimiento antiguo". Por ejemplo, si sale una nueva versión de una librería hoy, yo podría no saberlo. Context7 me permite consultar esa información al instante.

### ¿Qué hace? ✅

* 🔍 **Busca documentación técnica**: Si le pido "cómo usar la última versión de Remotion", busca la guía oficial más reciente.
* 💾 **Evita "alucinaciones"**: Ayuda a que yo no invente comandos que ya no existen.
* ⚡ **Mejora el código**: Me da ejemplos de código actualizados para escribir mejores programas para ti.

### ¿Qué NO hace? ❌

* 📉 **No analiza tu página web**: No es una herramienta de SEO (como Google Analytics) ni de rendimiento (como Lighthouse). No "mira" tu página `sobre.html` para decirte si está lenta o si tiene errores de diseño.
* 🐛 **No busca errores en tu servidor**: No entra a tu hosting a ver logs.

## 2. ¿Cómo beneficia a "Archivos en Movimiento"?

Aunque no hace un análisis visual de tu página, es muy útil para **construirla mejor**.

### Casos de Uso Reales para tu Proyecto

#### A. Mejorar los Videos (Remotion)

Como usamos **Remotion** para los videos, si queremos usar funciones avanzadas (como audio reactivo o transiciones 3D), puedo usar Context7 para buscar la documentación exacta y escribir el código sin errores.
> *Ejemplo: "Quiero hacer un efecto de partículas en el video. Usa Context7 para buscar cómo se hace en Remotion v4."*

#### B. Accesibilidad (Text-to-Speech)

Si decidimos mejorar el sistema de lectura de voz, puedo usar Context7 para buscar las últimas novedades de las API de voz del navegador o librerías nuevas que salgan al mercado.

#### C. Optimización de Imágenes

Si queremos implementar un sistema más moderno de carga de imágenes, puedo consultar las mejores prácticas actuales de HTML5 y Javascript usando esta herramienta.

## 3. Hallazgos Recientes (Búsqueda en Vivo) 🔍

Acabo de realizar una exploración de la base de datos de Context7 y encontré herramientas ("skills") perfectas para tu proyecto:

### 🚀 Para SEO (Posicionamiento)

Encontré la skill **`schema-markup`**.

* **¿Para qué sirve?**: Permite agregar "etiquetas invisibles" que dicen a Google: *"Esto es una Foto Histórica de 1920"*.
* **Impacto**: Ayuda a que tus fotos salgan mejor posicionadas en Google Images y búsquedas locales.

### 🎨 Para Diseño y Accesibilidad

Encontré la skill **`web-design-guidelines`**.

* **¿Para qué sirve?**: Audita el código para asegurar que los colores, contrastes y tamaños de letra sean legibles para todos (especialmente adultos mayores).
* **Impacto**: Garantiza que "Archivos en Movimiento" sea 100% amigable con tu público objetivo senior.

## 4. Resumen

| Pregunta | Respuesta |
| :--- | :--- |
| **¿Puede analizar mi página `sobre.html`?** | **No directamente.** No ve tu página como un usuario. |
| **¿Puede ayudarme a *mejorar* el código de `sobre.html`?** | **Sí, muchísimo.** Busca las técnicas más modernas para aplicarlas. |
| **¿Necesito configurarlo más?** | Ya está instalado. Yo lo usaré internamente cuando necesite buscar documentación técnica compleja. |

---
**Conclusión:** Context7 es un "superpoder de investigación" para mí, tu programador. Me hace más inteligente y preciso al escribir código para ti, pero no es un auditor de páginas web.
