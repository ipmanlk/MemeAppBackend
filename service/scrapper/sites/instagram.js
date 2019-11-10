const NightStalker = require("night-stalker");
const dao = require(`${__dirname}/../dao.js`);
const hashSum = require('hash-sum');

const scrape = async () => {
    const pages = [
        "_v_ery___s_orry_",
        "memevinii",
        "siri_soma",
        "athalma_witharai",
        "maha_hora",
        "2020__a.l",
        "kalawadda",
        "athal_rusiya",
        "athalma_witharai",
        "kuppiya",
        "chatarlanthaya",
        "_v_ery___s_orry_",
        "naifm.im",
        "apisrilankanbro",
        "a_m_d_a_",
        "hitan_page",
        "kuk_kuk_official",
        "dmadu3924",
        "athal_lokka_official"
    ];


    for (let fbpage of pages) {
        const balanar = await NightStalker.loadBrowser();
        balanar.setUserName(fbpage);
        const posts = await balanar.getPosts(5);

        for (let post of posts) {
            let img = post.media[0];
            let hash = hashSum(img);
            let source = fbpage;
            dao.save({ img, hash, source });
        }
    }
}

module.exports = {
    scrape
}