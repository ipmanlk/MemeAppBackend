const dao = require("./dao");

const getAll = async (id) => {
    let data = await dao.getAll(id).catch(() => {
        return JSON.stringify({error: "getAll"})
    });
    return JSON.stringify(data);
}

const addLike = async (id) => {
    dao.addLike(id);
}

const getBest = async () => {
    let data = await dao.getBest().catch(() => {
        return JSON.stringify({error: "getBest"})
    });
    return JSON.stringify(data);
}

module.exports = {
    getAll,
    addLike,
    getBest
}