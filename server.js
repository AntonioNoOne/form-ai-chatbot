require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Servi i file statici dalla cartella public
app.use(express.static(path.join(__dirname, 'public')));

// Route principale che serve Index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Index.html'));
});

// Endpoint per OpenAI
app.post('/api/openai', async (req, res) => {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: req.body.prompt }],
                max_tokens: 150
            })
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Errore nella chiamata OpenAI' });
    }
});

// Endpoint per Google Sheets
app.post('/api/sheets', async (req, res) => {
    try {
        const response = await fetch(process.env.GOOGLE_SHEETS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Errore nel salvataggio su Google Sheets' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server in esecuzione sulla porta ${PORT}`);
});
