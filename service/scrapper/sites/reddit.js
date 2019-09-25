const puppeteer = require('puppeteer');

const scrape = async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('https://www.reddit.com/r/memes/hot/');

    let data = await getImgUrls(page);

    await browser.close();
    return data;
}

const getImgUrls = async(page) => {
    await page.waitForSelector('img ', {
        visible: true,
    });

    // Execute code in the DOM
    let data = await page.evaluate(() => {
        const images = document.querySelectorAll('.ImageBox-image');
        const urls = Array.from(images).map(v => v.src);
        return urls
    });

    return data;
}

module.exports = {
    scrape
}