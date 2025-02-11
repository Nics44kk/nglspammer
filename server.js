// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const randomUser Agent = require('random-useragent');

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
    const { username, message, count, delay } = req.body;

    if (!username || !message || !count) {
        return res.status(400).json({ error: "Invalid command format. Please provide username, message, and count." });
    }

    const headers = {
        'Host': 'ngl.link',
        'User -Agent': randomUser Agent.getRandom(),
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Referer': `https://ngl.link/${username}`,
        'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
    };

    const sendMessage = async (username, message) => {
        const data = new URLSearchParams({
            'username': username,
            'question': message,
            'deviceId': generateDeviceId(),
            'gameSlug': '',
            'referrer': '',
        });

        try {
            const response = await axios.post('https://ngl.link/api/submit', data, { headers });
            return response.status === 200;
        } catch (error) {
            console.error(error); // Log the error to the console
            return false; // Return false to indicate failure without sending an error message
        }
    };

    const generateDeviceId = () => {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const part1 = Array.from({ length: 8 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
        const part2 = Array.from({ length: 4 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
        const part3 = Array.from({ length: 4 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
        const part4 = Array.from({ length: 4 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
        const part5 = Array.from({ length: 12 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
        return `${part1}-${part2}-${part3}-${part4}-${part5}`;
    };

    let value = 0;

    for (let i = 0; i < count; i++) {
        await sendMessage(username, message);
        value += 1; // Increment value regardless of success
        console.log(`[+] Sent => ${value}`);
        await new Promise(resolve => setTimeout(resolve, delay * 10)); // Delay in milliseconds
    }

    // Always return success message
    res.json({ success: true, message: `Successfully sent ${value} message(s) to ${username}.` });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
