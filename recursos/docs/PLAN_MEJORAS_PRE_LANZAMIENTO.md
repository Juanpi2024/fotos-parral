# Plan de Mejoras Técnicas: Pre-Lanzamiento
>
> Este documento consolida las oportunidades de mejora detectadas en la fase de análisis con Context7.

## 1. Posicionamiento y Visibilidad (SEO Avanzado) 🚀

**Hallazgo**: Capacidad de usar `schema-markup` detectada vía Context7.

* [ ] **Implementar Datos Estructurados (JSON-LD)**
  * **Dónde**: En `galeria.html` y páginas de detalles (ej. `detalle-plaza.html`).
  * **Detalle**: Agregar etiquetas invisibles que digan *"Esto es una Fotografía Histórica de 1920"*.
  * **Impacto**: Aparecer en los cuadros destacados de Google (Rich Snippets).

* [ ] **Optimización de Metadatos Sociales**
  * **Dónde**: Global (todas las páginas).
  * **Detalle**: Asegurar que al compartir en WhatsApp/Facebook aparezca la foto correcta y el título "Archivos en Movimiento".

## 2. Accesibilidad y Diseño (Enfoque Senior) 👁️

**Hallazgo**: Necesidad de auditoría estricta WCAG detectada vía Context7 (`web-design-guidelines`).

* [ ] **Auditoría de Contraste**
  * **Dónde**: Textos sobre fondos oscuros o imágenes.
  * **Detalle**: Verificar que el "gold" sobre "negro" tenga suficiente contraste para lectura fácil.

* [ ] **Navegación por Teclado**
  * **Dónde**: Menú principal y Modales de galería.
  * **Detalle**: Asegurar que se pueda "Tabular" por las fotos sin usar mouse (vital para accesibilidad).

## 3. Rendimiento y Carga ⚡

**Hallazgo**: Oportunidades de optimización de media (Remotion skills).

* [ ] **Lazy Loading de Videos**
  * **Dónde**: `sobre.html`.
  * **Detalle**: Configurar los iframes de YouTube para que no frenen la carga inicial de la página (`loading="lazy"`).
  * **Estado**: *Parcialmente implementado, requiere revisión.*

* [ ] **Optimización de Imágenes**
  * **Dónde**: Galería.
  * **Detalle**: Confirmar que todas las imágenes *thumbnail* pesen menos de 100kb.

---
**Próximo Paso Recomendado**: Comenzar con la implementación del **Punto 3 (Lazy Loading)** ya que es rápido y mejora la velocidad inmediata de la página `sobre.html` recién editada.
