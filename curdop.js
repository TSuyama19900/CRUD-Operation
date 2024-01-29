const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let list = [
  { id: 1, name: 'Suyama' },
  { id: 2, name: 'Tharaka' },
];

// READ operation
app.get('/list', (req, res) => {
  res.json(list);
});

// CREATE operation
app.post('/list', (req, res) => {
  const newItem = req.body;
  newItem.id = list.length + 1;
  list.push(newItem);

  res.status(201).json(newItem);
});

// Update operation
app.put('/list/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  const index = list.findIndex(item => item.id === itemId);

  if (index !== -1) {
    list[index] = { ...list[index], ...updatedItem };
    res.json(list[index]);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Delete operation
app.delete('/list/:id', (req, res) => {
  const itemId = parseInt(req.params.id);

  list = list.filter(item => item.id !== itemId);

  res.json({ message: 'Item deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
