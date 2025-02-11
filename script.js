// script.js
document.getElementById('nglForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;
    const amount = document.getElementById('amount').value;

    try {
        const response = await fetch('/ngl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, message, amount }),
        });

        const result = await response.json();
        document.getElementById('response').innerText = result.message;
    } catch (error) {
        document.getElementById('response').innerText = "An error occurred.";
        console.error(error);
    }
});
