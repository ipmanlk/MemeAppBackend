const dao = require("./dao");

const getAll = async (id) => {
    let data = await dao.getAll(id).catch(() => {
        return JSON.stringify({error: "getAll"})
    });
    return JSON.stringify(data);
}

const addLike = async (id) => {
    let data = await dao.addLike(id).catch(() => {
        return JSON.stringify({error: "addLike"})
    });
    return JSON.stringify(data);
}

const getBest = async () => {
    let data = await dao.getBest().catch(() => {
        return JSON.stringify({error: "getBest"})
    });
    return JSON.stringify(data);
}

const getMeme = async (id) => {
    let data = await dao.getMeme(id).catch(() => {
        return JSON.stringify({error: "getMeme"})
    });

    return JSON.stringify(data);
}


module.exports = {
    getAll,
    addLike,
    getBest,
    getMeme
}