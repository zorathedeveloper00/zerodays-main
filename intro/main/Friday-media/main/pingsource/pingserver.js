const express = require('express');
const cors = require('cors');
const ping = require('ping');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/ping', async (req, res) => {
    const { host } = req.body;

    if (!host) {
        return res.status(400).json({ error: 'Host is required' });
    }

    try {
        const response = await ping.promise.probe(host);
        res.json({
            host: response.input,
            alive: response.alive,
            time: response.time,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to ping host' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});