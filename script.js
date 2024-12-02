const chatOutput = document.getElementById("chat-output");
const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");

// Add event listener for Enter key
chatInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

sendButton.addEventListener("click", sendMessage);

async function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    // Display user message
    const userMessageElem = document.createElement("p");
    userMessageElem.textContent = `You: ${userMessage}`;
    chatOutput.appendChild(userMessageElem);
    
    // Clear input
    chatInput.value = "";
    
    // Scroll to bottom
    chatOutput.scrollTop = chatOutput.scrollHeight;

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Display bot message
        const botMessageElem = document.createElement("p");
        botMessageElem.textContent = `Bot: ${data.reply}`;
        chatOutput.appendChild(botMessageElem);
        
        // Scroll to bottom again after bot replies
        chatOutput.scrollTop = chatOutput.scrollHeight;
    } catch (error) {
        console.error("Error:", error);
        // Display error message to user
        const errorElem = document.createElement("p");
        errorElem.textContent = "Error: Failed to get response from bot. Please try again.";
        errorElem.style.color = "red";
        chatOutput.appendChild(errorElem);
    }
}