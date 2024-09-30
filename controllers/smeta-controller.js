const {Smeta} = require("../models");

class SmetaController {
    async getAll(req, res, next) {
        try {
            const {page, limit} = req.query;
            const offset = page * limit - limit
            const smetasData = await Smeta.findAndCountAll({
                limit, offset
            });
            return res.json(smetasData);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new SmetaController();