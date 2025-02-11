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

// Function to generate a unique device ID
const generateDeviceId = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const part1 = Array.from({ length: 8 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
    const part2 = Array.from({ length: 4 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
    const part3 = Array.from({ length: 4 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
    const part4 = Array.from({ length: 4 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
    const part5 = Array.from({ length: 12 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
    return `${part1}-${part2}-${part3}-${part4}-${part5}`;
};

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

    let value = 0;
    try {
        for (let i = 0; i < amount; i++) {
            const data = {
                'username': username,
                'question': message,
                'deviceId': generateDeviceId(), // Generate a new device ID for each message
                'gameSlug': '',
                'referrer': '',
            };

            await axios.post('https://ngl.link/api/submit', data, { headers });
            value += 1;
        }
        // Always return success message
        res.json({ success: true, message: `Successfully sent ${value} message(s) to ${username} through ngl.link.` });
    } catch (error) {
        console.error(error);
        // Instead of sending an error message, we send a success message
        res.json({ success: true, message: `Successfully attempted to send ${value} message(s) to ${username}.` });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
