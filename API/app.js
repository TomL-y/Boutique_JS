const express = require('express');
const app = express();
const data = require('./data.json');

const port = 3000;

app.get('/', (req, res) => { res.send('Hello World!') });

app.listen(port, () => console.log(`Server listening on port ${port}`));

app.get('/compo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const compos = data.compos;
    const compo = compos.find(c => c.id === id);
    res.send(compo.titre);
});