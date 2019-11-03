const puppeteer = require('puppeteer');
const dao = require(`${__dirname}/../dao.js`);
const hashSum = require('hash-sum');

const scrape = async () => {
    const browser = await puppeteer.launch({
        headless: true
    });

    const pages = [
        "https://www.instagram.com/_v_ery___s_orry_",
        "https://www.instagram.com/memevinii",
        "https://www.instagram.com/siri_soma",
        "https://www.instagram.com/athalma_witharai",
        "https://www.instagram.com/maha_hora",
        "https://www.instagram.com/2020__a.l",
        "https://www.instagram.com/kalawadda",
        "https://www.instagram.com/athal_rusiya"
    ];

    const page = await browser.newPage();
    page.waitForNavigation({ timeout: 0 });

    for (let fbpage of pages) {
        await page.goto(fbpage);
        page.waitForNavigation({ timeout: 0 });
        urls = await getImgUrls(page);
        urls.reverse();
        for (x = 0; x < urls.length; x++) {
            let img = urls[x];
            let hash = hashSum(img);
            let source = fbpage;
            dao.save({ img, hash, source });
        }
    }

    await browser.close();
}

const getImgUrls = async (page) => {
    await page.waitForSelector('img ', {
        visible: true,
    });

    // Execute code in the DOM
    let data = await page.evaluate(() => {
        const images = document.querySelectorAll('.KL4Bh img');
        const urls = Array.from(images).map(v => v.src);
        return urls
    });

    return data;
}

module.exports = {
    scrape
}