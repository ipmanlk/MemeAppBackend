const dao = require("./dao");

const handle = async(req) => {
    let id = (req.id) ? req.id : null;
    let data = await dao.getAll(id);
    return JSON.stringify(data);
}

module.exports = {
    handle
}