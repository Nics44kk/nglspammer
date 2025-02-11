const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/ngl', async (req, res) => {
    const { nglusername, message, amount } = req.body;

    if (!nglusername || !message || !amount) {
        return res.status(400).send("Invalid command format. Please use /ngl [username] [message] [amount]");
    }

    try {
        const headers = {
            'referer': `https://ngl.link/${nglusername}`,
            'accept-language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
        };

        const data = {
            'username': nglusername,
            'question': message,
            'deviceId': 'ea356443-ab18-4a49-b590-bd8f96b994ee',
            'gameSlug': '',
            'referrer': '',
        };

        let value = 0;
        for (let i = 0; i < amount; i++) {
            await axios.post('https://ngl.link/api/submit', data, { headers });
            value += 1;
            console.log(`[+] Sent => ${value}`);
        }

        res.status(200).send(`Successfully sent ${amount} message(s) to ${nglusername} through ngl.link.`);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while sending the message through ngl.link.");
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
