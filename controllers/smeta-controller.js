const {Smeta} = require("../models");

class SmetaController {
    async getAll(req, res, next) {
        try {
            const {page, limit} = req.query;
            const offset = page * limit - limit
            const smetasData = await Smeta.findAndCountAll({
                where: {
                    isReadyForCoordinator: true
                },
                limit, offset
            });
            return res.json(smetasData);
        } catch (e) {
            next(e);
        }
    }

    async updateSmeta(req, res, next) {
        try {
            const {id} = req.body
            const foundedSmeta = await Smeta.findOne({
                where: {
                    applId: id.toString()
                }
            })
            if (!foundedSmeta) {
                return res.json({success: false, message: 'Смета не найдена. Сначала сохраните заключение'});
            }
            await Smeta.update({isReadyForCoordinator: true}, {
                where: {
                    applId: id.toString()
                }
            })
            return res.json({success: true});
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new SmetaController();