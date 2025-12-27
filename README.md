# Archivos en Movimiento: Patrimonio Vivo de Parral

Este proyecto es una iniciativa de rescate y puesta en valor del patrimonio cultural e histórico de la comuna de Parral, Chile. A través de una plataforma digital interactiva, buscamos preservar memorias, fotografías y relatos que forman parte de nuestra identidad local.

## 🚀 Características del Proyecto

- **Galería Digital Optimizada**: Visualización de alta performance con imágenes en formato WebP y carga diferida (lazy-loading).
- **Línea de Tiempo Interactiva**: Recorrido histórico por los hitos de la comuna y sus autoridades (Alcaldes).
- **Mapa Patrimonial**: Localización geográfica de edificios públicos, monumentos y sitios de memoria.
- **Recursos Educativos**: Material pedagógico, infografías y láminas para colorear para el fomento de la cultura local.
- **Participación Ciudadana**: Portal para que los parralinos y parralinas compartan sus propias memorias y archivos.

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3 (Vanilla CSS), JavaScript (Vanilla JS).
- **Framework de Estilos**: Tailwind CSS (en secciones específicas como Alcaldes).
- **Motor de Plantillas**: Jekyll (Liquid) para la gestión de componentes reutilizables (headers, footers).
- **Optimización de Activos**: Scripts en Python (Pillow) para la conversión de imágenes y generación de miniaturas.
- **Mapas**: Leaflet.js para la interactividad geográfica.

## 📁 Estructura del Proyecto

- `/_includes/`: Componentes reutilizables de Jekyll (header.html, footer.html).
- `/optimized/`: Imágenes y activos optimizados en formato WebP.
- `/js/`: Lógica de interacción (home.js, Lightbox).
- `/scripts/`: Herramientas de mantenimiento y optimización del proyecto.
- `/style.css`: Estilos globales y específicos del sitio.

## ⚙️ Configuración Local

Para previsualizar el sitio correctamente con todos sus componentes (includes), se requiere un entorno Jekyll:

```bash
bundle exec jekyll serve
```

El sitio estará disponible en `http://localhost:4000`.

## 🤝 Colaboración

Si deseas aportar con material histórico o corregir información, por favor dirígete a la sección [¡Participa!](participa.html) en el sitio web.

---
© 2025 Archivos en Movimiento. Patrimonio de Parral.
