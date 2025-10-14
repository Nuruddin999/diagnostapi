const {Donation} = require("../models");

class DonationController {
    async create(req, res, next) {
        try {
            await Donation.create({...req.body, status:'new'});
        }
        catch (err) {
            next(err);
        }

    }
}

module.exports = new DonationController()
