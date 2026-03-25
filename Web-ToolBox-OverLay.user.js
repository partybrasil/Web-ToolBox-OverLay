// ==UserScript==
// @name         Web-ToolBox-OverLay
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Herramienta de accesibilidad total premium, gratuita y personalizable. Menú flotante asilado mediante Shadow DOM.
// @author       Miguel Diaz (Party)
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @updateURL    https://raw.githubusercontent.com/partybrasil/Web-ToolBox-OverLay/main/Web-ToolBox-OverLay.user.js
// @downloadURL  https://raw.githubusercontent.com/partybrasil/Web-ToolBox-OverLay/main/Web-ToolBox-OverLay.user.js
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    const injectGlobalStyles = () => {
        if (document.getElementById('wtb-global-styles')) return;
        const style = document.createElement('style');
        style.id = 'wtb-global-styles';
        style.textContent = `
            .wtb-font-dyslexic * { font-family: 'OpenDyslexic', 'Comic Sans MS', sans-serif !important; letter-spacing: 0.1em !important; line-height: 1.5 !important; }
            .wtb-high-contrast * { background-color: #000 !important; color: #fff !important; border-color: #fff !important; }
            .wtb-highlight-links a { outline: 4px solid #ffeb3b !important; background: #000 !important; color: #fff !important; text-decoration: underline !important; font-weight: bold !important; padding: 2px !important; }
            .wtb-big-cursor { cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path d="M7 2l12 11.2l-5.8 1l3.3 5.8l-2.2 1.3l-3.3-5.8l-4 3.5V2z" fill="black" stroke="white" stroke-width="1"/></svg>'), auto !important; }
            .wtb-big-cursor * { cursor: inherit !important; }
            .wtb-hide-images img, .wtb-hide-images video, .wtb-hide-images svg, .wtb-hide-images picture { visibility: hidden !important; opacity: 0 !important; }
            .wtb-stop-animations * { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
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
            
            /* Responsive adjust for mobile */
            @media (max-width: 400px) {
                #main-panel { width: 280px; position: fixed; bottom: 80px; right: 10px; left: auto; }
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
                
                <div class="section-title">Lectura y Texto</div>
                <div class="slider-group">
                    <label><span>🔍 Tamaño de fuente</span> <span id="text-val">100%</span></label>
                    <input type="range" id="range-text" min="80" max="300" step="10" value="100">
                </div>
                <div class="grid">
                    <button class="btn" id="btn-links" title="Resaltar todos los enlaces">🔗 Enlaces</button>
                    <button class="btn" id="btn-dys" title="Cambiar fuente para facilitar lectura (Dislexia)">📖 Dislexia</button>
                </div>
                
                <div class="section-title">Navegación</div>
                <div class="grid">
                    <button class="btn" id="btn-cursor" title="Agrandar el cursor del ratón">🖱️ Cursor XL</button>
                    <button class="btn" id="btn-anim" title="Detener animaciones y transiciones">🚫 Anims</button>
                </div>
                
                <div class="section-title">Ajustes del Menú ⚙️</div>
                <div class="slider-group">
                    <label><span>📏 Tamaño del Botón</span> <span id="icon-val">${GM_getValue('iconSize', 48)}px</span></label>
                    <input type="range" id="icon-size" min="36" max="100" step="2" value="${GM_getValue('iconSize', 48)}">
                </div>
                
                <button class="reset-btn" onclick="location.reload()">🔄 Reestablecer Todo</button>
            </div>
        `;
        shadow.appendChild(container);

        const icon = shadow.getElementById('floating-icon');
        const panel = shadow.getElementById('main-panel');
        const html = document.documentElement;

        // Toggle Panel
        icon.addEventListener('click', () => { 
            panel.style.display = panel.style.display === 'block' ? 'none' : 'block'; 
        });
        shadow.querySelector('.close-btn').addEventListener('click', () => { 
            panel.style.display = 'none'; 
        });

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
        toggleClass('btn-cursor', 'wtb-big-cursor');
        toggleClass('btn-images', 'wtb-hide-images');
        toggleClass('btn-anim', 'wtb-stop-animations');

        // Advanced Filters state
        let state = { inv: false, gray: false };
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