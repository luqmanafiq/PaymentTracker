const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');

// Helper function to read the database
function readDatabase() {
    try {
        const data = fs.readFileSync('./checkpointsDatabase.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') {
            // File does not exist or is empty, return an empty object
            return {};
        } else {
            // Handle other errors
            throw err;
        }
    }
}


// Helper function to write to the database
function writeDatabase(database) {
    fs.writeFileSync('./checkpointsDatabase.json', JSON.stringify(database, null, 2), 'utf8');
}

app.use(express.json());
app.use(express.static('public'));

app.post('/api/update-checkpoint', (req, res) => {
    const { stepId, isComplete, dueDate, pic } = req.body;
    const database = readDatabase();
    // Update the database with the new state
    database[stepId] = { isComplete, dueDate, pic };
    writeDatabase(database);
    res.json({ message: 'Checkpoint state updated successfully.' });
});

app.get('/api/get-checkpoint', (req, res) => {
    const { stepId } = req.query;
    const database = readDatabase();
    const checkpointState = database[stepId] || { isComplete: false };
    res.json(checkpointState);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
