const {Donation} = require("../models");

class DonationController {
    async create(req, res, next) {
        try {
            const result = await Donation.create({...req.body, status: 'new'});
            return res.status(201).json(result.toJSON());
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async getAll(req, res, next) {
        try {
            const {page, limit} = req.query;
            const offset = page * limit - limit
            const donationsData = await Donation.findAndCountAll({
                limit, offset, ...(req.query.status ? {where: {status: req.query.status}} : {})
            });
            return res.json({
                ...donationsData,
                rows: donationsData.rows.map(el => ({
                    ...el.toJSON(),
                    image: `http://188.68.220.210/api/uploads/donations/${el.image}`
                }))
            });
        } catch (e) {
            console.log(e);
            next(e);
        }
    }
    async deleteDonation(req, res, next) {
        try {
            const {id} = req.params;
            await Donation.destroy({where: {id}})
            return res.json({deleted: 'ok'});
        } catch (e) {
            console.log(e);
            next(e);
        }
    }
}


module.exports = new DonationController()
