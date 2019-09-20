const puppeteer = require('puppeteer');
const request = require('request');
const fs = require('fs');
const sha256 = require('simple-sha256');
const dao = require('./dao');

const scrapeImages = async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('https://proxysite.site/index.php?q=ztjXoaZzlGGo26dm2MeUl8zaj5qoo5DWZtPIn8qlk5vV2A');

    await page.waitForSelector('img ', {
        visible: true,
    });

    // Execute code in the DOM
    const data = await page.evaluate(() => {
        const images = document.querySelectorAll('.ImageBox-image');
        const urls = Array.from(images).map(v => v.src);
        return urls
    });

    await browser.close();
    return data;
}

const download = (uri, hash) => {
    dao.check({hash: hash}).then(() => {
        let filepath = `./images/${hash}.jpg`;
        request(uri).pipe(fs.createWriteStream(filepath)).on('close', async() => {
            let url = await upload(filepath);
            fs.unlinkSync(filepath);
            dao.save({ url: url, hash: hash })
        });
    }).catch(err => {
        // console.log(err);
    })
};

const start = async () => {
    let data = await scrapeImages();
    data.forEach(async (url) => {
        let imageHash = await sha256(url);
        let hash = imageHash.substring(0, 9);
        download(url, hash);
    })
}

const upload = (filepath) => {
    return new Promise((resolve, reject) => {
        const req = request.post("https://0x0.st/", function (err, resp, body) {
            if (err) {
                reject(err);
            } else {
                if (/^(ftp|http|https):\/\/[^ "]+$/.test(body)) {
                    resolve(body);
                } else {
                    reject(body);
                }
            }
        });
        const form = req.form();
        form.append('file', fs.createReadStream(filepath));
    })
}

// wait for some time
const delay = ms => new Promise(res => setTimeout(res, ms));

module.exports = {
    start
}