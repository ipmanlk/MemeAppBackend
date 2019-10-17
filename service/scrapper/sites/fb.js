const puppeteer = require('puppeteer');
const dao = require(`${__dirname}/../dao.js`);
const hashSum = require('hash-sum');

const scrape = async () => {
    const browser = await puppeteer.launch({
        headless: true
    });

    const pages = [
        "https://www.facebook.com/pg/ApiSriLankanBro/posts/",
        "https://www.facebook.com/pg/trigg3rnation/posts/",
        "https://www.facebook.com/pg/triggernationlka/posts/",
        "https://www.facebook.com/pg/sricastic/posts/",
        "https://www.facebook.com/pg/OfficialPieFM/posts/",
        "https://www.facebook.com/pg/chiku.official/posts/",
        "https://www.facebook.com/pg/SLSavageMemes/posts/",
        "https://www.facebook.com/pg/memeyakaSL/posts/",
        "https://www.facebook.com/pg/CeylonMemes.lk/posts/",
        "https://www.facebook.com/pg/LankanHubs/posts/",
        "https://www.facebook.com/pg/4KMEMEhubOfficial/posts/",
        "https://www.facebook.com/pg/Ceylon404/posts/",
        "https://www.facebook.com/pg/SriHubOFFICIAL/posts/",
        "https://www.facebook.com/pg/SLmemehub/posts/",
        "https://www.facebook.com/pg/TheRealCTB/posts/"
    ];


    for (let fbpage of pages) {
        const page = await browser.newPage();
        await page.goto(fbpage);
        urls = await getImgUrls(page);
        
        for (x=0; x < urls.length; x++) {
            let img = urls[x];
            let hash = hashSum(img);
            dao.save({ img, hash, fbpage });
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
        const images = document.querySelectorAll('.uiScaledImageContainer .scaledImageFitWidth');
        const urls = Array.from(images).map(v => v.src);
        return urls
    });

    return data;
}

module.exports = {
    scrape
}