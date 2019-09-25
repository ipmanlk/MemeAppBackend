const request = require('request');
const fs = require('fs');
const hashSum = require('hash-sum');
const dao = require('./dao');

const scrapeImages = async () => {
    const memes = require("./sites/r-memes");
    return await memes.scrape();
}

const download = (uri, hash) => {
    dao.check({ hash: hash }).then(() => {
        let filepath = `./images/${hash}.jpg`;
        request(uri).pipe(fs.createWriteStream(filepath)).on('close', () => {
            dao.save({ img: `${hash}.jpg`, hash: hash })
        });
    }).catch(err => {
        console.log(err);
    })
};

const start = async () => {
    let data = await scrapeImages();
    data.forEach((url) => {
        let hash = hashSum(url);
        download(url, hash);
    })
}

// wait for some time
const delay = ms => new Promise(res => setTimeout(res, ms));

module.exports = {
    start
}