
const chatOutput = document.getElementById("chat-output");
const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", async () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    const userMessageElem = document.createElement("p");
    userMessageElem.textContent = `You: ${userMessage}`;
    chatOutput.appendChild(userMessageElem);

    chatInput.value = "";

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        const botMessageElem = document.createElement("p");
        botMessageElem.textContent = `Bot: ${data.reply}`;
        chatOutput.appendChild(botMessageElem);
    } catch (error) {
        console.error("Error:", error);
    }
});
