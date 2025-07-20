// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let settingsDB = {};
const dbPath = path.join(__dirname, 'settings.json');

if (fs.existsSync(dbPath)) {
  try {
    settingsDB = JSON.parse(fs.readFileSync(dbPath));
  } catch (err) {
    console.error('Error reading settings file:', err);
  }
}

function saveToFile() {
  fs.writeFileSync(dbPath, JSON.stringify(settingsDB, null, 2));
}

app.post('/settings/:userId', (req, res) => {
  const userId = req.params.userId;
  settingsDB[userId] = req.body;
  saveToFile();
  res.send(`✅ Settings saved for user: ${userId}`);
});

app.get('/settings/:userId', (req, res) => {
  const userId = req.params.userId;
  res.json(settingsDB[userId] || {});
});

app.get('/', (req, res) => {
  res.send('🚀 ZeroDaysAI Settings API is live!');
});

app.listen(port, () => {
  console.log(`🌐 Backend listening at http://localhost:${port}`);
});
