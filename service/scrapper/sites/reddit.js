const puppeteer = require('puppeteer');

const scrape = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--proxy-server=socks5://127.0.0.1:9050']
    });

    // const browser = await puppeteer.launch({
    //     headless: true
    // });

    const page = await browser.newPage();
    const subreddits = [
        "https://www.reddit.com/r/memes/hot/",
        "https://www.reddit.com/r/raimimemes/hot/",
        "https://www.reddit.com/r/PrequelMemes/hot/",
        "https://www.reddit.com/r/raimimemes/hot/"
    ];

    let data = [];
    let urls;

    for (let subreddit of subreddits) {
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
        const images = document.querySelectorAll('.ImageBox-image');
        const urls = Array.from(images).map(v => v.src);
        return urls
    });

    return data;
}

module.exports = {
    scrape
}