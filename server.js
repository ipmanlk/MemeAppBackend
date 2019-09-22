const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/meme', express.static('./images'));

const api = require("./api/v1.0/api");

app.get('/api/memes', async (req, res) => {
    let data = await api.getAll(null);
    res.send(data);
});

app.get('/api/memes/:id', async (req, res) => {
    let data = await api.getAll(req.params.id);
    res.send(data);
});

app.get('/api/best', async (req, res) => {
    let data = await api.getBest();
    res.send(data);
});

app.put('/api/like/:id', async (req, res) => {
    api.addLike(req.params.id);
    res.send("0");
});

app.listen(port, () => console.log(`MemeApp app listening on port ${port}!`));