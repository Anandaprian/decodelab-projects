const express = require('express');
const app = express();
app.use(express.json());

const tasks = [];

app.get('/tasks', (req, res) => {
    res.status(200).json({ tasks: tasks, count: tasks.length });
});

app.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required and cannot be empty' });
    }

    const newTask = { id: tasks.length + 1, title: title.trim() };
    tasks.push(newTask);

    res.status(201).json({ message: 'Task created successfully', task: newTask });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});