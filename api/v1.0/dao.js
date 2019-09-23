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

const addLike = async (id) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM memes WHERE id = ?`, [id], (err, row) => {
            let likes = parseInt(row.likes) + 1;
            db.run(`UPDATE memes SET likes = ? WHERE id = ?`, [likes, id], function (err) {
                if (err) {
                    console.log(err.message);
                    reject(err);
                }
                resolve({ "likes": likes });
            });
        });
    })
}


const getMeme = async (id) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM memes WHERE id = ?`, [id], (err, row) => {
            if (err) {
                console.log(err.message);
                reject(err);
            }
            resolve(row);
        });
    })
}

module.exports = {
    getAll,
    addLike,
    getBest,
    getMeme
}