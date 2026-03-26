# Web-ToolBox-OverLay 🛠️

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/Language-Vanilla_JS-yellow.svg)]()
[![No Dependencies](https://img.shields.io/badge/Dependencies-Zero-success.svg)]()

Una potente suite de accesibilidad web, **gratuita y de código abierto**, que inyecta un menú flotante en cualquier sitio. Mejora drásticamente la lectura, la percepción visual y la navegación adaptándose a las necesidades de cada usuario. Respetuoso con tu privacidad: cero rastreadores, cero telemetría.

[👉 **PÁGINA DE INSTALACIÓN (GitHub Pages)**](https://partybrasil.github.io/Web-ToolBox-OverLay/)

---

## ✨ Características Principales

* 🛡️ **Aislamiento Total (Shadow DOM):** Nuestra interfaz inyectada está completamente aislada de la página anfitriona. El CSS del sitio visitado jamás deformará nuestro menú, ni nuestro estilo afectará al diseño original a menos que tú lo decidas.
* 💾 **Persistencia Inteligente (API Tampermonkey):** Guarda tus configuraciones, el tamaño y la posición exacta del botón en la pantalla para todas tus sesiones futuras.
* 🚫 **Cero Dependencias Externas:** El código viene completo. No usa bibliotecas de NPM, no llama a CDNs externas ni usa WebFonts externas (iconos generados en SVG inline), funcionando de maravilla incuso en entornos offline o con bloqueo estricto.

---

## 🧰 Funciones Integradas del Menú

### ⚡ Perfiles Rápidos de Accesibilidad
Activa un conjunto de configuraciones con un solo clic:
* **👁️ Baja Visión:** Aumenta severamente el texto y aplica alto contraste global.
* **🧠 Cognitivo:** Activa fuentes amigables con la dislexia, mejora el espaciado de las líneas y resalta fuertemente los títulos.
* **⌨️ Teclado:** Exagera visualmente la posición del foco actual en toda la web para simplificar la navegación con la tecla 'Tab'.
* **🛑 Sin Movimiento:** Detiene en seco todas las animaciones, videos auto-reproducibles y transiciones suaves (útil para cinetosis/mareo).

### 👁️ Herramientas Visuales
* **Invertir Colores y Grises:** Cambia el espectro cromático entre colores invertidos o un tono monocromático pacífico.
* **Contraste Súper Alto:** Transforma forzosamente fondos a negro profundo y textos/líneas a blanco brillante.
* **Ocultar Medios:** Elimina fotografías, canvas y videos al instante para enfocar la mente puramente en el texto.

### 📖 Lectura Avanzada
* **Tamaño, Altura y Espaciado:** Tres barras deslizantes te permiten configurar el tamaño (Zoom) del texto, la altura entre líneas independientes y la separación entre cada letra.
* **Tipografía Dislexia:** Fuerza el uso de Comic Sans u OpenDyslexic en todo el texto, mejorando la legibilidad para las personas con este trastorno.
* **Resaltados Específicos:** Delinea masivamente con colores llamativos todos los **🔗 Enlaces** y todos los **🧷 Títulos/Encabezados** que haya en el documento.
* **Guía Horizontal:** Muestra una línea horizontal suave bajo el puntero del ratón que ayuda a los ojos a no saltarse líneas durante lecturas largas.

### 🧭 Navegación y Enfoque
* **Multi-Cursor:** Agranda exageradamente el puntero del ratón a tamaño **XL** o **XXL**.
* **Enlaces de Salto (Skip Links):** Genera en la esquina superior una fila de botones accesibles que te permiten saltar la navegación repetitiva y caer directo en el núcleo del contenido o al pie de página.
* **Foco Fuerte:** Fuerza a que el 'outline' naranja estándar se vuelva grueso y super visible al navegar con teclado.

### 🗣️ Audio Text-To-Speech (TTS)
Convierte texto a voz directamente dentro del navegador, sin pasar por servidores en la nube.
* **Leer Selección:** Sombrea un párrafo y el script lo leerá en voz alta.
* **Leer Página:** Analiza rápidamente la estructura del texto principal visible, y comienza a pronunciar párrafo a párrafo de forma automática.
* **Controles y Velocidad:** Pausa, deten la lectura o altera la velocidad del habla hasta al doble de velocidad. 

### ⚙️ Administración de Ajustes Avanzados
* **Internacionalización:** Cambia entre diseño del panel en **Español (ES)** y **English (EN)** instantáneamente.
* **Reset Granular:** Tienes un botón para devolver a estado de fábrica solo la sección visual, otro para la sección de lectura... o un Reset total de fábrica.
* **Exportar / Importar:** Toma toda tu configuración personal (colores, espaciado, posición del menú, etc.) y expórtala en un archivo JSON local. Puedes llevártelo a otra máquina e importarlo.

---

## 🧪 X-Ray Matrix Mode (Auditoría Avanzada)

A diferencia de otras herramientas, este Overlay incorpora una **Suite X-Ray**. Se trata de un módulo avanzado diseñado para auditar y depurar páginas visualmente. Opera de forma translúcida con estética "Matrix". 

### Modos de Inspección Visual
1. **🧪 Dirigido:** Sigue el puntero y muestra datos en tiempo real de la "caja" bajo el foco. (Tipo de tag, Atributos, Profundidad del DOM y Advertencias locales de Accesibilidad).
2. **🟩 Full-Scan:** Colorea inmediatamente miles de nodos simultáneos para entender cómo de sucia o estructurada está armada una web bajo sus estilos.
3. **Modos Detallados:** Al escanear bajo el ratón, escoge el enfoque:
   * Estructura: Jerarquía y conteo de hijos del nodo.
   * Fuente: Recibe un fragmento (\outerHTML\) seguro en pantalla.
   * Scripts: Diagnostica rápidamente si la web está abusando de iframes, cuandos scripts in-line lanza, etc.

### Auditoría Analítica y WCAG
* **🚨 Auditoría A11y (Linter Nativo):** Toca un botón y el overlay revelará en la pantalla contornos **rojos brillantes (Errores críticos)** o **amarillos (Advertencias)** sobre elementos mal programados como: imágenes sin atributo 'alt', botones vacíos flotantes, campos de formulario que perdieron su label o el uso incorrecto de atributos de enfoque.
* **🎯 Listener-Map:** Colorea exclusivamente aquellos botones, partes de la pantalla o capas ocultas que escondan comandos como  onclick, etc., útil para prevenir trampas de click o estudiar reactividad.
* **♨️ Heatmap:** Da tonalidades radioactivas al esqueleto web basados en su "peso": cuantos más nodos hijos anidados existan, más brillante y oscuro se revelará esa zona.
* **💾 Exportar JSON:** Mueve estas métricas (total de errores de accesibilidad, cantidad de scripts externos, nodos de formulario presentes y lista superior de etiquetas más usadas en el documento) hacia un reporte local en un archivo JSON para tu base de datos de auditor.

---

## 🚀 Instalación y Uso

Necesitas un manejador de scripts de usuario (Userscripts) en tu navegador. 

1. Instala **[Tampermonkey](https://www.tampermonkey.net/)** (Recomendado) o **Violentmonkey**.
2. Dirígete a la [página oficial del proyecto](https://partybrasil.github.io/Web-ToolBox-OverLay/).
3. Haz clic en el botón verde **Instalar Userscript**.
4. ¡Listo! Tampermonkey te pedirá confirmación. Una vez aceptado, abre cualquier página web para ver el botón flotante.

*(Si prefieres no usar la página web, puedes pulsar [AQUÍ](https://raw.githubusercontent.com/partybrasil/Web-ToolBox-OverLay/master/Web-ToolBox-OverLay.user.js) o directamente en el archivo Web-ToolBox-OverLay.user.js dentro del repositorio).*

---

## 🔄 Actualizaciones
El script incluye variables de entorno automáticas (@updateURL y @downloadURL). Tampermonkey revisará periódicamente en tu navegador en busca de mejoras silentes para que siempre goces de la versión más pulida y optimizada.

---

## 🛠️ Contribuir

¡Se aceptan pull requests! Como regla estricta y filosofía para no sacrificar el espíritu del software:
1. **NO usar NPM ni herramientas de empaquetado (webpack, vite, rollup, etc).** Solo Vanilla JS.
2. **NO dependencias externas (CDNs, Google Fonts, etc).**
3. Cualquier componente visual agregado DEBE incrustarse a salvo dentro del ttachShadow del Javascript nativo.

---

## 📜 Licencia

Distribuido bajo la **[Licencia MIT](LICENSE)**. 

Diseñado y desarrollado con ❤️ por **Miguel Diaz (Party)** para toda la comunidad.
