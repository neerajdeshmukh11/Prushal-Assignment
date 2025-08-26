const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       
  password: 'neeraj@101',       
  database: 'TaskManager' 
});

// 1. Get all tasks
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// 2. Add a new task
app.post('/tasks', (req, res) => {
  const { text } = req.body;
  if (!text || text.length < 3) {
    return res.status(400).json({ error: 'Task text must be at least 3 characters long.' });
  }
  db.query('INSERT INTO tasks (text) VALUES (?)', [text], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, text, completed: false });
  });
});

// 3. Update task status
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const comp = completed ? 1 : 0;

  db.query('UPDATE tasks SET completed = ? WHERE id = ?', [comp, id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Task not found' });
    res.json({ id: Number(id), completed });
  });
});

// 4. Delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted', id: Number(id) });
  });
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL Database');
  }
});

// Add this at the bottom to start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
