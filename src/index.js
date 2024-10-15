const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

let users = [];
let id = 1;

app.post('/users', (req, res) => {
    const {name, email} = req.body;
    if (!name || !email) {
        return res.status(400).json({error: 'Missing name and/or email'})
    }
    const newUser = {id: id++, name, email};
    users.push(newUser);
    res.status(201).json(newUser);
});

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(i => i.id === userId);
    if (!user) {
        return res.status(404).json({error: 'User not found'});
    }
    res.json(user);
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(i => i.id === userId);
    if (!user) {
        return res.status(404).json({error: 'User not found'});
    }
    const {name, email} = req.body;
    if (!name || !email) {
        return res.status(400).json({error: 'Missing name and/or email'})
    }
    user.name = name
    user.email = email
    res.json(user);
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(i => i.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({error: 'User not found'});
    }
    users.splice(userIndex, 1);
    res.status(204).send();
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing