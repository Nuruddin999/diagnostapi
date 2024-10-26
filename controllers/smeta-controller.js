const {
    Smeta,
    Smetaroadcost,
    Smetatransportcost,
    Smetamealcost,
    Smetaroaccomodation,
    Smetacost,
    Smetaplan,
    Smetasecdiag,
} = require("../models");

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

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            const smetaData = await Smeta.findOne({
                where: {id}, include: [
                    {
                        model: Smetaroadcost,
                        separate: true
                    },
                    {
                        model: Smetaroaccomodation,
                        separate: true
                    },
                    {
                        model: Smetamealcost,
                        separate: true,
                        order: [['id', 'ASC']]
                    },
                    {
                        model: Smetatransportcost,
                        separate: true,
                        order: [['id', 'ASC']]
                    },
                    {
                        model: Smetacost,
                        separate: true,
                        order: [['id', 'ASC']]
                    },
                    {
                        model: Smetaplan,
                        separate: true,
                        order: [['id', 'ASC']]
                    },
                    {
                        model: Smetasecdiag,
                        separate: true,
                        order: [['id', 'ASC']]
                    },
                ]
            });
            return res.json(smetaData);
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

    async updateSmetaFields(req, res, next) {
        try {
            const {
                id,
                patientName,
                patientBirthDate,
                diagnosis,
                managerName,
                managerSpeciality,
                Smetaplans,
                Smetacosts,
                Smetaroaccomodations,
                Smetaroadcosts,
                Smetatransportcosts,
                Smetamealcosts,
                smetaSecDiags,
            } = req.body
            const foundedSmeta = await Smeta.findOne({
                where: {
                    id: id.toString()
                }
            })
            if
            (!foundedSmeta) {
                return res.json({success: false, message: 'Смета не найдена. Сначала сохраните заключение'});
            }
            await Smeta.update({patientName,patientBirthDate,diagnosis,managerName,managerSpeciality}, {
                where: {
                    id: id.toString()
                }
            })
            await Smetaroadcost.destroy({where:{smetaId:id}})
            for (const smetaRoadCostItem of Smetaroadcosts) {
             await Smetaroadcost.create({...smetaRoadCostItem, smetaId:id});
            }
            await Smetaroaccomodation.destroy({where:{smetaId:id}})
            for (const smetaAccomodationCostItem of Smetaroaccomodations) {
                await Smetaroaccomodation.create({...smetaAccomodationCostItem, smetaId:id});
            }
            await Smetamealcost.destroy({where:{smetaId:id}})
            for (const smetaMealCostItem of Smetamealcosts) {
                await Smetamealcost.create({...smetaMealCostItem, smetaId:id});
            }
            await Smetatransportcost.destroy({where:{smetaId:id}})
            for (const smetaTransportCostItem of Smetatransportcosts) {
                await Smetatransportcost.create({...smetaTransportCostItem, smetaId:id});
            }
            await Smetacost.destroy({where:{smetaId:id}})
            for (const smetaCostItem of Smetacosts) {
                await Smetacost.create({...smetaCostItem, smetaId:id});
            }
            await Smetaplan.destroy({where:{smetaId:id}})
            for (const smetaPlanItem of Smetaplans) {
                await Smetaplan.create({...smetaPlanItem, smetaId:id});
            }
            return res.json({success: true});
        } catch
            (e) {
            next(e);
        }
    }
}

module
    .exports = new SmetaController();