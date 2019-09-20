const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/memes.db');

const check = (meme) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM memes WHERE hash = "${meme.hash}"`, [], (err, row) => {
            if (row == undefined) resolve();
            reject("Record already exist!");
        });
    })
}

const save = (meme) => {
    check(meme).then(() => {
        db.run(`INSERT INTO memes(hash, url, date) VALUES(?, ?, CURRENT_TIMESTAMP);`, [meme.hash, meme.url], function (err) {
            if (err) {
                return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        });
    }).catch(err => {
        console.log(err);
    })
};

const clean = () => {
    db.run(`DELETE FROM memes;`, [], function (err) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`Row(s) deleted ${this.changes}`);
    });
};

module.exports = {
    save,
    check
}

