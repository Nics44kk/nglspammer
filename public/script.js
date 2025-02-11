// script.js
document.getElementById('messageForm').addEventListener('submit', async function(event) event.preventDefault();

    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;
    const amount = document.getElementById('amount').value;

    try {
        const response = await fetch('http://localhost:3000/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, message, amount }),
        });

        const data = await response.json();
        document.getElementById('response').innerText = data.success ? data.message : data.error;
    } catch (error) {
        document.getElementById('response').innerText = "An error occurred while sending the message.";
    }
});
