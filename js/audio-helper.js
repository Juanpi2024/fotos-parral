/**
 * Helper para Accesibilidad Auditiva (Text-to-Speech)
 * Permite leer los relatos usando la API de síntesis de voz del navegador.
 */
class AudioHelper {
    constructor() {
        this.synth = window.speechSynthesis;
        this.currentUtterance = null;
        this.currentButton = null;
        this.voices = [];

        // Cargar voces (puede ser asíncrono en algunos navegadores)
        if (this.synth) {
            this.loadVoices();
            if (this.synth.onvoiceschanged !== undefined) {
                this.synth.onvoiceschanged = () => this.loadVoices();
            }
        }
    }

    loadVoices() {
        this.voices = this.synth.getVoices();
        // Intentar preferir voces en español latino o español de alto rango
        // Prioridad: Google español, Microsoft Sabina/Pablo, es-CL, es-MX, es-ES
    }

    getBestVoice() {
        // Filtro simple para buscar español
        const esVoices = this.voices.filter(v => v.lang.includes('es'));

        // Preferencias específicas
        const preferred = esVoices.find(v => v.name.includes('Google') || v.name.includes('Latino'));
        return preferred || esVoices[0] || null;
    }

    toggle(text, buttonElement) {
        if (!this.synth) {
            console.error("Text-to-Speech no soportado en este navegador.");
            return;
        }

        // Si es el mismo botón y está hablando, pausar/cancelar
        if (this.currentButton === buttonElement && this.synth.speaking) {
            this.stop();
            return;
        }

        // Si hay otro botón activo, resetearlo visualmente
        if (this.currentButton) {
            this.resetButtonVisuals(this.currentButton);
        }

        // Detener cualquier audio previo
        this.synth.cancel();

        // Configurar nueva lectura
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = this.getBestVoice();
        utterance.rate = 1.0; // Velocidad normal
        utterance.pitch = 1.0;

        // Eventos
        utterance.onend = () => {
            this.resetButtonVisuals(buttonElement);
            this.currentButton = null;
            this.currentUtterance = null;
        };

        utterance.onerror = (e) => {
            console.error('Error TTS:', e);
            this.resetButtonVisuals(buttonElement);
        };

        // Guardar referencias
        this.currentUtterance = utterance;
        this.currentButton = buttonElement;

        // Actualizar visuales al estado "Reproduciendo"
        this.setPlayingVisuals(buttonElement);

        // Hablar
        this.synth.speak(utterance);
    }

    stop() {
        if (this.synth) {
            this.synth.cancel();
            if (this.currentButton) {
                this.resetButtonVisuals(this.currentButton);
                this.currentButton = null;
            }
        }
    }

    setPlayingVisuals(btn) {
        btn.innerHTML = '⏹️ Detener';
        btn.classList.add('playing');
        btn.style.borderColor = '#d9534f';
        btn.style.color = '#d9534f';
    }

    resetButtonVisuals(btn) {
        if (!btn) return;
        btn.innerHTML = '🔊 Escuchar';
        btn.classList.remove('playing');
        btn.style.borderColor = ''; // Volver al original (definido en CSS o style attr)
        btn.style.color = '';
    }
}

// Inicializar globalmente
window.RelatoPlayer = new AudioHelper();
