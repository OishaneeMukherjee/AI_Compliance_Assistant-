document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const quickReplies = document.querySelectorAll('.quick-reply');
    
    // Toggle chatbot window
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function() {
            chatbotWindow.classList.toggle('active');
        });
    }
    
    // Close chatbot window
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function() {
            chatbotWindow.classList.remove('active');
        });
    }
    
    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            chatbotInput.value = '';
            
            // Show typing indicator
            showTypingIndicator();
            
            // Bot response after a delay
            setTimeout(() => {
                removeTypingIndicator();
                respondToMessage(message);
            }, 1500);
        }
    }
    
    // Send message on button click
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }
    
    // Send message on Enter key
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Quick replies
    if (quickReplies.length > 0) {
        quickReplies.forEach(reply => {
            reply.addEventListener('click', function() {
                const query = this.getAttribute('data-query');
                chatbotInput.value = query;
                sendMessage();
            });
        });
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(sender + '-message');
        messageElement.textContent = text;
        
        // Add timestamp
        const timeElement = document.createElement('div');
        timeElement.classList.add('message-time');
        timeElement.textContent = getCurrentTime();
        messageElement.appendChild(timeElement);
        
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.classList.add('typing-indicator');
        typingElement.id = 'typingIndicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.classList.add('typing-dot');
            typingElement.appendChild(dot);
        }
        
        chatbotMessages.appendChild(typingElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Remove typing indicator
    function removeTypingIndicator() {
        const typingElement = document.getElementById('typingIndicator');
        if (typingElement) {
            typingElement.remove();
        }
    }
    
    // Get current time for message timestamp
    function getCurrentTime() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' + 
               now.getMinutes().toString().padStart(2, '0');
    }
    
    // Bot responses
    function respondToMessage(message) {
        message = message.toLowerCase();
        let response = "";
        
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            response = "Hello! How can I assist you with LEGALOGIC today?";
        } else if (message.includes('upload') || message.includes('document')) {
            response = "To upload a compliance document, go to the Upload section and either drag & drop your file or click to browse. Supported formats: PDF, DOCX, and TXT.";
        } else if (message.includes('task') || message.includes('extract') || message.includes('extraction')) {
            response = "Task extraction analyzes your compliance documents and identifies actionable items. Go to Extract Tasks, select a notice, and click 'Extract Tasks' to begin.";
        } else if (message.includes('alert') || message.includes('notification')) {
            response = "Alerts notify you about important compliance deadlines and issues. You can configure alert preferences in your Account Settings.";
        } else if (message.includes('simplify')) {
            response = "The Simplify feature helps make complex compliance language easier to understand. It's especially useful for lengthy legal documents.";
        } else if (message.includes('dashboard')) {
            response = "The Dashboard provides an overview of your compliance status, recent activities, and quick access to all important functions.";
        } else if (message.includes('profile') || message.includes('account')) {
            response = "You can update your personal information, notification preferences, and other account settings in the Profile section.";
        } else {
            response = "I'm here to help with LEGALOGIC-related questions. You can ask me about uploading documents, extracting tasks, compliance alerts, or using any other feature.";
        }
        
        addMessage(response, 'bot');
        
        // Add quick replies for follow-up questions
        if (!message.includes('hello') && !message.includes('hi') && !message.includes('hey')) {
            const quickRepliesContainer = document.createElement('div');
            quickRepliesContainer.classList.add('quick-replies');
            
            const followUps = [
                {query: "How to upload a document?", text: "Upload help"},
                {query: "What is task extraction?", text: "Task extraction"},
                {query: "Explain compliance alerts", text: "Alerts info"},
                {query: "How does Simplify work?", text: "Simplify feature"}
            ];
            
            followUps.forEach(item => {
                const reply = document.createElement('div');
                reply.classList.add('quick-reply');
                reply.setAttribute('data-query', item.query);
                reply.innerHTML = `<i class="fas fa-reply"></i> ${item.text}`;
                
                reply.addEventListener('click', function() {
                    const query = this.getAttribute('data-query');
                    chatbotInput.value = query;
                    sendMessage();
                });
                
                quickRepliesContainer.appendChild(reply);
            });
            
            const lastMessage = chatbotMessages.lastChild;
            lastMessage.appendChild(quickRepliesContainer);
        }
    }
});