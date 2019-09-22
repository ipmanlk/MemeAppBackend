const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/memes.db');

const getAll = (id) => {
    return new Promise((resolve, reject) => {
        if (id == null) {
            sql = `SELECT id, img, date, likes FROM memes ORDER BY id DESC LIMIT 10`;
        } else {
            sql = `SELECT id, img, date, likes FROM memes WHERE id < ${id} ORDER BY id DESC LIMIT 10`;
        }
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    })
}

const getBest = () => {
    return new Promise((resolve, reject) => {
        sql = "SELECT id, img, date, likes FROM memes ORDER BY likes DESC LIMIT 10";
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    })
}

const addLike = (id) => {
    db.get(`SELECT * FROM memes WHERE id = ?`, [id], (err, row) => {
        let likes = parseInt(row.likes) + 1;
        db.run(`UPDATE memes SET likes = ? WHERE id = ?`, [likes, id], function (err) {
            if (err) {
                return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been updated.`);
        });
    });
}

module.exports = {
    getAll,
    addLike,
    getBest
}