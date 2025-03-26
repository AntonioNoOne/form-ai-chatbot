// Funzione per chiamare OpenAI
async function callOpenAI(prompt) {
    try {
        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });
        return await response.json();
    } catch (error) {
        console.error('Errore nella chiamata OpenAI:', error);
        throw error;
    }
}

// Funzione per salvare i dati su Google Sheets
async function saveToGoogleSheets(data) {
    try {
        const response = await fetch('/api/sheets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response;
    } catch (error) {
        console.error('Errore nel salvataggio su Google Sheets:', error);
        throw error;
    }
}

// Esporta le funzioni
window.api = {
    callOpenAI,
    saveToGoogleSheets
}; 