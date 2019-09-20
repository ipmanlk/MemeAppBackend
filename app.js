const scrapper = require("./service/scrapper/scrapper");

scrapper.start();

const delay = ms => new Promise(res => setTimeout(res, ms));