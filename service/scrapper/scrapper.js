const hashSum = require('hash-sum');
const dao = require(`${__dirname}/dao.js`);

const scrapeImages = async () => {
    const site = require(`${__dirname}/sites/fb`);
    return await site.scrape();
}

const start = async () => {
    let data = await scrapeImages();
    Object.keys(data).forEach((source) => {
        data[source].forEach(img => {
            let hash = hashSum(img);
            dao.save({ img, hash, source });
        });
    })
}

// wait for some time
const delay = ms => new Promise(res => setTimeout(res, ms));
start()
module.exports = {
    start
}