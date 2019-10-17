const puppeteer = require('puppeteer');

const scrape = async () => {
    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();
    const pages = [
        "https://www.facebook.com/pg/ApiSriLankanBro/posts/",
        "https://www.facebook.com/pg/trigg3rnation/posts/",
        "https://www.facebook.com/pg/triggernationlka/posts/",
        "https://www.facebook.com/pg/sricastic/posts/",
        "https://www.facebook.com/pg/OfficialPieFM/posts/",
        "https://www.facebook.com/pg/chiku.official/posts/",
        "https://www.facebook.com/pg/SLSavageMemes/posts/",
        "https://www.facebook.com/pg/memeyakaSL/posts/"
    ];

    let data = [];
    let urls;

    for (let subreddit of pages) {
        await page.goto(subreddit);
        urls = await getImgUrls(page);
        data = data.concat(urls);
    }

    await browser.close();
    return data;
}

const getImgUrls = async (page) => {
    await page.waitForSelector('img ', {
        visible: true,
    });

    // Execute code in the DOM
    let data = await page.evaluate(() => {
        const images = document.querySelectorAll('.uiScaledImageContainer .scaledImageFitWidth');
        const urls = Array.from(images).map(v => v.src);
        return urls
    });

    return data;
}

module.exports = {
    scrape
}