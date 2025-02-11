// script.js
const axios = require('axios');

document.getElementById('messageForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;
    const amount = document.getElementById('amount').value;

    if (!username || !message || !amount) {
        document.getElementById('response').innerText = "Invalid command format. Please fill all fields.";
        return;
    }

    const headers = {
        'referer': `https://ngl.link/${username}`,
        'accept-language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
    };

    const data = {
        'username': username,
        'question': message,
        'deviceId': 'ea356443-ab18-4a49-b590-bd8f96b994ee',
        'gameSlug': '',
        'referrer': '',
    };

    let value = 0;
    try {
        for (let i = 0; i < amount; i++) {
            await axios.post('https://ngl.link/api/submit', data, { headers });
            value += 1;
            console.log(`[+] Send => ${value}`);
        }
        document.getElementById('response').innerText = `Successfully sent ${amount} message(s) to ${username} through ngl.link.`;
    } catch (error) {
        console.log(error);
        document.getElementById('response').innerText = "An error occurred while sending the message through ngl.link.";
    }
});
