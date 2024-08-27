document.getElementById('send-button').addEventListener('click', function() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();

    if (messageText) {
        const chatMessages = document.getElementById('chat-messages');

        // Create the new chat message element
        const newMessage = document.createElement('div');
        newMessage.classList.add('chat-message', 'right'); // Message bubble on the right side
        newMessage.innerHTML = `<p>${messageText}</p>`;

        // Append the new message to the chat messages container
        chatMessages.appendChild(newMessage);

        // Scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Clear the input
        messageInput.value = '';
    }
});
