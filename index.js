const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

let tasks = [
  { id: 1, title: 'Task 1', description: 'Task 1 description', status: 'pending' },
  { id: 2, title: 'Task 2', description: 'Task 2 description', status: 'completed' }
];

app.post('/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('Task not found');
  res.json(task);
});

app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('Task not found');

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.status = req.body.status || task.status;

  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).send('Task not found');

  const deletedTask = tasks.splice(taskIndex, 1);
  res.json(deletedTask);
});

app.listen(PORT, () => {
    console.log(`Dashboard => Listening To ${PORT}`);
});