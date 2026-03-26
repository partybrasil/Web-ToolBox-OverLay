// ==UserScript==
// @name         Web-ToolBox-OverLay
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Herramienta de accesibilidad total premium, gratuita, personalizable y de código abierto. Menú flotante asilado mediante Shadow DOM.
// @author       Miguel Diaz (Party)
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @updateURL    https://raw.githubusercontent.com/partybrasil/Web-ToolBox-OverLay/master/Web-ToolBox-OverLay.user.js
// @downloadURL  https://raw.githubusercontent.com/partybrasil/Web-ToolBox-OverLay/master/Web-ToolBox-OverLay.user.js
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    const injectGlobalStyles = () => {
        if (document.getElementById('wtb-global-styles')) return;
        const style = document.createElement('style');
        style.id = 'wtb-global-styles';
        style.textContent = `
            .wtb-font-dyslexic * { font-family: 'Comic Sans MS', 'Trebuchet MS', sans-serif !important; letter-spacing: 0.1em !important; line-height: 1.5 !important; }
            .wtb-high-contrast * { background-color: #000 !important; color: #fff !important; border-color: #fff !important; }
            .wtb-highlight-links a { outline: 4px solid #ffeb3b !important; background: #000 !important; color: #fff !important; text-decoration: underline !important; font-weight: bold !important; padding: 2px !important; }
            .wtb-big-cursor { cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path d="M7 2l12 11.2l-5.8 1l3.3 5.8l-2.2 1.3l-3.3-5.8l-4 3.5V2z" fill="black" stroke="white" stroke-width="1"/></svg>'), auto !important; }
            .wtb-cursor-xl { cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24"><path d="M7 2l12 11.2l-5.8 1l3.3 5.8l-2.2 1.3l-3.3-5.8l-4 3.5V2z" fill="black" stroke="white" stroke-width="1"/></svg>'), auto !important; }
            .wtb-cursor-xxl { cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"><path d="M7 2l12 11.2l-5.8 1l3.3 5.8l-2.2 1.3l-3.3-5.8l-4 3.5V2z" fill="black" stroke="white" stroke-width="1"/></svg>'), auto !important; }
            .wtb-big-cursor * { cursor: inherit !important; }
            .wtb-cursor-xl *, .wtb-cursor-xxl * { cursor: inherit !important; }
            .wtb-hide-images img, .wtb-hide-images video, .wtb-hide-images svg, .wtb-hide-images picture { visibility: hidden !important; opacity: 0 !important; }
            .wtb-stop-animations * { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
            .wtb-focus-highlight *:focus, .wtb-focus-highlight *:focus-visible { outline: 4px solid #ff9800 !important; outline-offset: 2px !important; }
            .wtb-reading-mask * { opacity: 0.35 !important; }
            .wtb-reading-mask [data-wtb-reading-active="1"], .wtb-reading-mask [data-wtb-reading-active="1"] * { opacity: 1 !important; }
            .wtb-reading-guide { position: fixed; left: 0; width: 100vw; height: 54px; background: rgba(255, 235, 59, 0.2); border-top: 1px solid rgba(255, 193, 7, 0.9); border-bottom: 1px solid rgba(255, 193, 7, 0.9); pointer-events: none; z-index: 2147483645; display: none; }
            .wtb-reading-guide.show { display: block; }
            .wtb-highlight-headings h1, .wtb-highlight-headings h2, .wtb-highlight-headings h3, .wtb-highlight-headings h4, .wtb-highlight-headings h5, .wtb-highlight-headings h6 { background: #1a1a1a !important; color: #ffeb3b !important; outline: 2px dashed #ffeb3b !important; }
            .wtb-xray-full { background-color: rgba(0, 24, 0, 0.08) !important; }
            .wtb-xray-full * { outline: 1px solid rgba(57, 255, 20, 0.45) !important; outline-offset: -1px !important; }
            .wtb-xray-full img, .wtb-xray-full video, .wtb-xray-full canvas, .wtb-xray-full svg { filter: grayscale(100%) sepia(60%) hue-rotate(50deg) saturate(180%) brightness(1.05) !important; }
            .wtb-xray-full.wtb-xray-filter-interactive *,
            .wtb-xray-full.wtb-xray-filter-forms *,
            .wtb-xray-full.wtb-xray-filter-media * { outline-color: transparent !important; }
            .wtb-xray-full.wtb-xray-filter-interactive a,
            .wtb-xray-full.wtb-xray-filter-interactive button,
            .wtb-xray-full.wtb-xray-filter-interactive input,
            .wtb-xray-full.wtb-xray-filter-interactive select,
            .wtb-xray-full.wtb-xray-filter-interactive textarea,
            .wtb-xray-full.wtb-xray-filter-interactive summary,
            .wtb-xray-full.wtb-xray-filter-interactive [role="button"],
            .wtb-xray-full.wtb-xray-filter-interactive [onclick],
            .wtb-xray-full.wtb-xray-filter-interactive [tabindex] { outline: 2px solid rgba(57, 255, 20, 0.95) !important; background-color: rgba(57, 255, 20, 0.07) !important; }
            .wtb-xray-full.wtb-xray-filter-forms form,
            .wtb-xray-full.wtb-xray-filter-forms input,
            .wtb-xray-full.wtb-xray-filter-forms select,
            .wtb-xray-full.wtb-xray-filter-forms textarea,
            .wtb-xray-full.wtb-xray-filter-forms fieldset,
            .wtb-xray-full.wtb-xray-filter-forms label,
            .wtb-xray-full.wtb-xray-filter-forms button { outline: 2px solid rgba(57, 255, 20, 0.95) !important; background-color: rgba(57, 255, 20, 0.07) !important; }
            .wtb-xray-full.wtb-xray-filter-media img,
            .wtb-xray-full.wtb-xray-filter-media video,
            .wtb-xray-full.wtb-xray-filter-media audio,
            .wtb-xray-full.wtb-xray-filter-media canvas,
            .wtb-xray-full.wtb-xray-filter-media svg,
            .wtb-xray-full.wtb-xray-filter-media picture,
            .wtb-xray-full.wtb-xray-filter-media iframe { outline: 2px solid rgba(57, 255, 20, 0.95) !important; background-color: rgba(57, 255, 20, 0.07) !important; }
            .wtb-xray-heatmap [data-wtb-xray-heat="1"] { outline: 2px solid var(--wtb-xray-heat, rgba(57, 255, 20, 0.9)) !important; background-color: var(--wtb-xray-fill, rgba(57, 255, 20, 0.08)) !important; }
            .wtb-xray-listener-map [data-wtb-xray-listener="1"] { outline: 2px dashed rgba(0, 255, 157, 0.95) !important; background-color: rgba(0, 255, 157, 0.08) !important; }
            .wtb-xray-a11y-map [data-wtb-a11y-error="true"] { outline: 3px solid #ff3b30 !important; outline-offset: 2px !important; background-color: rgba(255, 59, 48, 0.15) !important; }
            .wtb-xray-a11y-map [data-wtb-a11y-warn="true"] { outline: 3px solid #ffcc00 !important; outline-offset: 2px !important; background-color: rgba(255, 204, 0, 0.15) !important; }
        `;
        document.documentElement.appendChild(style);
    };

    const init = () => {
        const host = document.createElement('div');
        host.id = 'web-toolbox-root';
        document.body.appendChild(host);
        const shadow = host.attachShadow({mode: 'open'});

        const style = document.createElement('style');
        style.textContent = `
            :host { --primary: #2196F3; --bg: #ffffff; position: fixed; z-index: 2147483647; font-family: system-ui, sans-serif; }
            #floating-icon { width: ${GM_getValue('iconSize', 48)}px; height: ${GM_getValue('iconSize', 48)}px; background: var(--primary); border-radius: 50%; cursor: move; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.4); user-select: none; touch-action: none; transition: transform 0.2s; }
            #floating-icon:hover { transform: scale(1.05); }
            #floating-icon svg { width: 60%; height: 60%; pointer-events: none; }
            
            #main-panel { display: none; position: absolute; bottom: calc(${GM_getValue('iconSize', 48)}px + 10px); right: 0; width: 320px; max-height: 80vh; background: var(--bg); border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.4); padding: 20px; overflow-y: auto; color: #333; }
            #xray-workbench { display: none; position: fixed; right: 16px; bottom: 16px; width: min(420px, calc(100vw - 20px)); max-height: min(86vh, 760px); border-radius: 16px; border: 1px solid rgba(57, 255, 20, 0.45); background: linear-gradient(180deg, rgba(4, 20, 8, 0.96), rgba(7, 30, 12, 0.95)); box-shadow: 0 0 0 1px rgba(25, 92, 38, 0.6), 0 14px 44px rgba(0, 0, 0, 0.6), 0 0 34px rgba(32, 170, 66, 0.32); padding: 14px; overflow-y: auto; color: #c9ffd4; z-index: 2147483647; }
            #xray-workbench.show { animation: xrayWorkbenchIn 0.25s ease-out; }
            #xray-workbench .header h3 { color: #b8ffb8; }
            #xray-workbench .section-title { color: #8acf98; border-bottom-color: rgba(57, 255, 20, 0.22); }
            #xray-workbench .btn { background: rgba(20, 40, 24, 0.8); border-color: rgba(57, 255, 20, 0.24); color: #b7ffd0; }
            #xray-workbench .btn:hover { background: rgba(26, 58, 33, 0.95); border-color: rgba(57, 255, 20, 0.55); }
            #xray-workbench .btn.active { background: rgba(28, 134, 58, 0.82); border-color: rgba(77, 255, 77, 0.95); color: #fff; }
            .xray-launch-btn { width: 100%; margin-bottom: 18px; background: linear-gradient(135deg, #0f6525, #1fa44a); color: #f4fff7; border: 1px solid #1cd05b; box-shadow: 0 0 12px rgba(35, 175, 75, 0.35); }
            .xray-launch-btn:hover { transform: translateY(-1px) scale(1.01); }
            .xray-header-actions { display: flex; gap: 8px; align-items: center; }
            .xray-nav-btn { border: 1px solid rgba(57, 255, 20, 0.5); background: rgba(15, 35, 18, 0.92); color: #9cffad; border-radius: 8px; font-size: 12px; padding: 6px 8px; cursor: pointer; }
            .xray-nav-btn:hover { background: rgba(24, 52, 30, 0.96); }

            @keyframes xrayWorkbenchIn {
                from { opacity: 0; transform: translateY(10px) scale(0.985); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
            
            /* Scrollbar styling for panel */
            #main-panel::-webkit-scrollbar { width: 8px; }
            #main-panel::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 8px; }
            #main-panel::-webkit-scrollbar-thumb { background: #ccc; border-radius: 8px; }
            #main-panel::-webkit-scrollbar-thumb:hover { background: #999; }

            .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
            h3 { margin: 0; font-size: 18px; color: #222; }
            
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
            .section-title { font-size: 12px; text-transform: uppercase; color: #777; margin: 0 0 10px; font-weight: bold; border-bottom: 1px solid #eaeaea; padding-bottom: 5px; }
            
            .btn { background: #f8f9fa; border: 1px solid #dadce0; padding: 10px; border-radius: 10px; cursor: pointer; font-size: 13px; font-weight: 500; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; gap: 8px; color: #444; user-select: none; }
            .btn:hover { background: #f1f3f4; border-color: #adb5bd; }
            .btn.active { background: var(--primary); color: white; border-color: #1976D2; box-shadow: 0 2px 6px rgba(33, 150, 243, 0.3); }
            
            .slider-group { background: #f8f9fa; padding: 12px; border-radius: 10px; margin-bottom: 20px; border: 1px solid #dadce0; }
            label { font-size: 13px; font-weight: 500; display: flex; justify-content: space-between; margin-bottom: 8px; color: #555; }
            input[type="range"] { width: 100%; cursor: pointer; accent-color: var(--primary); }
            
            .close-btn { cursor: pointer; font-size: 24px; line-height: 1; border: none; background: transparent; color: #888; transition: color 0.2s; }
            .close-btn:hover { color: #f44336; }
            
            .reset-btn { width: 100%; background: #ffeb3b; border: 1px solid #fbc02d; color: #3e2723; font-weight: bold; padding: 12px; border-radius: 10px; font-size: 14px; cursor: pointer; transition: 0.2s; }
            .reset-btn:hover { background: #fbc02d; }

            #xray-lens { position: fixed; pointer-events: none; z-index: 2147483646; display: none; border: 2px solid rgba(57, 255, 20, 0.95); border-radius: 6px; box-shadow: 0 0 0 1px rgba(12, 28, 12, 0.9), 0 0 16px rgba(57, 255, 20, 0.55), inset 0 0 24px rgba(12, 68, 12, 0.32); background: linear-gradient(135deg, rgba(57, 255, 20, 0.08), rgba(0, 255, 160, 0.06)); }
            #xray-label { position: fixed; pointer-events: none; z-index: 2147483646; display: none; padding: 4px 8px; border-radius: 6px; border: 1px solid rgba(57, 255, 20, 0.8); background: rgba(3, 18, 3, 0.94); color: #95ff95; font-size: 12px; font-weight: 700; max-width: min(70vw, 420px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
            .xray-panel-info { background: #071307; color: #83ff9d; border: 1px solid #1d6a2b; border-radius: 10px; font-size: 12px; line-height: 1.4; padding: 10px; margin-bottom: 20px; min-height: 58px; }
            .xray-panel-info strong { color: #b5ffb5; }
            .xray-subtitle { font-size: 11px; color: #4f8e5c; text-transform: uppercase; margin: -8px 0 8px; font-weight: 700; }
            .xray-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 12px; }
            .xray-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 12px; }
            .xray-mini { font-size: 11px; padding: 8px 6px; }
            code { display: inline-block; margin-top: 6px; font-size: 11px; color: #8effaf; white-space: pre-wrap; word-break: break-word; }
            
            
            #secret-panel { display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: min(500px, 90vw); max-height: 80vh; background: #111; color: #0f0; font-family: monospace; border: 2px solid #0f0; border-radius: 12px; box-shadow: 0 0 30px rgba(0,255,0,0.4); padding: 20px; z-index: 2147483647; overflow-y: auto; }
            #secret-panel h2 { color: #fff; text-transform: uppercase; margin-top: 0; text-align: center; border-bottom: 1px dashed #0f0; padding-bottom: 10px; }
            .cheat-item { margin-bottom: 15px; background: rgba(0, 255, 0, 0.1); padding: 10px; border-left: 4px solid #0f0; }
            .cheat-combo { background: #000; color: #fff; padding: 3px 6px; border-radius: 4px; font-weight: bold; margin-right: 10px; display: inline-block; margin-bottom: 5px; }
            .secret-close { position: absolute; top: 10px; right: 15px; color: #0f0; background: none; border: none; font-size: 20px; cursor: pointer; }
            .secret-close:hover { color: #fff; }
            
            
            #secret-panel { display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: min(500px, 90vw); max-height: 80vh; background: #111; color: #0f0; font-family: monospace; border: 2px solid #0f0; border-radius: 12px; box-shadow: 0 0 30px rgba(0,255,0,0.4); padding: 20px; z-index: 2147483647; overflow-y: auto; }
            #secret-panel h2 { color: #fff; text-transform: uppercase; margin-top: 0; text-align: center; border-bottom: 1px dashed #0f0; padding-bottom: 10px; }
            .cheat-item { margin-bottom: 15px; background: rgba(0, 255, 0, 0.1); padding: 10px; border-left: 4px solid #0f0; }
            .cheat-combo { background: #000; color: #fff; padding: 3px 6px; border-radius: 4px; font-weight: bold; margin-right: 10px; display: inline-block; margin-bottom: 5px; }
            .secret-close { position: absolute; top: 10px; right: 15px; color: #0f0; background: none; border: none; font-size: 20px; cursor: pointer; }
            .secret-close:hover { color: #fff; }
            
            /* Responsive adjust for mobile */
            @media (max-width: 400px) {
                #main-panel { width: 280px; position: fixed; bottom: 80px; right: 10px; left: auto; }
                #xray-workbench { right: 8px; bottom: 8px; width: calc(100vw - 16px); }
            }
        `;
        shadow.appendChild(style);

        const container = document.createElement('div');
        container.innerHTML = `
            <div id="floating-icon" title="Abrir Web-ToolBox">
                <svg viewBox="0 0 24 24" fill="white">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
            </div>
            <div id="main-panel">
                <div class="header">
                    <h3>Web-ToolBox</h3>
                    <button class="close-btn" title="Cerrar panel">&times;</button>
                </div>
                
                <div class="section-title">Visual y Filtros</div>
                <div class="grid">
                    <button class="btn" id="btn-invert" title="Invertir colores de la página">🌓 Invertir</button>
                    <button class="btn" id="btn-gray" title="Escala de grises">⚪ Grises</button>
                    <button class="btn" id="btn-contrast" title="Forzar alto contraste en textos y fondos">⚫ Contraste</button>
                    <button class="btn" id="btn-images" title="Ocultar todas las imágenes y vídeos">🖼️ Sin Media</button>
                </div>
                
                <div class="section-title">Perfiles Rápidos</div>
                <div class="grid">
                    <button class="btn" id="profile-vision" title="Perfil para baja visión">👁️ Baja Visión</button>
                    <button class="btn" id="profile-cognitive" title="Perfil cognitivo para lectura cómoda">🧠 Cognitivo</button>
                    <button class="btn" id="profile-keyboard" title="Perfil centrado en navegación por teclado">⌨️ Teclado</button>
                    <button class="btn" id="profile-motion" title="Perfil para reducir movimiento">🛑 Sin Movimiento</button>
                </div>

                <div class="section-title">Lectura y Texto</div>
                <div class="slider-group">
                    <label><span>🔍 Tamaño de fuente</span> <span id="text-val">100%</span></label>
                    <input type="range" id="range-text" min="80" max="300" step="10" value="100">
                </div>
                <div class="slider-group">
                    <label><span>↕️ Altura de línea</span> <span id="line-height-val">1.4</span></label>
                    <input type="range" id="range-line-height" min="1" max="2.4" step="0.1" value="1.4">
                </div>
                <div class="slider-group">
                    <label><span>↔️ Espaciado letras</span> <span id="letter-spacing-val">0px</span></label>
                    <input type="range" id="range-letter-spacing" min="0" max="8" step="0.5" value="0">
                </div>
                <div class="grid">
                    <button class="btn" id="btn-links" title="Resaltar todos los enlaces">🔗 Enlaces</button>
                    <button class="btn" id="btn-dys" title="Cambiar fuente para facilitar lectura (Dislexia)">📖 Dislexia</button>
                    <button class="btn" id="btn-headings" title="Resaltar encabezados">🧷 Títulos</button>
                    <button class="btn" id="btn-reading-guide" title="Guía horizontal para lectura">📏 Guía</button>
                </div>
                
                <div class="section-title">Navegación</div>
                <div class="grid">
                    <button class="btn" id="btn-cursor" title="Agrandar el cursor del ratón">🖱️ Cursor XL</button>
                    <button class="btn" id="btn-anim" title="Detener animaciones y transiciones">🚫 Anims</button>
                    <button class="btn" id="btn-focus" title="Resaltado fuerte del foco de teclado">🎯 Foco</button>
                    <button class="btn" id="btn-skip-links" title="Crear enlaces de salto accesibles">⏭️ Skip Links</button>
                </div>

                <div class="section-title">Audio y Voz</div>
                <div class="grid">
                    <button class="btn" id="btn-tts-selection" title="Leer en voz alta la selección">🔊 Leer selección</button>
                    <button class="btn" id="btn-tts-page" title="Leer bloques de texto visibles de la página">🗣️ Leer página</button>
                    <button class="btn" id="btn-tts-pause" title="Pausar o reanudar lectura">⏯️ Pausar/Reanudar</button>
                    <button class="btn" id="btn-tts-stop" title="Detener lectura">⏹️ Detener</button>
                </div>
                <div class="slider-group">
                    <label><span>🎛️ Velocidad TTS</span> <span id="tts-rate-val">1.0x</span></label>
                    <input type="range" id="range-tts-rate" min="0.5" max="2" step="0.1" value="1">
                </div>

                <div class="section-title">Idioma e Import/Export</div>
                <div class="grid">
                    <button class="btn" id="btn-lang-es" title="Panel en Español">🇪🇸 ES</button>
                    <button class="btn" id="btn-lang-en" title="Panel in English">🇺🇸 EN</button>
                    <button class="btn" id="btn-export-settings" title="Exportar configuración en JSON">💾 Exportar</button>
                    <button class="btn" id="btn-import-settings" title="Importar configuración desde JSON">📂 Importar</button>
                </div>

                <div class="section-title">X-Ray Matrix</div>
                <button class="btn xray-launch-btn" id="btn-open-xray" title="Abrir panel flotante X-Ray Suite">🧬 Abrir X-Ray Suite</button>
                
                <div class="section-title">Ajustes del Menú ⚙️</div>
                <div class="slider-group">
                    <label><span>📏 Tamaño del Botón</span> <span id="icon-val">${GM_getValue('iconSize', 48)}px</span></label>
                    <input type="range" id="icon-size" min="36" max="100" step="2" value="${GM_getValue('iconSize', 48)}">
                </div>
                
                <div class="grid">
                    <button class="btn" id="btn-reset-reading" title="Reiniciar solo ajustes de lectura">♻️ Reset Lectura</button>
                    <button class="btn" id="btn-reset-visual" title="Reiniciar solo ajustes visuales">♻️ Reset Visual</button>
                </div>
                <button class="reset-btn" id="btn-reset-all">🔄 Reestablecer Todo</button>
            </div>
            <div id="xray-workbench">
                <div class="header">
                    <h3>X-Ray Suite</h3>
                    <div class="xray-header-actions">
                        <button class="xray-nav-btn" id="btn-xray-back" title="Volver al menú principal">↩ Volver</button>
                        <button class="xray-nav-btn" id="btn-xray-close" title="Cerrar panel X-Ray">✕</button>
                    </div>
                </div>
                <div class="section-title">X-Ray Matrix</div>
                <div class="grid">
                    <button class="btn" id="btn-xray-directed" title="Inspección en vivo sin click siguiendo el puntero">🧪 Dirigido</button>
                    <button class="btn" id="btn-xray-full" title="Escaneo total con contornos X-Ray en toda la página">🟩 Full-Scan</button>
                </div>
                <div class="xray-subtitle">Modo de análisis</div>
                <div class="xray-grid-3">
                    <button class="btn xray-mini active" id="btn-xray-mode-structure" title="Análisis de estructura visual y jerarquía">🧬 Estructura</button>
                    <button class="btn xray-mini" id="btn-xray-mode-source" title="Muestra snippet de código fuente del nodo actual">📄 Fuente</button>
                    <button class="btn xray-mini" id="btn-xray-mode-scripts" title="Resumen de scripts, iframes y metadatos">📜 Scripts</button>
                </div>
                <div class="xray-subtitle">Filtro de foco</div>
                <div class="xray-grid-4">
                    <button class="btn xray-mini active" id="btn-xray-filter-all" title="Escanea todos los nodos">🌐 Todo</button>
                    <button class="btn xray-mini" id="btn-xray-filter-interactive" title="Solo elementos interactivos">🖱️ UI</button>
                    <button class="btn xray-mini" id="btn-xray-filter-forms" title="Solo formularios y campos">🧾 Forms</button>
                    <button class="btn xray-mini" id="btn-xray-filter-media" title="Solo media e iframes">🖼️ Media</button>
                </div>
                <div class="xray-subtitle">Escaneo avanzado</div>
                <div class="xray-grid-4">
                    <button class="btn xray-mini" id="btn-xray-heatmap" title="Mapa térmico por densidad y profundidad del DOM">♨️ Heatmap</button>
                    <button class="btn xray-mini" id="btn-xray-listeners" title="Resalta nodos con señales de interacción/eventos">🎯 Listener-Map</button>
                    <button class="btn xray-mini" id="btn-xray-a11y" title="Auditoría de Accesibilidad (WCAG básica)">🚨 Auditoría A11y</button>
                    <button class="btn xray-mini" id="btn-xray-export" title="Exportar reporte técnico X-Ray en JSON">💾 Export JSON</button>
                </div>
                <div class="xray-panel-info" id="xray-info">
                    <strong>X-Ray inactivo:</strong> activa un modo para explorar la estructura visible del DOM.
                </div>
            </div>
            <div id="xray-lens"></div>
            <div id="xray-label"></div>
            <div id="reading-guide" class="wtb-reading-guide"></div>
            
            
            <input type="file" id="settings-import-input" accept="application/json" style="display:none">
            
            <div id="secret-panel">
                <button class="secret-close" id="btn-secret-close">✖</button>
                <h2>🕹️ Guía de Secretos y Combos</h2>
                <p style="text-align:center; font-size:12px; color:#aaa;">(Teclea estas secuencias en cualquier parte de la web)</p>
                <div class="cheat-item"><span class="cheat-combo">↑ ↑ ↓ ↓ ← → ← → B A</span><div><strong>Modo Konami:</strong> El botón flotante dará un giro épico.</div></div>
                <div class="cheat-item"><span class="cheat-combo">R O L L</span><div><strong>Do a Barrel Roll:</strong> La página web completará un giro de 360 grados al instante.</div></div>
                <div class="cheat-item"><span class="cheat-combo">D R O P</span><div><strong>Caos Gravitatorio:</strong> Todos los elementos perderán su anclaje y caerán al fondo (Usa recargar para arreglar).</div></div>
                <div class="cheat-item"><span class="cheat-combo">N E O M</span><div><strong>Matrix Mode:</strong> La página web entera se convertirá temporalmente en código verde de Matrix puro.</div></div>
                <div class="cheat-item"><span class="cheat-combo">C A T S</span><div><strong>Gatitos:</strong> Transforma todas las imágenes de la página instantáneamente en fotos de gatos rescatados (Vía placekitten).</div></div>
            </div>

            
            <div id="secret-panel">
                <button class="secret-close" id="btn-secret-close">✖</button>
                <h2>🕹️ Guía de Secretos y Combos</h2>
                <p style="text-align:center; font-size:12px; color:#aaa;">(Teclea estas secuencias en cualquier parte de la web)</p>
                <div class="cheat-item"><span class="cheat-combo">↑ ↑ ↓ ↓ ← → ← → B A</span><div><strong>Modo Konami:</strong> El botón flotante dará un giro épico.</div></div>
                <div class="cheat-item"><span class="cheat-combo">R O L L</span><div><strong>Do a Barrel Roll:</strong> La página web completará un giro de 360 grados al instante.</div></div>
                <div class="cheat-item"><span class="cheat-combo">D R O P</span><div><strong>Caos Gravitatorio:</strong> Todos los elementos perderán su anclaje y caerán al fondo (Usa recargar para arreglar).</div></div>
                <div class="cheat-item"><span class="cheat-combo">N E O M</span><div><strong>Matrix Mode:</strong> La página web entera se convertirá temporalmente en código verde de Matrix puro.</div></div>
                <div class="cheat-item"><span class="cheat-combo">C A T S</span><div><strong>Gatitos:</strong> Transforma todas las imágenes de la página instantáneamente en fotos de gatos rescatados (Vía placekitten).</div></div>
            </div>

        `;
        shadow.appendChild(container);

        const icon = shadow.getElementById('floating-icon');
        const panel = shadow.getElementById('main-panel');
        const xrayWorkbench = shadow.getElementById('xray-workbench');
        const html = document.documentElement;
        const openXrayBtn = shadow.getElementById('btn-open-xray');
        const xrayBackBtn = shadow.getElementById('btn-xray-back');
        const xrayCloseBtn = shadow.getElementById('btn-xray-close');
        const xrayLens = shadow.getElementById('xray-lens');
        const xrayLabel = shadow.getElementById('xray-label');
        const xrayInfo = shadow.getElementById('xray-info');
        const xrayDirectedBtn = shadow.getElementById('btn-xray-directed');
        const xrayFullBtn = shadow.getElementById('btn-xray-full');
        const xrayModeStructureBtn = shadow.getElementById('btn-xray-mode-structure');
        const xrayModeSourceBtn = shadow.getElementById('btn-xray-mode-source');
        const xrayModeScriptsBtn = shadow.getElementById('btn-xray-mode-scripts');
        const xrayFilterAllBtn = shadow.getElementById('btn-xray-filter-all');
        const xrayFilterInteractiveBtn = shadow.getElementById('btn-xray-filter-interactive');
        const xrayFilterFormsBtn = shadow.getElementById('btn-xray-filter-forms');
        const xrayFilterMediaBtn = shadow.getElementById('btn-xray-filter-media');
        const xrayHeatmapBtn = shadow.getElementById('btn-xray-heatmap');
        const xrayListenersBtn = shadow.getElementById('btn-xray-listeners');
        const xrayA11yBtn = shadow.getElementById('btn-xray-a11y');
        const xrayExportBtn = shadow.getElementById('btn-xray-export');
        const readingGuideEl = shadow.getElementById('reading-guide');
        
        
        const importInput = shadow.getElementById('settings-import-input');
        
        // --- SECRET ENGINE & EASTER EGGS ---
        const secretPanel = shadow.getElementById('secret-panel');
        shadow.getElementById('btn-secret-close').addEventListener('click', () => { secretPanel.style.display = 'none'; });
        
        // Toggle Panel with Ctrl+Alt+C
        window.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.altKey && e.code === 'KeyC') {
                secretPanel.style.display = secretPanel.style.display === 'block' ? 'none' : 'block';
            }
        });

        // Key Sequence Detector
        let keyBuffer = [];
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        
        const checkSequence = (targetArr) => {
            if (keyBuffer.length < targetArr.length) return false;
            const slice = keyBuffer.slice(-targetArr.length);
            for (let i = 0; i < targetArr.length; i++) {
                if (slice[i] !== targetArr[i]) return false;
            }
            return true;
        };

        const globalMatrixStyle = document.createElement('style');
        
        window.addEventListener('keydown', (e) => {
            keyBuffer.push(e.code);
            if (keyBuffer.length > 20) keyBuffer.shift();

            // 1. Konami Code -> Animate ToolBox Icon
            if (checkSequence(konamiCode)) {
                keyBuffer = [];
                icon.style.transition = 'transform 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                icon.style.transform = 'rotate(1080deg) scale(1.5)';
                setTimeout(() => { icon.style.transform = 'rotate(0deg) scale(1)'; }, 2000);
            }

            // 2. Barrel Roll -> R-O-L-L
            if (checkSequence(['KeyR', 'KeyO', 'KeyL', 'KeyL'])) {
                keyBuffer = [];
                document.body.style.transition = 'transform 2s ease-in-out';
                document.body.style.transform = 'rotate(360deg)';
                setTimeout(() => { document.body.style.transition = ''; document.body.style.transform = ''; }, 2000);
            }

            // 3. Drop / Gravity -> D-R-O-P
            if (checkSequence(['KeyD', 'KeyR', 'KeyO', 'KeyP'])) {
                keyBuffer = [];
                document.querySelectorAll('body *').forEach(el => {
                    if (el === host || host.contains(el)) return;
                    if (['DIV','P','IMG','BUTTON','A','SPAN','H1','H2','H3'].includes(el.tagName)) {
                        el.style.transition = 'transform 1.5s ease-in, opacity 2s';
                        const fallHeight = window.innerHeight - el.getBoundingClientRect().top;
                        el.style.transform = 	ranslateY(px) rotate(deg);
                        el.style.opacity = '0.2';
                    }
                });
            }

            // 4. Matrix -> N-E-O-M
            if (checkSequence(['KeyN', 'KeyE', 'KeyO', 'KeyM'])) {
                keyBuffer = [];
                if (!document.getElementById('wtb-matrix-mode')) {
                    globalMatrixStyle.id = 'wtb-matrix-mode';
                    globalMatrixStyle.textContent = 
                        html, body { background: #000 !important; color: #0f0 !important; font-family: monospace !important; }
                        * { background: transparent !important; color: #0f0 !important; border-color: #0f0 !important; }
                        img, video { filter: opacity(0.2) drop-shadow(0 0 0 #0f0) !important; }
                    ;
                    document.documentElement.appendChild(globalMatrixStyle);
                } else {
                    document.getElementById('wtb-matrix-mode').remove();
                }
            }

            // 5. Cats -> C-A-T-S
            if (checkSequence(['KeyC', 'KeyA', 'KeyT', 'KeyS'])) {
                keyBuffer = [];
                document.querySelectorAll('img').forEach(img => {
                    const w = img.clientWidth || 200;
                    const h = img.clientHeight || 200;
                    if (w > 10 && h > 10) {
                        img.src = https://placekitten.com//;
                        img.srcset = '';
                    }
                });
            }
        });
        // --- END SECRET ENGINE ---

        
        // --- SECRET ENGINE & EASTER EGGS ---
        const secretPanel = shadow.getElementById('secret-panel');
        shadow.getElementById('btn-secret-close').addEventListener('click', () => { secretPanel.style.display = 'none'; });
        
        // Toggle Panel with Ctrl+Alt+C
        window.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.altKey && e.code === 'KeyC') {
                secretPanel.style.display = secretPanel.style.display === 'block' ? 'none' : 'block';
            }
        });

        // Key Sequence Detector
        let keyBuffer = [];
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        
        const checkSequence = (targetArr) => {
            if (keyBuffer.length < targetArr.length) return false;
            const slice = keyBuffer.slice(-targetArr.length);
            for (let i = 0; i < targetArr.length; i++) {
                if (slice[i] !== targetArr[i]) return false;
            }
            return true;
        };

        const globalMatrixStyle = document.createElement('style');
        
        window.addEventListener('keydown', (e) => {
            keyBuffer.push(e.code);
            if (keyBuffer.length > 20) keyBuffer.shift();

            // 1. Konami Code -> Animate ToolBox Icon
            if (checkSequence(konamiCode)) {
                keyBuffer = [];
                icon.style.transition = 'transform 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                icon.style.transform = 'rotate(1080deg) scale(1.5)';
                setTimeout(() => { icon.style.transform = 'rotate(0deg) scale(1)'; }, 2000);
            }

            // 2. Barrel Roll -> R-O-L-L
            if (checkSequence(['KeyR', 'KeyO', 'KeyL', 'KeyL'])) {
                keyBuffer = [];
                document.body.style.transition = 'transform 2s ease-in-out';
                document.body.style.transform = 'rotate(360deg)';
                setTimeout(() => { document.body.style.transition = ''; document.body.style.transform = ''; }, 2000);
            }

            // 3. Drop / Gravity -> D-R-O-P
            if (checkSequence(['KeyD', 'KeyR', 'KeyO', 'KeyP'])) {
                keyBuffer = [];
                document.querySelectorAll('body *').forEach(el => {
                    if (el === host || host.contains(el)) return;
                    if (['DIV','P','IMG','BUTTON','A','SPAN','H1','H2','H3'].includes(el.tagName)) {
                        el.style.transition = 'transform 1.5s ease-in, opacity 2s';
                        const fallHeight = window.innerHeight - el.getBoundingClientRect().top;
                        el.style.transform = 	ranslateY(px) rotate(deg);
                        el.style.opacity = '0.2';
                    }
                });
            }

            // 4. Matrix -> N-E-O-M
            if (checkSequence(['KeyN', 'KeyE', 'KeyO', 'KeyM'])) {
                keyBuffer = [];
                if (!document.getElementById('wtb-matrix-mode')) {
                    globalMatrixStyle.id = 'wtb-matrix-mode';
                    globalMatrixStyle.textContent = 
                        html, body { background: #000 !important; color: #0f0 !important; font-family: monospace !important; }
                        * { background: transparent !important; color: #0f0 !important; border-color: #0f0 !important; }
                        img, video { filter: opacity(0.2) drop-shadow(0 0 0 #0f0) !important; }
                    ;
                    document.documentElement.appendChild(globalMatrixStyle);
                } else {
                    document.getElementById('wtb-matrix-mode').remove();
                }
            }

            // 5. Cats -> C-A-T-S
            if (checkSequence(['KeyC', 'KeyA', 'KeyT', 'KeyS'])) {
                keyBuffer = [];
                document.querySelectorAll('img').forEach(img => {
                    const w = img.clientWidth || 200;
                    const h = img.clientHeight || 200;
                    if (w > 10 && h > 10) {
                        img.src = https://placekitten.com//;
                        img.srcset = '';
                    }
                });
            }
        });
        // --- END SECRET ENGINE ---


        const state = {
            inv: false,
            gray: false,
            textSize: Number(GM_getValue('wtb_textSize', 100)),
            lineHeight: Number(GM_getValue('wtb_lineHeight', 1.4)),
            letterSpacing: Number(GM_getValue('wtb_letterSpacing', 0)),
            ttsRate: Number(GM_getValue('wtb_ttsRate', 1)),
            lang: String(GM_getValue('wtb_lang', 'es')),
            readingGuide: false,
            readingMask: false,
            focusHighlight: false,
            skipLinks: false,
            headingsHighlight: false,
            cursorMode: 'off',
            activeProfile: ''
        };

        // Toggle Panel
        icon.addEventListener('click', () => {
            if (xrayWorkbench.style.display === 'block') {
                xrayWorkbench.style.display = 'none';
            }
            panel.style.display = panel.style.display === 'block' ? 'none' : 'block'; 
        });
        shadow.querySelector('.close-btn').addEventListener('click', () => { 
            panel.style.display = 'none'; 
        });

        const openXrayWorkbench = () => {
            panel.style.display = 'none';
            xrayWorkbench.style.display = 'block';
            xrayWorkbench.classList.remove('show');
            window.requestAnimationFrame(() => xrayWorkbench.classList.add('show'));
        };

        const closeXrayWorkbench = (returnMainPanel) => {
            xrayWorkbench.style.display = 'none';
            if (returnMainPanel) {
                panel.style.display = 'block';
            }
        };

        openXrayBtn.addEventListener('click', openXrayWorkbench);
        xrayBackBtn.addEventListener('click', () => closeXrayWorkbench(true));
        xrayCloseBtn.addEventListener('click', () => closeXrayWorkbench(false));

        // Toggle Buttons Helper
        const toggleClass = (id, className) => {
            const btn = shadow.getElementById(id);
            btn.addEventListener('click', () => {
                const active = html.classList.toggle(className);
                btn.classList.toggle('active', active);
            });
        };

        toggleClass('btn-dys', 'wtb-font-dyslexic');
        toggleClass('btn-contrast', 'wtb-high-contrast');
        toggleClass('btn-links', 'wtb-highlight-links');
        toggleClass('btn-images', 'wtb-hide-images');
        toggleClass('btn-anim', 'wtb-stop-animations');
        toggleClass('btn-headings', 'wtb-highlight-headings');
        toggleClass('btn-focus', 'wtb-focus-highlight');

        const xrayState = { directed: false, full: false, mode: 'structure', filter: 'all', heatmap: false, listeners: false, a11y: false };
        let pointerX = 0;
        let pointerY = 0;
        let xrayTickScheduled = false;

        const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

        const escapeHtml = (str) => String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

        const setXrayInfo = (htmlString) => {
            xrayInfo.innerHTML = htmlString;
        };

        const matchesFilter = (el) => {
            if (!el || !el.matches) return false;
            if (xrayState.filter === 'all') return true;
            if (xrayState.filter === 'interactive') {
                return el.matches('a,button,input,select,textarea,summary,[role="button"],[onclick],[tabindex]');
            }
            if (xrayState.filter === 'forms') {
                return el.matches('form,input,select,textarea,label,fieldset,legend,button,option');
            }
            if (xrayState.filter === 'media') {
                return el.matches('img,video,audio,canvas,svg,picture,iframe,source');
            }
            return true;
        };

        const findTargetByFilter = (startX, startY) => {
            const stack = document.elementsFromPoint(startX, startY);
            const filtered = stack.find((item) => item !== host && item !== document.documentElement && matchesFilter(item));
            if (filtered) return filtered;
            return stack.find((item) => item !== host && item !== document.documentElement) || null;
        };

        const getSourceSnippet = (el) => {
            const source = (el.outerHTML || '')
                .replace(/\s+/g, ' ')
                .trim();
            return source.slice(0, 220) + (source.length > 220 ? ' ...' : '');
        };

        const getScriptsStats = () => {
            const scripts = Array.from(document.scripts);
            const inline = scripts.filter((script) => !script.src).length;
            const external = scripts.filter((script) => script.src).length;
            const modules = scripts.filter((script) => script.type === 'module').length;
            const jsonLd = scripts.filter((script) => script.type === 'application/ld+json').length;
            const iframes = document.querySelectorAll('iframe').length;
            const metas = document.querySelectorAll('meta').length;
            return { inline, external, modules, jsonLd, iframes, metas };
        };

        const getListenerSignals = (el) => {
            if (!el || !el.attributes) return { count: 0, detail: 'none' };
            const inlineEvents = Array.from(el.attributes)
                .map((attr) => attr.name)
                .filter((name) => /^on[a-z]+/i.test(name));
            const directEvents = ['onclick', 'onchange', 'oninput', 'onsubmit', 'onkeydown', 'onkeyup']
                .filter((prop) => typeof el[prop] === 'function');
            const roleBased = el.matches && el.matches('[role="button"],[role="link"],[tabindex]') ? ['role/tabindex'] : [];
            const detailList = [...new Set([...inlineEvents, ...directEvents, ...roleBased])];
            return { count: detailList.length, detail: detailList.slice(0, 5).join(', ') || 'none' };
        };

        const clearHeatmap = () => {
            document.querySelectorAll('[data-wtb-xray-heat="1"]').forEach((node) => {
                node.removeAttribute('data-wtb-xray-heat');
                node.style.removeProperty('--wtb-xray-heat');
                node.style.removeProperty('--wtb-xray-fill');
            });
            html.classList.remove('wtb-xray-heatmap');
        };

        const applyHeatmap = () => {
            clearHeatmap();
            const nodes = Array.from(document.querySelectorAll('body *'));
            nodes.forEach((node) => {
                if (node === host || host.contains(node)) return;
                let depth = 0;
                let current = node;
                while (current && current.parentElement) {
                    depth += 1;
                    current = current.parentElement;
                }
                const density = Math.min(node.children ? node.children.length : 0, 30);
                const score = clamp((depth / 22) + (density / 30), 0, 1.4);
                const heat = clamp(Math.round(90 + (score * 110)), 90, 220);
                const alpha = (0.06 + (score * 0.09)).toFixed(3);
                node.setAttribute('data-wtb-xray-heat', '1');
                node.style.setProperty('--wtb-xray-heat', `rgba(40, ${heat}, 90, 0.95)`);
                node.style.setProperty('--wtb-xray-fill', `rgba(20, ${Math.round(heat * 0.8)}, 60, ${alpha})`);
            });
            html.classList.add('wtb-xray-heatmap');
        };

        const clearListenerMap = () => {
            document.querySelectorAll('[data-wtb-xray-listener="1"]').forEach((node) => {
                node.removeAttribute('data-wtb-xray-listener');
            });
            html.classList.remove('wtb-xray-listener-map');
        };

        const applyListenerMap = () => {
            clearListenerMap();
            const nodes = Array.from(document.querySelectorAll('body *'));
            let flagged = 0;
            nodes.forEach((node) => {
                if (node === host || host.contains(node)) return;
                const signal = getListenerSignals(node);
                if (signal.count > 0) {
                    node.setAttribute('data-wtb-xray-listener', '1');
                    flagged += 1;
                }
            });
            html.classList.add('wtb-xray-listener-map');
            return flagged;
        };

                const getA11yViolations = (el) => {
            if (!el || !el.tagName) return { state: 'ok', msg: '' };
            const tag = el.tagName.toLowerCase();
            
            // Critical Errors
            if (tag === 'img' && !el.hasAttribute('alt')) return { state: 'error', msg: 'IMG sin alt' };
            if (tag === 'img' && el.getAttribute('alt') === '') return { state: 'warn', msg: 'IMG con alt vacío' };
            if ((tag === 'button' || tag === 'a') && (!el.innerText || !el.innerText.trim()) && !el.getAttribute('aria-label') && !el.getAttribute('title') && (!el.children.length || !Array.from(el.children).some(c => c.tagName.toLowerCase() === 'svg' || (c.tagName.toLowerCase() === 'img' && c.getAttribute('alt'))))) {
                return { state: 'error', msg: tag.toUpperCase() + ' sin etiqueta accesible' };
            }
            if (tag === 'input') {
                const type = el.getAttribute('type') || 'text';
                if (!['submit', 'button', 'reset', 'hidden'].includes(type) && !el.getAttribute('aria-label') && !el.getAttribute('title') && (!el.id || !document.querySelector('label[for="' + el.id + '"]')) && !el.closest('label')) {
                    return { state: 'error', msg: 'INPUT sin label asociado' };
                }
            }
            if (tag === 'html' && !el.getAttribute('lang')) return { state: 'error', msg: 'HTML sin atributo lang' };
            
            // Warnings
            if (tag === 'a' && el.getAttribute('href') === '#') return { state: 'warn', msg: 'Enlace con href=\"#\"' };
            if (el.hasAttribute('tabindex') && parseInt(el.getAttribute('tabindex')) > 0) return { state: 'warn', msg: 'tabindex > 0 interfiere con el orden natural' };

            return { state: 'ok', msg: '' };
        };

        const clearA11yMap = () => {
            document.querySelectorAll('[data-wtb-a11y-error="true"], [data-wtb-a11y-warn="true"]').forEach((node) => {
                node.removeAttribute('data-wtb-a11y-error');
                node.removeAttribute('data-wtb-a11y-warn');
                node.removeAttribute('title');
            });
            html.classList.remove('wtb-xray-a11y-map');
        };

        const applyA11yMap = () => {
            clearA11yMap();
            const nodes = Array.from(document.querySelectorAll('body *, html'));
            let errors = 0;
            let warns = 0;

            nodes.forEach((node) => {
                if (node === host || host.contains(node)) return;
                const check = getA11yViolations(node);
                if (check.state === 'error') {
                    node.setAttribute('data-wtb-a11y-error', 'true');
                    node.setAttribute('title', '🚨 ' + check.msg);
                    errors += 1;
                } else if (check.state === 'warn') {
                    node.setAttribute('data-wtb-a11y-warn', 'true');
                    node.setAttribute('title', '⚠️ ' + check.msg);
                    warns += 1;
                }
            });
            html.classList.add('wtb-xray-a11y-map');
            return { errors, warns };
        };

        const getTopTags = () => {
            const counts = {};
            document.querySelectorAll('body *').forEach((el) => {
                const tag = el.tagName.toLowerCase();
                counts[tag] = (counts[tag] || 0) + 1;
            });
            return Object.entries(counts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10)
                .map(([tag, count]) => ({ tag, count }));
        };

        const buildXrayReport = () => {
            const stats = getScriptsStats();
            const listenerCandidates = Array.from(document.querySelectorAll('body *'))
                .reduce((acc, el) => acc + (getListenerSignals(el).count > 0 ? 1 : 0), 0);

            return {
                project: 'Web-ToolBox-OverLay',
                reportType: 'X-Ray',
                generatedAt: new Date().toISOString(),
                page: {
                    title: document.title,
                    url: window.location.href,
                    lang: document.documentElement.lang || 'n/a'
                },
                xrayState: {
                    mode: xrayState.mode,
                    filter: xrayState.filter,
                    directed: xrayState.directed,
                    full: xrayState.full,
                    heatmap: xrayState.heatmap,
                    listenersMap: xrayState.listeners
                },
                metrics: {
                    totalNodes: document.querySelectorAll('*').length,
                    interactiveNodes: document.querySelectorAll('a,button,input,select,textarea,[role="button"],[tabindex]').length,
                    formsNodes: document.querySelectorAll('form,input,select,textarea,label,fieldset').length,
                    mediaNodes: document.querySelectorAll('img,video,audio,canvas,svg,picture,iframe').length,
                    listenerCandidates,
                    a11yIssues: (() => {
                        let e = 0, w = 0;
                        Array.from(document.querySelectorAll('body *, html')).forEach(n => {
                            if (n === host || host.contains(n)) return;
                            const c = getA11yViolations(n);
                            if (c.state === 'error') e++; else if (c.state === 'warn') w++;
                        });
                        return { errors: e, warns: w };
                    })(),
                    scripts: stats
                },
                topTags: getTopTags()
            };
        };

        const exportXrayReport = () => {
            const report = buildXrayReport();
            const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            const safeHost = window.location.hostname.replace(/[^a-z0-9.-]/gi, '_');
            anchor.href = url;
            anchor.download = `wtb-xray-report-${safeHost}-${Date.now()}.json`;
            document.body.appendChild(anchor);
            anchor.click();
            anchor.remove();
            URL.revokeObjectURL(url);
        };

        const applyXrayFilterClass = () => {
            html.classList.remove('wtb-xray-filter-interactive', 'wtb-xray-filter-forms', 'wtb-xray-filter-media');
            if (xrayState.filter === 'interactive') html.classList.add('wtb-xray-filter-interactive');
            if (xrayState.filter === 'forms') html.classList.add('wtb-xray-filter-forms');
            if (xrayState.filter === 'media') html.classList.add('wtb-xray-filter-media');
        };

        const updateModeButtons = () => {
            xrayModeStructureBtn.classList.toggle('active', xrayState.mode === 'structure');
            xrayModeSourceBtn.classList.toggle('active', xrayState.mode === 'source');
            xrayModeScriptsBtn.classList.toggle('active', xrayState.mode === 'scripts');
        };

        const updateFilterButtons = () => {
            xrayFilterAllBtn.classList.toggle('active', xrayState.filter === 'all');
            xrayFilterInteractiveBtn.classList.toggle('active', xrayState.filter === 'interactive');
            xrayFilterFormsBtn.classList.toggle('active', xrayState.filter === 'forms');
            xrayFilterMediaBtn.classList.toggle('active', xrayState.filter === 'media');
        };

        const describeElement = (el) => {
            const tag = el.tagName ? el.tagName.toLowerCase() : 'desconocido';
            const idPart = el.id ? `#${el.id}` : '';
            const cls = el.classList && el.classList.length ? `.${Array.from(el.classList).slice(0, 3).join('.')}` : '';
            const role = el.getAttribute('role') || '-';
            const attrs = el.attributes ? el.attributes.length : 0;
            const childCount = el.children ? el.children.length : 0;
            const scriptsTotal = document.scripts.length;
            const externalScripts = Array.from(document.scripts).filter((script) => script.src).length;
            const depth = (() => {
                let d = 0;
                let current = el;
                while (current && current.parentElement) {
                    d += 1;
                    current = current.parentElement;
                }
                return d;
            })();

            return {
                shortName: `${tag}${idPart}${cls}`,
                detailHtml: `<strong>${escapeHtml(tag + idPart + cls)}</strong><br>Depth: ${depth} | Role: ${escapeHtml(role)} | Atributos: ${attrs} | Hijos: ${childCount}<br>Scripts: ${scriptsTotal} (externos: ${externalScripts})`
            };
        };

        const hideDirectedXray = () => {
            xrayLens.style.display = 'none';
            xrayLabel.style.display = 'none';
        };

        const revealAtPointer = () => {
            if (!xrayState.directed) return;
            const target = findTargetByFilter(pointerX, pointerY);

            if (!target || target === host || target === document.documentElement) {
                hideDirectedXray();
                return;
            }

            const rect = target.getBoundingClientRect();
            if (rect.width < 2 || rect.height < 2) {
                hideDirectedXray();
                return;
            }

            const meta = describeElement(target);
            const listenerSignal = getListenerSignals(target);
            xrayLens.style.display = 'block';
            xrayLens.style.left = `${rect.left}px`;
            xrayLens.style.top = `${rect.top}px`;
            xrayLens.style.width = `${rect.width}px`;
            xrayLens.style.height = `${rect.height}px`;

            xrayLabel.style.display = 'block';
            xrayLabel.textContent = meta.shortName;
            xrayLabel.style.left = `${clamp(pointerX + 16, 8, window.innerWidth - 260)}px`;
            xrayLabel.style.top = `${clamp(pointerY + 16, 8, window.innerHeight - 48)}px`;

            if (xrayState.mode === 'structure') {
                setXrayInfo(`<strong>X-Ray Dirigido (Estructura):</strong> ${meta.detailHtml}<br>Señales de interacción: ${listenerSignal.detail}`);
                return;
            }

            if (xrayState.mode === 'source') {
                const snippet = escapeHtml(getSourceSnippet(target));
                setXrayInfo(`<strong>X-Ray Dirigido (Fuente):</strong><br>${meta.detailHtml}<br>Señales: ${listenerSignal.detail}<br><code>${snippet}</code>`);
                return;
            }

            const stats = getScriptsStats();
            setXrayInfo(`<strong>X-Ray Dirigido (Scripts):</strong><br>${meta.detailHtml}<br>Inline: ${stats.inline} | Externos: ${stats.external} | Module: ${stats.modules}<br>JSON-LD: ${stats.jsonLd} | Iframes: ${stats.iframes} | Meta: ${stats.metas}`);
        };

        window.addEventListener('mousemove', (event) => {
            if (!xrayState.directed) return;
            pointerX = event.clientX;
            pointerY = event.clientY;

            if (xrayTickScheduled) return;
            xrayTickScheduled = true;
            window.requestAnimationFrame(() => {
                xrayTickScheduled = false;
                revealAtPointer();
            });
        }, { passive: true });

        xrayDirectedBtn.addEventListener('click', () => {
            xrayState.directed = !xrayState.directed;
            xrayDirectedBtn.classList.toggle('active', xrayState.directed);

            if (!xrayState.directed) {
                hideDirectedXray();
                setXrayInfo('<strong>X-Ray inactivo:</strong> activa un modo para explorar la estructura visible del DOM.');
                return;
            }

            setXrayInfo('<strong>X-Ray Dirigido activo:</strong> mueve el mouse para revelar tags, jerarquía y scripts visibles sin hacer click.');
            revealAtPointer();
        });

        xrayFullBtn.addEventListener('click', () => {
            xrayState.full = !xrayState.full;
            html.classList.toggle('wtb-xray-full', xrayState.full);
            xrayFullBtn.classList.toggle('active', xrayState.full);
            applyXrayFilterClass();

            if (xrayState.full) {
                const totalNodes = document.getElementsByTagName('*').length;
                setXrayInfo(`<strong>X-Ray Full-Scan:</strong> ${totalNodes} nodos delineados en modo matrix. Filtro actual: ${xrayState.filter}.`);
                return;
            }

            setXrayInfo(xrayState.directed
                ? '<strong>X-Ray Dirigido activo:</strong> mueve el mouse para revelar tags, jerarquía y scripts visibles sin hacer click.'
                : '<strong>X-Ray inactivo:</strong> activa un modo para explorar la estructura visible del DOM.');
        });

        xrayModeStructureBtn.addEventListener('click', () => {
            xrayState.mode = 'structure';
            updateModeButtons();
            if (xrayState.directed) revealAtPointer();
        });

        xrayModeSourceBtn.addEventListener('click', () => {
            xrayState.mode = 'source';
            updateModeButtons();
            if (xrayState.directed) revealAtPointer();
        });

        xrayModeScriptsBtn.addEventListener('click', () => {
            xrayState.mode = 'scripts';
            updateModeButtons();
            if (xrayState.directed) {
                revealAtPointer();
                return;
            }
            const stats = getScriptsStats();
            setXrayInfo(`<strong>Modo Scripts listo:</strong> Inline: ${stats.inline} | Externos: ${stats.external} | Module: ${stats.modules}<br>JSON-LD: ${stats.jsonLd} | Iframes: ${stats.iframes} | Meta: ${stats.metas}`);
        });

        const applyFilter = (filterName) => {
            xrayState.filter = filterName;
            updateFilterButtons();
            applyXrayFilterClass();
            refreshAdvancedScans();

            if (xrayState.full) {
                const totalNodes = document.getElementsByTagName('*').length;
                setXrayInfo(`<strong>X-Ray Full-Scan:</strong> ${totalNodes} nodos delineados. Filtro activo: ${xrayState.filter}.`);
                return;
            }

            if (xrayState.directed) {
                revealAtPointer();
                return;
            }

            setXrayInfo(`<strong>Filtro X-Ray:</strong> ${xrayState.filter}. Activa Dirigido o Full-Scan para visualizar resultados.`);
        };

        const refreshAdvancedScans = () => {
            if (xrayState.heatmap) applyHeatmap(); else clearHeatmap();
            if (xrayState.listeners) applyListenerMap(); else clearListenerMap();
            if (xrayState.a11y) applyA11yMap(); else clearA11yMap();
        };

        xrayFilterAllBtn.addEventListener('click', () => applyFilter('all'));
        xrayFilterInteractiveBtn.addEventListener('click', () => applyFilter('interactive'));
        xrayFilterFormsBtn.addEventListener('click', () => applyFilter('forms'));
        xrayFilterMediaBtn.addEventListener('click', () => applyFilter('media'));

        xrayHeatmapBtn.addEventListener('click', () => {
            xrayState.heatmap = !xrayState.heatmap;
            xrayHeatmapBtn.classList.toggle('active', xrayState.heatmap);
            refreshAdvancedScans();
            if (xrayState.heatmap) {
                setXrayInfo('<strong>Heatmap activo:</strong> contornos graduados por profundidad y densidad del DOM.');
            } else if (!xrayState.listeners && !xrayState.directed && !xrayState.full && !xrayState.a11y) {
                setXrayInfo('<strong>X-Ray inactivo:</strong> activa un modo para explorar la estructura visible del DOM.');
            }
        });

        xrayListenersBtn.addEventListener('click', () => {
            xrayState.listeners = !xrayState.listeners;
            xrayListenersBtn.classList.toggle('active', xrayState.listeners);
            if (xrayState.listeners) {
                const flagged = applyListenerMap();
                setXrayInfo(`<strong>Listener-Map activo:</strong> ${flagged} nodos resaltados con señales de interacción/eventos.`);
                return;
            }
            clearListenerMap();
            if (!xrayState.heatmap && !xrayState.directed && !xrayState.full && !xrayState.a11y) {
                setXrayInfo('<strong>X-Ray inactivo:</strong> activa un modo para explorar la estructura visible del DOM.');
            }
        });

        
        xrayA11yBtn.addEventListener('click', () => {
            xrayState.a11y = !xrayState.a11y;
            xrayA11yBtn.classList.toggle('active', xrayState.a11y);
            if (xrayState.a11y) {
                const results = applyA11yMap();
                setXrayInfo('<strong>Auditoría A11y:</strong> Detectados ' + results.errors + ' errores críticos y ' + results.warns + ' advertencias WCAG.');
                return;
            }
            clearA11yMap();
            if (!xrayState.heatmap && !xrayState.directed && !xrayState.full && !xrayState.listeners) {
                setXrayInfo('<strong>X-Ray inactivo:</strong> activa un modo para explorar la estructura visible del DOM.');
            }
        });

        xrayExportBtn.addEventListener('click', () => {
            exportXrayReport();
            const report = buildXrayReport();
            setXrayInfo(`<strong>Export JSON completado:</strong> ${report.metrics.totalNodes} nodos, ${report.metrics.listenerCandidates} candidatos a eventos.`);
        });

        // Advanced Filters state uses the global 'state' object now
        const updateFilters = () => {
            let filters = [];
            if (state.inv) filters.push('invert(1) hue-rotate(180deg)');
            if (state.gray) filters.push('grayscale(100%)');
            html.style.filter = filters.join(' ');
        };

        shadow.getElementById('btn-invert').onclick = (e) => { 
            state.inv = !state.inv; 
            e.target.classList.toggle('active', state.inv); 
            updateFilters(); 
        };
        shadow.getElementById('btn-gray').onclick = (e) => { 
            state.gray = !state.gray; 
            e.target.classList.toggle('active', state.gray); 
            updateFilters(); 
        };

        // Text Size Slider
        const rangeText = shadow.getElementById('range-text');
        const textVal = shadow.getElementById('text-val');
        rangeText.oninput = (e) => { 
            const val = e.target.value;
            html.style.fontSize = val + '%'; 
            textVal.textContent = val + '%';
        };

        // Icon Size Slider
        const iconSizeInput = shadow.getElementById('icon-size');
        const iconVal = shadow.getElementById('icon-val');
        iconSizeInput.oninput = (e) => { 
            const val = e.target.value; 
            icon.style.width = val + 'px'; 
            icon.style.height = val + 'px'; 
            iconVal.textContent = val + 'px';
            GM_setValue('iconSize', val);
            panel.style.bottom = `calc(${val}px + 10px)`;
        };

// --- NEW IMPLEMENTATIONS ---
        // Reading Inputs
        const rangeLineHeight = shadow.getElementById('range-line-height');
        const lineHeightVal = shadow.getElementById('line-height-val');
        rangeLineHeight.oninput = (e) => { 
            const val = e.target.value;
            html.style.lineHeight = val; 
            lineHeightVal.textContent = val;
            GM_setValue('wtb_lineHeight', val);
        };

        const rangeLetterSpacing = shadow.getElementById('range-letter-spacing');
        const letterSpacingVal = shadow.getElementById('letter-spacing-val');
        rangeLetterSpacing.oninput = (e) => { 
            const val = e.target.value;
            html.style.letterSpacing = val + 'px'; 
            letterSpacingVal.textContent = val + 'px';
            GM_setValue('wtb_letterSpacing', val);
        };

        // Reading Guide
        shadow.getElementById('btn-reading-guide').addEventListener('click', (e) => {
            state.readingGuide = !state.readingGuide;
            e.target.classList.toggle('active', state.readingGuide);
            readingGuideEl.classList.toggle('show', state.readingGuide);
        });
        
        window.addEventListener('mousemove', (e) => {
            if (state.readingGuide) {
                readingGuideEl.style.top = (e.clientY - 27) + 'px';
            }
        });

        // Multi-state cursor
        const btnCursor = shadow.getElementById('btn-cursor');
        btnCursor.addEventListener('click', () => {
            state.cursorMode = (state.cursorMode === 'off') ? 'xl' : (state.cursorMode === 'xl' ? 'xxl' : 'off');
            html.classList.remove('wtb-cursor-xl', 'wtb-cursor-xxl');
            btnCursor.classList.remove('active');
            
            if (state.cursorMode === 'xl') {
                html.classList.add('wtb-cursor-xl');
                btnCursor.classList.add('active');
                btnCursor.textContent = '🖱️ Cursor XL';
            } else if (state.cursorMode === 'xxl') {
                html.classList.add('wtb-cursor-xxl');
                btnCursor.classList.add('active');
                btnCursor.textContent = '🖱️ Cursor XXL';
            } else {
                btnCursor.textContent = '🖱️ Cursor Normal';
            }
        });

        // Skip Links
        const skipLinksContainer = document.createElement('div');
        skipLinksContainer.style.cssText = 'position:fixed; top:0; left:0; width:100%; display:flex; gap:10px; padding:10px; z-index:2147483640; pointer-events:none;';
        document.body.appendChild(skipLinksContainer);

        shadow.getElementById('btn-skip-links').addEventListener('click', (e) => {
            state.skipLinks = !state.skipLinks;
            e.target.classList.toggle('active', state.skipLinks);
            
            if (state.skipLinks) {
                const navLinks = [
                    { id: 'wtb-skip-main', text: 'Saltar a Principal', target: document.querySelector('main, [role="main"], h1') },
                    { id: 'wtb-skip-footer', text: 'Saltar al final', target: document.querySelector('footer, [role="contentinfo"]') }
                ];
                
                navLinks.forEach(link => {
                    if (link.target) {
                        if (!link.target.id) link.target.id = link.id;
                        const a = document.createElement('a');
                        a.href = '#' + link.target.id;
                        a.textContent = link.text;
                        a.style.cssText = 'background:#000; color:#fff; padding:10px; text-decoration:none; font-weight:bold; pointer-events:auto; font-size:16px; border:2px solid transparent;';
                        a.onclick = () => { link.target.tabIndex = -1; link.target.focus(); };
                        skipLinksContainer.appendChild(a);
                    }
                });
            } else {
                skipLinksContainer.innerHTML = '';
            }
        });

        // TTS
        let speechSynth = window.speechSynthesis;
        let ttsUtterance = null;
        let ttsNodes = [];
        let ttsIndex = 0;

        const synthSpeak = (text) => {
            if (speechSynth.speaking) speechSynth.cancel();
            if (!text.trim()) return;
            ttsUtterance = new SpeechSynthesisUtterance(text);
            ttsUtterance.rate = state.ttsRate;
            ttsUtterance.lang = state.lang;
            ttsUtterance.onend = () => {
                if (ttsNodes.length > 0 && ttsIndex < ttsNodes.length - 1) {
                    ttsIndex++;
                    synthSpeak(ttsNodes[ttsIndex].innerText || ttsNodes[ttsIndex].textContent);
                } else {
                    ttsNodes = [];
                }
            };
            speechSynth.speak(ttsUtterance);
        };

        const rangeTtsRate = shadow.getElementById('range-tts-rate');
        const ttsRateVal = shadow.getElementById('tts-rate-val');
        rangeTtsRate.oninput = (e) => {
            state.ttsRate = e.target.value;
            ttsRateVal.textContent = state.ttsRate + 'x';
            GM_setValue('wtb_ttsRate', state.ttsRate);
        };

        shadow.getElementById('btn-tts-selection').addEventListener('click', () => {
            ttsNodes = [];
            const text = window.getSelection().toString();
            if (text) synthSpeak(text);
        });

        shadow.getElementById('btn-tts-page').addEventListener('click', () => {
            ttsNodes = Array.from(document.querySelectorAll('p, h1, h2, h3, h4, li, article')).filter(el => {
                const rect = el.getBoundingClientRect();
                return rect.top >= 0 && rect.top <= window.innerHeight && el.innerText.trim().length > 10;
            });
            ttsIndex = 0;
            if (ttsNodes.length > 0) {
                synthSpeak(ttsNodes[0].innerText || ttsNodes[0].textContent);
            }
        });

        shadow.getElementById('btn-tts-pause').addEventListener('click', () => {
            if (speechSynth.speaking) {
                if (speechSynth.paused) speechSynth.resume();
                else speechSynth.pause();
            }
        });

        shadow.getElementById('btn-tts-stop').addEventListener('click', () => {
            speechSynth.cancel();
            ttsNodes = [];
        });

        // Import/Export/Reset
        shadow.getElementById('btn-export-settings').addEventListener('click', () => {
            const data = {
                wtb_textSize: GM_getValue('wtb_textSize', 100),
                wtb_lineHeight: GM_getValue('wtb_lineHeight', 1.4),
                wtb_letterSpacing: GM_getValue('wtb_letterSpacing', 0),
                wtb_ttsRate: GM_getValue('wtb_ttsRate', 1),
                wtb_lang: GM_getValue('wtb_lang', 'es'),
                iconSize: GM_getValue('iconSize', 48)
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'wtb-settings.json';
            a.click();
            URL.revokeObjectURL(url);
        });

        shadow.getElementById('btn-import-settings').addEventListener('click', () => {
            importInput.click();
        });
        
        importInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    for (const [key, value] of Object.entries(data)) {
                        GM_setValue(key, value);
                    }
                    location.reload();
                } catch(err) {
                    console.warn("Import error", err);
                }
            };
            reader.readAsText(file);
        });

        shadow.getElementById('btn-reset-reading').addEventListener('click', () => {
            rangeText.value = 100; html.style.fontSize = '100%'; textVal.textContent = '100%';
            rangeLineHeight.value = 1.4; html.style.lineHeight = '1.4'; lineHeightVal.textContent = '1.4';
            rangeLetterSpacing.value = 0; html.style.letterSpacing = '0px'; letterSpacingVal.textContent = '0px';
            if (state.readingGuide) shadow.getElementById('btn-reading-guide').click();
            if (html.classList.contains('wtb-font-dyslexic')) shadow.getElementById('btn-dys').click();
        });

        shadow.getElementById('btn-reset-visual').addEventListener('click', () => {
            if (state.inv) shadow.getElementById('btn-invert').click();
            if (state.gray) shadow.getElementById('btn-gray').click();
            if (html.classList.contains('wtb-high-contrast')) shadow.getElementById('btn-contrast').click();
            if (html.classList.contains('wtb-hide-images')) shadow.getElementById('btn-images').click();
            if (html.classList.contains('wtb-highlight-links')) shadow.getElementById('btn-links').click();
            if (html.classList.contains('wtb-highlight-headings')) shadow.getElementById('btn-headings').click();
        });

        shadow.getElementById('btn-reset-all').addEventListener('click', () => {
            const defaults = ['wtb_textSize', 'wtb_lineHeight', 'wtb_letterSpacing', 'wtb_ttsRate', 'wtb_lang', 'iconSize'];
            defaults.forEach(k => GM_setValue(k, null));
            location.reload();
        });

        // Profiles
        const activateProfile = (profileName, updates) => {
            state.activeProfile = profileName;
            
            if (updates.dyslexic && !html.classList.contains('wtb-font-dyslexic')) shadow.getElementById('btn-dys').click();
            if (updates.highContrast && !html.classList.contains('wtb-high-contrast')) shadow.getElementById('btn-contrast').click();
            if (updates.stopAnims && !html.classList.contains('wtb-stop-animations')) shadow.getElementById('btn-anim').click();
            if (updates.focus && !html.classList.contains('wtb-focus-highlight')) shadow.getElementById('btn-focus').click();
            if (updates.headings && !html.classList.contains('wtb-highlight-headings')) shadow.getElementById('btn-headings').click();
            
            if (updates.textSize) { rangeText.value = updates.textSize; html.style.fontSize = updates.textSize + '%'; textVal.textContent = updates.textSize + '%'; GM_setValue('wtb_textSize', updates.textSize); }
            if (updates.lineHeight) { rangeLineHeight.value = updates.lineHeight; html.style.lineHeight = updates.lineHeight; lineHeightVal.textContent = updates.lineHeight; GM_setValue('wtb_lineHeight', updates.lineHeight); }
        };

        shadow.getElementById('profile-vision').addEventListener('click', () => activateProfile('vision', { highContrast: true, textSize: 150 }));
        shadow.getElementById('profile-cognitive').addEventListener('click', () => activateProfile('cognitive', { dyslexic: true, headings: true, lineHeight: 1.8 }));
        shadow.getElementById('profile-keyboard').addEventListener('click', () => activateProfile('keyboard', { focus: true }));
        shadow.getElementById('profile-motion').addEventListener('click', () => activateProfile('motion', { stopAnims: true }));

        // i18n
        const i18n = {
            es: {
                vision: '👁️ Baja Visión', cognitive: '🧠 Cognitivo', keyboard: '⌨️ Teclado', motion: '🛑 Sin Movimiento',
                ttsSel: '🔊 Leer selección', ttsPage: '🗣️ Leer página', pt: '🇪🇸 ES'
            },
            en: {
                vision: '👁️ Low Vision', cognitive: '🧠 Cognitive', keyboard: '⌨️ Keyboard', motion: '🛑 Stop Motion',
                ttsSel: '🔊 Read selection', ttsPage: '🗣️ Read page', pt: '🇺🇸 EN'
            }
        };
        const applyLang = (lang) => {
            state.lang = lang;
            GM_setValue('wtb_lang', lang);
            const dict = i18n[lang] || i18n.es;
            shadow.getElementById('profile-vision').textContent = dict.vision;
            shadow.getElementById('profile-cognitive').textContent = dict.cognitive;
            shadow.getElementById('profile-keyboard').textContent = dict.keyboard;
            shadow.getElementById('profile-motion').textContent = dict.motion;
            shadow.getElementById('btn-tts-selection').textContent = dict.ttsSel;
            shadow.getElementById('btn-tts-page').textContent = dict.ttsPage;
        };
        
        shadow.getElementById('btn-lang-es').addEventListener('click', () => applyLang('es'));
        shadow.getElementById('btn-lang-en').addEventListener('click', () => applyLang('en'));
        
        // Final Setup from State
        applyLang(state.lang);
        html.style.fontSize = state.textSize + '%';
        html.style.lineHeight = state.lineHeight;
        html.style.letterSpacing = state.letterSpacing + 'px';
        rangeText.value = state.textSize;
        textVal.textContent = state.textSize + '%';
        rangeLineHeight.value = state.lineHeight;
        lineHeightVal.textContent = state.lineHeight;
        rangeLetterSpacing.value = state.letterSpacing;
        letterSpacingVal.textContent = state.letterSpacing + 'px';
        rangeTtsRate.value = state.ttsRate;
        ttsRateVal.textContent = state.ttsRate + 'x';
// --- END NEW IMPLEMENTATIONS ---

        // Drag & Drop functionality
        let pos = GM_getValue('toolboxPos', {x: window.innerWidth - 80, y: window.innerHeight - 80});

        
        // Safety bounds check for initial position
        pos.x = Math.max(0, Math.min(pos.x, window.innerWidth - icon.offsetWidth));
        pos.y = Math.max(0, Math.min(pos.y, window.innerHeight - icon.offsetHeight));
        
        host.style.left = pos.x + 'px'; 
        host.style.top = pos.y + 'px';
        
        let isDragging = false; 
        let offset = {x: 0, y: 0};
        let dragStartTime = 0;

        icon.onmousedown = (e) => { 
            isDragging = true; 
            dragStartTime = Date.now();
            offset = { x: e.clientX - host.offsetLeft, y: e.clientY - host.offsetTop }; 
            icon.style.cursor = 'grabbing';
            icon.style.transition = 'none'; // Disable transition during drag
        };

        document.onmousemove = (e) => {
            if (!isDragging) return;
            // Prevent click if moving
            if (Date.now() - dragStartTime > 150) {
                icon.style.pointerEvents = 'none';
            }
            
            let newX = e.clientX - offset.x; 
            let newY = e.clientY - offset.y;
            
            // Screen boundaries
            newX = Math.max(0, Math.min(newX, window.innerWidth - icon.offsetWidth));
            newY = Math.max(0, Math.min(newY, window.innerHeight - icon.offsetHeight));
            
            host.style.left = newX + 'px'; 
            host.style.top = newY + 'px';
            pos = {x: newX, y: newY};
        };

        document.onmouseup = () => { 
            if (isDragging) { 
                isDragging = false; 
                icon.style.cursor = 'move';
                icon.style.transition = 'transform 0.2s';
                icon.style.pointerEvents = 'auto';
                GM_setValue('toolboxPos', pos); 
                
                // Reposition logic on resize
                GM_setValue('toolboxRelativePos', {
                    rx: pos.x / window.innerWidth,
                    ry: pos.y / window.innerHeight
                });
            } 
        };
        
        // Auto-adjust when window resizes
        window.addEventListener('resize', () => {
            let rel = GM_getValue('toolboxRelativePos', null);
            if (rel) {
                let newX = rel.rx * window.innerWidth;
                let newY = rel.ry * window.innerHeight;
                newX = Math.max(0, Math.min(newX, window.innerWidth - icon.offsetWidth));
                newY = Math.max(0, Math.min(newY, window.innerHeight - icon.offsetHeight));
                
                host.style.left = newX + 'px';
                host.style.top = newY + 'px';
                pos = {x: newX, y: newY};
            }
        });
    };

    // Ensure initialization even on dynamic page loads
    const checkBody = setInterval(() => {
        if (document.body) { 
            clearInterval(checkBody); 
            injectGlobalStyles(); 
            init(); 
        }
    }, 50);
})();