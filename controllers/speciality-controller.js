const userService = require('../service/user-service');
const { Speciality } = require('../models');
const ApiError = require('../exceptions/api-error');
const { Op } = require('sequelize');

class SpecialityController {
    async create(req, res, next) {
        try {
            const { speciality } = req.body
            console.log(speciality.speciality)
            const alreadyCreated = await Speciality.findOne({ where: { name:speciality } })
            if(!alreadyCreated){
                const specialityData = await Speciality.create({ name:speciality});
                return res.json(specialityData);
            }
            throw ApiError.BadRequest(`уже существует`)
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
        try {
            const { page, limit } = req.query;
            const offset = page * limit - limit
            const specialityData = await Speciality.findAndCountAll({
                limit, offset,   order: [
                    ['createdAt', 'DESC']
                ]
            });
            return res.json(specialityData);
        } catch (e) {
            next(e);
        }
    }

    async deleteSpeciality(req, res, next) {
        try {
            const { id } = req.params;
            await Speciality.destroy({ where: { id } })
            return res.json({ deleted: 'ok' });
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new SpecialityController();
