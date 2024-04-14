const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');

function readDatabase(itemDetailId) {
    try {
        const data = fs.readFileSync(`./checkpointsDatabase${itemDetailId}.json`, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return {}; // Return empty object if file does not exist
        } else {
            throw err;
        }
    }
}

function writeDatabase(itemDetailId, database) {
    fs.writeFileSync(`./checkpointsDatabase${itemDetailId}.json`, JSON.stringify(database, null, 2), 'utf8');
}

app.use(express.json());
app.use(express.static('public'));

app.post('/api/update-checkpoint', (req, res) => {
    const { itemDetailId, stepId, isComplete, dueDate, pic } = req.body;
    const database = readDatabase(itemDetailId);
    database[stepId] = { isComplete, dueDate, pic };
    writeDatabase(itemDetailId, database);
    res.json({ message: 'Checkpoint state updated successfully.' });
});

app.get('/api/get-checkpoint', (req, res) => {
    const { itemDetailId, stepId } = req.query;
    const database = readDatabase(itemDetailId);
    const checkpointState = database[stepId] || { isComplete: false };
    res.json(checkpointState);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
