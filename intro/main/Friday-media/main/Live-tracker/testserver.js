const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // Serve index.html and assets

const logFile = 'tracker_logs.txt';

app.post('/track', (req, res) => {
  const { timestamp, message } = req.body;
  if (timestamp && message) {
    const logEntry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logFile, logEntry);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

app.get('/logs', (req, res) => {
  if (fs.existsSync(logFile)) {
    res.send(fs.readFileSync(logFile, 'utf-8'));
  } else {
    res.send('');
  }
});

app.listen(PORT, () => console.log(`Tracker API running at http://localhost:${PORT}`));
