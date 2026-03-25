# Web-ToolBox-OverLay 🛠️

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/Language-Vanilla_JS-yellow.svg)]()
[![No Dependencies](https://img.shields.io/badge/Dependencies-Zero-success.svg)]()

Una alternativa **gratuita, potente y de código abierto** a las herramientas de accesibilidad de pago. Inyecta un menú flotante en cualquier sitio web para mejorar la lectura, el contraste y la navegación. Respetuoso con tu privacidad y sin rastreadores.

[👉 **PÁGINA DE INSTALACIÓN (GitHub Pages)**](https://partybrasil.github.io/Web-ToolBox-OverLay/)

---

## ✨ Características Principales

* 🛡️ **Aislamiento Total (Shadow DOM):** A diferencia de otros scripts, nuestra interfaz inyectada está completamente aislada de la página anfitriona. El CSS del sitio no deformará nuestro menú ni viceversa.
* 💾 **Persistencia Inteligente (API Tampermonkey):** Guarda el tamaño y la posición exacta en pantalla del botón en todas tus sesiones.
* 👁️ **Herramientas Visuales:** Invertir colores, forzar escala de grises, contraste súper alto, ocultar imágenes y medios.
* 📖 **Lectura Mejorada:** Tipografía *OpenDyslexic* bajo demanda, zoom escalonado enfocado a lectura y resaltado exagerado de enlaces.
* ⚡ **Navegación:** Activa un cursor gigante de modo global y bloquea las animaciones o transiciones intrusivas (ideal para cinetosis / mareo digital).
* 🚫 **Cero Dependencias Externa:** Todo está integrado. Cero bibliotecas subidas de NPM, cero WebFonts externas (fuente generada en variables SVG), sin rastreadores y funciona enteramente offline.

---

## 🚀 Instalación y Uso

Necesitas un manejador de scripts de usuario (Userscripts) en tu navegador. 

1. Instala **[Tampermonkey](https://www.tampermonkey.net/)** (Recomendado) o **Violentmonkey**.
2. Dirígete a la [página oficial del proyecto](https://partybrasil.github.io/Web-ToolBox-OverLay/).
3. Haz clic en el botón verde **Instalar Userscript**.
4. ¡Listo! Tampermonkey te pedirá confirmación. Una vez aceptado, abre cualquier página web para ver el botón flotante.

*(Si prefieres no usar la página web, puedes pulsar [AQUÍ](https://raw.githubusercontent.com/partybrasil/Web-ToolBox-OverLay/main/Web-ToolBox-OverLay.user.js) o directamente en el archivo `Web-ToolBox-OverLay.user.js` dentro del repositorio).*

---

## 🔄 Actualizaciones
El script incluye las variables `@updateURL` y `@downloadURL` apuntando a esta rama de GitHub. Tampermonkey revisará periódicamente en busca de actualizaciones para que siempre tengas la última versión disponible (a menos que lo desactives en tu navegador).

---

## 🛠️ Contribuir

¡Se aceptan pull requests! Como regla estricta:
1. **NO usar NPM ni herramientas de empaquetado (webpack, vite, etc).**
2. **NO dependencias externas (CDNs, Google Fonts, etc).**
3. Cualquier componente visual DEBE permanecer dentro del `attachShadow` del Javascript.

---

## 📜 Licencia

Distribuido bajo la **[Licencia MIT](LICENSE)**. 

Diseñado y desarrollado con ❤️ por **Miguel Diaz (Party)** para toda la comunidad.