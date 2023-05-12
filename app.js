// server.js
const express = require('express');
const path = require('path');
const app = express();
const data = require('./data.json');

const port = 3000;

app.use(express.static(path.join(__dirname, 'frontend'), {
  setHeaders: function (res, path) {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/detail', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'detail.html'));
});

app.get('/item', (req, res) => {
  const item = data.item;
  res.json(item);
});

app.get('/item/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const items = data.item;
  console.log('Data:', data); 
  console.log('Items:', items); 
  console.log('Requested ID:', id); 
  const item = items.find(c => c.id === id);
  console.log('Found item:', item); 
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});



app.listen(port, () => console.log(`Server listening on port ${port}`));
