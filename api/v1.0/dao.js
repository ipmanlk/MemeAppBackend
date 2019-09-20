const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/memes.db');

const getAll = (id) => {
    return new Promise((resolve, reject) => {
        if (id == null) {
            sql = `SELECT * FROM memes ORDER BY id DESC LIMIT 10`;
        } else {
            sql = `SELECT * FROM memes WEHRE id < ${id} ORDER BY id DESC LIMIT 10`;
        }
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(error);
            }
            resolve(rows);
        });
    })
}

module.exports = {
    getAll
}