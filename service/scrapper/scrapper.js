const start = async () => {
    const site = require(`${__dirname}/sites/instagram`);
    await site.scrape();
}

// wait for some time
const delay = ms => new Promise(res => setTimeout(res, ms));

module.exports = {
    start
}