document.addEventListener('DOMContentLoaded', () => {
    // 1. Create and Inject HTML Structure if it doesn't exist
    if (!document.getElementById('chat-widget-container')) {
        const chatContainer = document.createElement('div');
        chatContainer.id = 'chat-widget-container';
        chatContainer.innerHTML = `
            <!-- Chat Window -->
            <div class="chat-window" id="chatWindow">
                <div class="chat-header">
                    <div class="chat-avatar">
                        🤖
                    </div>
                    <div class="chat-info">
                        <h3>MemoriaBot</h3>
                        <span>Asistente Virtual con Voz</span>
                    </div>
                    <button class="chat-close" id="chatClose" aria-label="Cerrar chat">✕</button>
                </div>
                
                <div class="chat-disclaimer">
                    Asistente con voz 🎙️ — Presiona el micrófono para hablar en español.
                </div>

                <div class="chat-messages" id="chatMessages">
                    <!-- Initial Welcome Message -->
                    <div class="message bot">
                        ¡Hola! Soy tu asistente virtual <strong>con voz</strong>. Estoy aquí para ayudarte a navegar por la historia de Parral.
                    </div>
                    <div class="message bot">
                        Puedes <strong>escribir</strong> o <strong>hablar</strong> presionando el micrófono 🎤.<br>
                        Yo te responderé en voz alta si lo deseas.<br><br>
                        Pregúntame sobre:<br>
                        - Fotos antiguas<br>
                        - Historias de familias<br>
                        - Lugares patrimoniales
                    </div>
                </div>

                <div class="chat-input-area">
                    <button class="chat-mic" id="chatMic" aria-label="Activar micrófono" title="Hablar">
                        <svg class="mic-icon" viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                        </svg>
                        <div class="mic-waves" id="micWaves">
                            <span></span><span></span><span></span>
                        </div>
                    </button>
                    <input type="text" class="chat-input" id="chatInput" placeholder="Escribe o habla tu consulta...">
                    <button class="chat-send" id="chatSend" aria-label="Enviar mensaje">➤</button>
                </div>

                <!-- Voice Status Bar -->
                <div class="voice-status" id="voiceStatus">
                    <span class="voice-status-text" id="voiceStatusText"></span>
                    <button class="voice-mute" id="voiceMute" title="Silenciar respuestas de voz" aria-label="Silenciar voz">
                        🔊
                    </button>
                </div>
            </div>

            <!-- Floating Action Button -->
            <div class="chat-fab" id="chatToggle">
                <div class="chat-fab-icon">💬</div>
            </div>
        `;
        document.body.appendChild(chatContainer);
    }

    // 2. DOM Elements
    const chatWindow = document.getElementById('chatWindow');
    const chatToggle = document.getElementById('chatToggle');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');
    const chatMic = document.getElementById('chatMic');
    const micWaves = document.getElementById('micWaves');
    const voiceStatus = document.getElementById('voiceStatus');
    const voiceStatusText = document.getElementById('voiceStatusText');
    const voiceMute = document.getElementById('voiceMute');

    // 3. Voice Configuration
    let isListening = false;
    let isMuted = false; // Controls whether bot speaks responses aloud
    let recognition = null;
    let synthesis = window.speechSynthesis;
    let spanishVoice = null;

    // --- Speech Synthesis (Text-to-Speech) Setup ---
    function loadVoices() {
        const voices = synthesis.getVoices();
        // Prefer a Spanish voice, ideally Latin American
        spanishVoice = voices.find(v => v.lang === 'es-CL') ||
            voices.find(v => v.lang === 'es-MX') ||
            voices.find(v => v.lang === 'es-419') ||
            voices.find(v => v.lang.startsWith('es-')) ||
            voices.find(v => v.lang === 'es') ||
            null;
    }

    // Voices load asynchronously in Chrome
    if (synthesis.onvoiceschanged !== undefined) {
        synthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();

    function speak(text) {
        if (isMuted || !synthesis) return;
        // Cancel any ongoing speech
        synthesis.cancel();

        // Strip HTML tags for clean speech
        const cleanText = text.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, '');

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'es-ES';
        utterance.rate = 0.9; // Slightly slower for elderly users
        utterance.pitch = 1;
        utterance.volume = 1;

        if (spanishVoice) {
            utterance.voice = spanishVoice;
        }

        utterance.onstart = () => {
            showVoiceStatus('🔊 Hablando...');
        };
        utterance.onend = () => {
            showVoiceStatus('');
        };
        utterance.onerror = () => {
            showVoiceStatus('');
        };

        synthesis.speak(utterance);
    }

    // --- Speech Recognition (Voice-to-Text) Setup ---
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'es-CL'; // Chilean Spanish
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            isListening = true;
            chatMic.classList.add('listening');
            micWaves.classList.add('active');
            showVoiceStatus('🎤 Escuchando... habla ahora');
            chatInput.placeholder = '🎤 Escuchando...';
        };

        recognition.onresult = (event) => {
            let transcript = '';
            let isFinal = false;

            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    isFinal = true;
                }
            }

            // Show interim results in the input field
            chatInput.value = transcript;

            if (isFinal) {
                // Process the final recognized text
                stopListening();
                handleUserMessage();
            }
        };

        recognition.onerror = (event) => {
            stopListening();
            if (event.error === 'no-speech') {
                showVoiceStatus('⚠️ No escuché nada. Intenta de nuevo.');
            } else if (event.error === 'not-allowed') {
                showVoiceStatus('⚠️ Permiso de micrófono denegado.');
            } else {
                showVoiceStatus('⚠️ Error de voz: ' + event.error);
            }
            setTimeout(() => showVoiceStatus(''), 3000);
        };

        recognition.onend = () => {
            stopListening();
        };
    } else {
        // Browser doesn't support Speech Recognition
        if (chatMic) {
            chatMic.style.display = 'none';
        }
    }

    function startListening() {
        if (!recognition) return;
        // Cancel any ongoing speech before listening
        synthesis.cancel();
        try {
            recognition.start();
        } catch (e) {
            // Already started, ignore
        }
    }

    function stopListening() {
        isListening = false;
        if (chatMic) {
            chatMic.classList.remove('listening');
        }
        if (micWaves) {
            micWaves.classList.remove('active');
        }
        chatInput.placeholder = 'Escribe o habla tu consulta...';
        showVoiceStatus('');
    }

    function showVoiceStatus(message) {
        if (message) {
            voiceStatus.classList.add('active');
            voiceStatusText.textContent = message;
        } else {
            voiceStatus.classList.remove('active');
            voiceStatusText.textContent = '';
        }
    }

    // 4. Toggle Logic
    function toggleChat() {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            setTimeout(() => chatInput.focus(), 300);
        } else {
            // Stop everything when closing
            if (isListening && recognition) recognition.stop();
            synthesis.cancel();
        }
    }

    chatToggle.addEventListener('click', toggleChat);
    chatClose.addEventListener('click', toggleChat);

    // 5. Mic Button
    chatMic.addEventListener('click', () => {
        if (isListening) {
            recognition.stop();
        } else {
            startListening();
        }
    });

    // 6. Mute Button
    voiceMute.addEventListener('click', () => {
        isMuted = !isMuted;
        voiceMute.textContent = isMuted ? '🔇' : '🔊';
        voiceMute.title = isMuted ? 'Activar respuestas de voz' : 'Silenciar respuestas de voz';
        if (isMuted) {
            synthesis.cancel();
            showVoiceStatus('🔇 Voz silenciada');
            setTimeout(() => showVoiceStatus(''), 2000);
        } else {
            showVoiceStatus('🔊 Voz activada');
            setTimeout(() => showVoiceStatus(''), 2000);
        }
    });

    // 7. Messaging Logic
    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.innerHTML = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleUserMessage() {
        const text = chatInput.value.trim();
        if (text === "") return;

        addMessage(text, 'user');
        chatInput.value = "";

        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing-indicator';
        typingDiv.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            // Remove typing indicator
            typingDiv.remove();

            let response = "Interesante pregunta. Como soy una versión de prueba, te sugiero explorar la sección de 'Galería' para encontrar más sobre eso.";

            const lowerText = text.toLowerCase();

            if (lowerText.includes('hola') || lowerText.includes('buenos') || lowerText.includes('buenas')) {
                response = "¡Muy buenas! ¿En qué puedo ayudarte hoy? Puedes preguntarme sobre fotos, historia o lugares de Parral.";
            } else if (lowerText.includes('foto') || lowerText.includes('imagen') || lowerText.includes('galería') || lowerText.includes('galeria')) {
                response = "Tenemos más de 19 colecciones de fotos. Puedes verlas en la sección <a href='galeria.html' style='color:#c9a961'>Galería</a>.";
            } else if (lowerText.includes('neruda')) {
                response = "Pablo Neruda es una figura central de Parral. Tenemos una colección dedicada a su infancia en nuestra ciudad. ¿Te gustaría saber más?";
            } else if (lowerText.includes('donar') || lowerText.includes('aporte') || lowerText.includes('ayudar')) {
                response = "¡Gracias por tu interés! Puedes contactarnos directamente para apoyar esta iniciativa de rescate patrimonial.";
            } else if (lowerText.includes('historia') || lowerText.includes('parral')) {
                response = "Parral fue fundada en 1795 como Villa Reina Luisa del Parral. Explora nuestra <a href='historia.html' style='color:#c9a961'>sección de Historia</a> para conocer más.";
            } else if (lowerText.includes('educación') || lowerText.includes('educacion') || lowerText.includes('material') || lowerText.includes('profesor')) {
                response = "Tenemos material educativo gratuito para docentes y estudiantes. Visita nuestra <a href='educacion.html' style='color:#c9a961'>sección de Educación</a>.";
            } else if (lowerText.includes('voz') || lowerText.includes('micrófono') || lowerText.includes('microfono') || lowerText.includes('hablar')) {
                response = "¡Claro! Para usar la voz, presiona el botón del micrófono 🎤 y habla con claridad. Yo también puedo responderte en voz alta. Si quieres silenciarme, usa el botón 🔊 abajo.";
            } else if (lowerText.includes('gracias') || lowerText.includes('chao') || lowerText.includes('adiós') || lowerText.includes('adios')) {
                response = "¡Gracias a ti! Fue un gusto ayudarte. Vuelve cuando quieras explorar más sobre la historia de Parral. 👋";
            } else if (lowerText.includes('alcalde') || lowerText.includes('autoridad')) {
                response = "Puedes conocer a los alcaldes históricos de Parral en nuestra <a href='alcaldes.html' style='color:#c9a961'>sección de Alcaldes</a>.";
            } else if (lowerText.includes('bombero')) {
                response = "Los Bomberos de Parral tienen una rica historia. Visita nuestra <a href='detalle-bomberos.html' style='color:#c9a961'>página sobre Bomberos</a>.";
            } else if (lowerText.includes('plaza') || lowerText.includes('lugar') || lowerText.includes('monumento')) {
                response = "Parral tiene hermosos lugares patrimoniales. Explora nuestras <a href='detalle-plaza.html' style='color:#c9a961'>Plazas</a> y monumentos históricos.";
            }

            addMessage(response, 'bot');

            // Speak the response aloud
            speak(response);

        }, 1200);
    }

    chatSend.addEventListener('click', handleUserMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserMessage();
    });
});
