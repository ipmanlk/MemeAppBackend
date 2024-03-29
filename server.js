const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const api = require("./api/v1.0/api");

app.get('/api/memes', async (req, res) => {
    let data = await api.getAll(null);
    res.send(data);
});

app.get('/api/meme/:id', async (req, res) => {
    let data = await api.getMeme(req.params.id);
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
    let data = await api.addLike(req.params.id);
    res.send(data);
});


app.listen(port, () => console.log(`MemeApp app listening on port ${port}!`));