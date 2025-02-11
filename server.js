// server.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/ngl', async (req, res) => {
    const { username, message, amount } = req.body;

    // Your existing code logic here...

    res.json({ message: `Successfully sent ${amount} message(s) to ${username}.` });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
