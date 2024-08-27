const express = require('express');
const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
const PORT = process.env.PORT || 3006;

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Serve chat.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

// Setting up the CSV Writer
const csvPath = path.join(__dirname, 'messages.csv');
const csvHeaders = [
    { id: 'text', title: 'Text' },
    { id: 'sender', title: 'Sender' }
];

const writer = csvWriter({
    path: csvPath,
    header: csvHeaders,
    append: true, // Ensures that data is appended to the CSV file
});

// Route to save a new message
app.post('/save-message', (req, res) => {
    const { text, sender } = req.body;

    writer.writeRecords([{ text, sender }])
        .then(() => {
            res.sendStatus(200); // Send a success status code
        })
        .catch(error => {
            console.error('Error writing to CSV:', error);
            res.sendStatus(500); // Send an error status code if writing fails
        });
});

// Route to get all messages
app.get('/get-messages', (req, res) => {
    fs.readFile(csvPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading CSV file:', err);
            return res.status(500).json([]);
        }

        const lines = data.trim().split('\n');
        if (lines.length > 1) {
            const messages = lines.slice(1).map(line => {
                const [text, sender] = line.split(',');
                return { text, sender };
            });
            res.json(messages);
        } else {
            res.json([]);
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
