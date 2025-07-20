const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

app.post('/api/save-preference', (req, res) => {
    const { password } = req.body;
    // Logic to save password preference (e.g., to a database)
    res.status(200).send({ message: 'Preference saved successfully!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});