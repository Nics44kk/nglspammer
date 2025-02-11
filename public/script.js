// script.js
document.getElementById('messageForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;
    const amount = document.getElementById('amount').value;

    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = '';

    try {
        const response = await fetch('/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, message, amount }),
        });

        const data = await response.json();
        if (response.ok) {
            responseDiv.innerHTML = data.message;
        } else {
            responseDiv.innerHTML = data.error;
        }
    } catch (error) {
        responseDiv.innerHTML = 'An error occurred while sending the message.';
    }
});
