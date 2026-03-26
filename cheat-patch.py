import re

with open('Web-ToolBox-OverLay.user.js', 'r', encoding='utf-8') as f:
    content = f.read()

css_addition = '''
            #secret-panel { display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: min(500px, 90vw); max-height: 80vh; background: #111; color: #0f0; font-family: monospace; border: 2px solid #0f0; border-radius: 12px; box-shadow: 0 0 30px rgba(0,255,0,0.4); padding: 20px; z-index: 2147483647; overflow-y: auto; }
            #secret-panel h2 { color: #fff; text-transform: uppercase; margin-top: 0; text-align: center; border-bottom: 1px dashed #0f0; padding-bottom: 10px; }
            .cheat-item { margin-bottom: 15px; background: rgba(0, 255, 0, 0.1); padding: 10px; border-left: 4px solid #0f0; }
            .cheat-combo { background: #000; color: #fff; padding: 3px 6px; border-radius: 4px; font-weight: bold; margin-right: 10px; display: inline-block; margin-bottom: 5px; }
            .secret-close { position: absolute; top: 10px; right: 15px; color: #0f0; background: none; border: none; font-size: 20px; cursor: pointer; }
            .secret-close:hover { color: #fff; }
            
            /* Responsive adjust for mobile */'''
content = content.replace('/* Responsive adjust for mobile */', css_addition)

html_addition = '''
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
'''
content = content.replace('<input type="file" id="settings-import-input" accept="application/json" style="display:none">', html_addition)

logic_addition = '''
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
'''
content = content.replace("const importInput = shadow.getElementById('settings-import-input');", logic_addition)

with open('Web-ToolBox-OverLay.user.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Cheat Engine Injected!')
