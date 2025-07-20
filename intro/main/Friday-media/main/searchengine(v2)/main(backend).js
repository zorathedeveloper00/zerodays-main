const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory data store
let settingsData = {};

// Handle saving settings (POST)
app.post('/settings', (req, res) => {
  settingsData = req.body;
  console.log('📥 Settings received:', settingsData);
  res.send('Settings saved successfully.');
});

// Handle retrieving settings (GET)
app.get('/settings', (req, res) => {
  console.log('📤 Settings sent:', settingsData);
  res.json(settingsData);
});

// Start server
app.listen(port, () => {
  console.log(`🚀 ZeroDaysAI backend listening at http://localhost:${port}`);
});
