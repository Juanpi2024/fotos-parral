document.addEventListener('DOMContentLoaded', () => {
    // 1. Create and Inject HTML Structure if it doesn't exist
    if (!document.getElementById('chat-widget-container')) {
        const chatContainer = document.createElement('div');
        chatContainer.id = 'chat-widget-container';
        chatContainer.innerHTML = `
            <!-- Donate Button (Floating) -->
            <a href="#" class="chat-donate-btn">
                <span>♥</span> Dona aquí
            </a>

            <!-- Chat Window -->
            <div class="chat-window" id="chatWindow">
                <div class="chat-header">
                    <div class="chat-avatar">
                        🤖
                    </div>
                    <div class="chat-info">
                        <h3>MemoriaBot</h3>
                        <span>Asistente Virtual</span>
                    </div>
                    <button class="chat-close" id="chatClose">✕</button>
                </div>
                
                <div class="chat-disclaimer">
                    Para usar esta IA debes aceptar los términos.
                </div>

                <div class="chat-messages" id="chatMessages">
                    <!-- Initial Welcome Message -->
                    <div class="message bot">
                        ¡Hola! Soy tu asistente virtual. Estoy aquí para ayudarte a navegar por la historia de Parral.
                    </div>
                    <div class="message bot">
                        Para empezar, puedes preguntarme sobre:<br>
                        - Fotos antiguas<br>
                        - Historias de familias<br>
                        - Lugares patrimoniales
                    </div>
                </div>

                <div class="chat-input-area">
                    <input type="text" class="chat-input" id="chatInput" placeholder="Escribe tu consulta aquí...">
                    <button class="chat-send" id="chatSend">➤</button>
                </div>
            </div>

            <!-- Floating Action Button -->
            <div class="chat-fab" id="chatToggle">
                <div class="chat-fab-icon">🧠</div>
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

    // 3. Toggle Logic
    function toggleChat() {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            setTimeout(() => chatInput.focus(), 300); // Auto focus for accessibility
        }
    }

    chatToggle.addEventListener('click', toggleChat);
    chatClose.addEventListener('click', toggleChat);

    // 4. Messaging Logic
    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.innerHTML = text; // Allow HTML for line breaks
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto scroll
    }

    function handleUserMessage() {
        const text = chatInput.value.trim();
        if (text === "") return;

        // Add User Message
        addMessage(text, 'user');
        chatInput.value = "";

        // Simulate Bot Response (Simple Heuristics for now)
        setTimeout(() => {
            let response = "Interesante pregunta. Como soy una versión de prueba, te sugiero explorar la sección de 'Galería' para encontrar más sobre eso.";

            const lowerText = text.toLowerCase();
            if (lowerText.includes('hola') || lowerText.includes('buenos')) {
                response = "¡Muy buenas! ¿En qué puedo ayudarte hoy?";
            } else if (lowerText.includes('foto') || lowerText.includes('imagen')) {
                response = "Tenemos más de 19 colecciones de fotos. Puedes verlas en la sección <a href='galeria.html' style='color:#c9a961'>Galería</a>.";
            } else if (lowerText.includes('neruda')) {
                response = "Pablo Neruda es una figura central. Tenemos una colección dedicada a su infancia en Parral.";
            } else if (lowerText.includes('donar') || lowerText.includes('aporte')) {
                response = "¡Gracias por tu interés! Puedes contactarnos directamente para apoyar esta iniciativa de rescate patrimonial.";
            }

            addMessage(response, 'bot');
        }, 1000);
    }

    chatSend.addEventListener('click', handleUserMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserMessage();
    });
});
