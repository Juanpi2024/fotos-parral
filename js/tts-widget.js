/**
 * Widget Global de Text-to-Speech
 * Permite a los adultos mayores escuchar el contenido de cualquier página
 * Usa la Web Speech API nativa del navegador
 */

class TextToSpeechWidget {
    constructor() {
        this.synth = window.speechSynthesis;
        this.utterance = null;
        this.isPlaying = false;
        this.isPaused = false;
        this.rate = 0.9; // Velocidad más lenta para adultos mayores
        this.voices = [];
        this.currentText = '';

        if (!this.synth) {
            console.warn('Text-to-Speech no soportado en este navegador');
            return;
        }

        this.loadVoices();
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = () => this.loadVoices();
        }

        this.createWidget();
    }

    loadVoices() {
        this.voices = this.synth.getVoices();
    }

    getBestSpanishVoice() {
        const esVoices = this.voices.filter(v => v.lang.includes('es'));
        // Preferir voces de Google o Microsoft en español
        const preferred = esVoices.find(v =>
            v.name.includes('Google') ||
            v.name.includes('Microsoft') ||
            v.name.includes('Paulina') ||
            v.name.includes('Monica') ||
            v.lang === 'es-CL' ||
            v.lang === 'es-MX'
        );
        return preferred || esVoices[0] || null;
    }

    createWidget() {
        // Crear el contenedor del widget
        const widget = document.createElement('div');
        widget.id = 'tts-widget';
        widget.innerHTML = `
            <div id="tts-panel" class="tts-panel">
                <div class="tts-header">
                    <span>🔊 Lector de Página</span>
                    <button id="tts-close" class="tts-close" aria-label="Cerrar panel">×</button>
                </div>
                <div class="tts-content">
                    <p class="tts-info">Escucha el contenido de esta página en voz alta</p>
                    <div class="tts-controls">
                        <button id="tts-play" class="tts-btn tts-play-btn" aria-label="Reproducir">
                            ▶️ Escuchar Página
                        </button>
                        <button id="tts-pause" class="tts-btn" aria-label="Pausar" style="display:none;">
                            ⏸️ Pausar
                        </button>
                        <button id="tts-stop" class="tts-btn tts-stop-btn" aria-label="Detener" style="display:none;">
                            ⏹️ Detener
                        </button>
                    </div>
                    <div class="tts-speed">
                        <label>Velocidad:</label>
                        <div class="tts-speed-buttons">
                            <button class="tts-speed-btn" data-speed="0.7">🐢 Lento</button>
                            <button class="tts-speed-btn active" data-speed="0.9">Normal</button>
                            <button class="tts-speed-btn" data-speed="1.2">🐰 Rápido</button>
                        </div>
                    </div>
                    <div id="tts-status" class="tts-status"></div>
                </div>
            </div>
            <button id="tts-toggle" class="tts-toggle" aria-label="Abrir lector de voz" title="Escuchar página">
                🔊
            </button>
        `;

        // Agregar estilos
        const styles = document.createElement('style');
        styles.textContent = `
            #tts-widget {
                position: fixed;
                bottom: 210px;
                right: 20px;
                z-index: 9998;
                font-family: 'Lato', sans-serif;
            }

            .tts-toggle {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(39, 174, 96, 0.4);
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .tts-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(39, 174, 96, 0.5);
            }

            .tts-toggle.active {
                background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
                box-shadow: 0 4px 15px rgba(231, 76, 60, 0.4);
            }

            .tts-panel {
                display: none;
                position: absolute;
                bottom: 60px;
                right: 0;
                width: 280px;
                background: white;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                overflow: hidden;
                animation: slideUp 0.3s ease;
            }

            .tts-panel.show {
                display: block;
            }

            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .tts-header {
                background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
                color: white;
                padding: 12px 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-weight: bold;
            }

            .tts-close {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                padding: 0;
                line-height: 1;
                opacity: 0.8;
            }

            .tts-close:hover {
                opacity: 1;
            }

            .tts-content {
                padding: 15px;
            }

            .tts-info {
                font-size: 0.85rem;
                color: #666;
                margin: 0 0 15px 0;
                text-align: center;
            }

            .tts-controls {
                display: flex;
                gap: 8px;
                justify-content: center;
                margin-bottom: 15px;
            }

            .tts-btn {
                padding: 10px 16px;
                border: none;
                border-radius: 25px;
                cursor: pointer;
                font-size: 0.9rem;
                font-weight: 600;
                transition: all 0.2s ease;
            }

            .tts-play-btn {
                background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
                color: white;
            }

            .tts-play-btn:hover {
                transform: scale(1.05);
                box-shadow: 0 4px 12px rgba(39, 174, 96, 0.4);
            }

            .tts-stop-btn {
                background: #e74c3c;
                color: white;
            }

            .tts-stop-btn:hover {
                background: #c0392b;
            }

            .tts-btn:not(.tts-play-btn):not(.tts-stop-btn) {
                background: #f0f0f0;
                color: #333;
            }

            .tts-btn:not(.tts-play-btn):not(.tts-stop-btn):hover {
                background: #e0e0e0;
            }

            .tts-speed {
                text-align: center;
            }

            .tts-speed label {
                font-size: 0.8rem;
                color: #888;
                display: block;
                margin-bottom: 8px;
            }

            .tts-speed-buttons {
                display: flex;
                gap: 5px;
                justify-content: center;
            }

            .tts-speed-btn {
                padding: 6px 12px;
                border: 2px solid #ddd;
                background: white;
                border-radius: 20px;
                cursor: pointer;
                font-size: 0.75rem;
                transition: all 0.2s ease;
            }

            .tts-speed-btn:hover {
                border-color: #27ae60;
            }

            .tts-speed-btn.active {
                background: #27ae60;
                color: white;
                border-color: #27ae60;
            }

            .tts-status {
                text-align: center;
                font-size: 0.8rem;
                color: #27ae60;
                margin-top: 10px;
                min-height: 20px;
            }

            /* Responsive */
            @media (max-width: 480px) {
                #tts-widget {
                    bottom: 180px;
                    right: 10px;
                }

                .tts-panel {
                    width: 260px;
                    right: -5px;
                }

                .tts-toggle {
                    width: 45px;
                    height: 45px;
                    font-size: 20px;
                }
            }
        `;

        document.head.appendChild(styles);
        document.body.appendChild(widget);

        this.bindEvents();
    }

    bindEvents() {
        const toggleBtn = document.getElementById('tts-toggle');
        const panel = document.getElementById('tts-panel');
        const closeBtn = document.getElementById('tts-close');
        const playBtn = document.getElementById('tts-play');
        const pauseBtn = document.getElementById('tts-pause');
        const stopBtn = document.getElementById('tts-stop');
        const speedBtns = document.querySelectorAll('.tts-speed-btn');

        // Toggle panel
        toggleBtn.addEventListener('click', () => {
            panel.classList.toggle('show');
            toggleBtn.classList.toggle('active');
        });

        // Close panel
        closeBtn.addEventListener('click', () => {
            panel.classList.remove('show');
            toggleBtn.classList.remove('active');
        });

        // Play
        playBtn.addEventListener('click', () => this.play());

        // Pause
        pauseBtn.addEventListener('click', () => this.pause());

        // Stop
        stopBtn.addEventListener('click', () => this.stop());

        // Speed buttons
        speedBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                speedBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.rate = parseFloat(btn.dataset.speed);

                // Si está reproduciendo, reiniciar con nueva velocidad
                if (this.isPlaying) {
                    this.stop();
                    this.play();
                }
            });
        });
    }

    getPageText() {
        // Obtener texto legible de la página
        const mainContent = document.querySelector('main, article, .container, .about-container, .modal-content.show')
            || document.body;

        // Clonar para no modificar el DOM original
        const clone = mainContent.cloneNode(true);

        // Remover elementos que no queremos leer
        const removeSelectors = [
            'script', 'style', 'nav', 'header', 'footer',
            '.chat-widget', '#tts-widget', '.modal:not(.show)',
            'button', 'input', 'select', '.no-read', '.btn',
            '.tts-panel', '.slider-dots', '.stats-grid'
        ];

        removeSelectors.forEach(sel => {
            clone.querySelectorAll(sel).forEach(el => el.remove());
        });

        // Obtener texto limpio
        let text = clone.textContent || clone.innerText;

        // Limpiar espacios múltiples y saltos de línea
        text = text.replace(/\s+/g, ' ').trim();

        // Limitar longitud para no sobrecargar
        if (text.length > 5000) {
            text = text.substring(0, 5000) + '... El texto continúa. Puede navegar la página para más detalles.';
        }

        return text;
    }

    play() {
        if (this.isPaused && this.synth.paused) {
            this.synth.resume();
            this.isPaused = false;
            this.updateUI('playing');
            return;
        }

        // Detener cualquier lectura previa
        this.synth.cancel();

        // Obtener texto de la página
        this.currentText = this.getPageText();

        if (!this.currentText || this.currentText.length < 10) {
            this.setStatus('No hay contenido para leer en esta página.');
            return;
        }

        // Crear utterance
        this.utterance = new SpeechSynthesisUtterance(this.currentText);
        this.utterance.voice = this.getBestSpanishVoice();
        this.utterance.rate = this.rate;
        this.utterance.pitch = 1.0;
        this.utterance.lang = 'es-CL';

        // Eventos
        this.utterance.onstart = () => {
            this.isPlaying = true;
            this.updateUI('playing');
            this.setStatus('Leyendo...');
        };

        this.utterance.onend = () => {
            this.isPlaying = false;
            this.isPaused = false;
            this.updateUI('stopped');
            this.setStatus('Lectura completada');
        };

        this.utterance.onerror = (e) => {
            console.error('Error TTS:', e);
            this.isPlaying = false;
            this.updateUI('stopped');
            this.setStatus('Error al reproducir');
        };

        // Reproducir
        this.synth.speak(this.utterance);
    }

    pause() {
        if (this.synth.speaking && !this.synth.paused) {
            this.synth.pause();
            this.isPaused = true;
            this.updateUI('paused');
            this.setStatus('Pausado');
        }
    }

    stop() {
        this.synth.cancel();
        this.isPlaying = false;
        this.isPaused = false;
        this.updateUI('stopped');
        this.setStatus('');
    }

    updateUI(state) {
        const playBtn = document.getElementById('tts-play');
        const pauseBtn = document.getElementById('tts-pause');
        const stopBtn = document.getElementById('tts-stop');
        const toggleBtn = document.getElementById('tts-toggle');

        switch (state) {
            case 'playing':
                playBtn.style.display = 'none';
                pauseBtn.style.display = 'inline-block';
                stopBtn.style.display = 'inline-block';
                toggleBtn.classList.add('active');
                break;
            case 'paused':
                playBtn.innerHTML = '▶️ Continuar';
                playBtn.style.display = 'inline-block';
                pauseBtn.style.display = 'none';
                stopBtn.style.display = 'inline-block';
                break;
            case 'stopped':
            default:
                playBtn.innerHTML = '▶️ Escuchar Página';
                playBtn.style.display = 'inline-block';
                pauseBtn.style.display = 'none';
                stopBtn.style.display = 'none';
                toggleBtn.classList.remove('active');
                break;
        }
    }

    setStatus(text) {
        const status = document.getElementById('tts-status');
        if (status) status.textContent = text;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Solo crear si el navegador soporta TTS
    if ('speechSynthesis' in window) {
        window.TTSWidget = new TextToSpeechWidget();
    }
});
