const express = require('express');
const app = express();
const port = 3000;

app.get('/', async(req, res) => {
    if (req.query.api) {
        let apiVersion = req.query.api;
        let api = require(`./api/${apiVersion}/api.js`);
        let data = await api.handle(req);
        res.send(data);
    }
});

app.listen(port, () => console.log(`MemeApp app listening on port ${port}!`));