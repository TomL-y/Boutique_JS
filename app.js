// server.js
const express = require('express');
const app = express();
const data = require('./data.json');

const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html');
});

app.use(express.static(__dirname + '/frontend', {
  setHeaders: function (res, path) {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));


app.get('/item', (req, res) => {
  const item = data.item;
  res.json(item);
});

app.get('/compo/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const compos = data.compos;
  const compo = compos.find(c => c.id === id);
  res.send(compo.titre);
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
