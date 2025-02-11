// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files from the public directory

// Serve index.html on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to send messages
app.post('/send-message', async (req, res) => {
    const { username, message, amount } = req.body;

    if (!username || !message || !amount) {
        return res.status(400).json({ error: "Invalid command format. Please provide username, message, and amount." });
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
        }
        res.json({ success: true, message: `Successfully sent ${amount} message(s) to ${username} through ngl.link.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while sending the message through ngl.link." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
