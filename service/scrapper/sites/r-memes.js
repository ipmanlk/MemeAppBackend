const puppeteer = require('puppeteer');

const scrape = async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('https://www.reddit.com/r/memes/');

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

module.exports = {
    scrape
}