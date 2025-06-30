const {
    Smeta,
    Smetaroadcost,
    Smetatransportcost,
    Smetamealcost,
    Smetaroaccomodation,
    Smetacost,
    Smetaplan,
    Smetasecdiag,
    ReworkComment,
    ReworkCommentFile, Application
} = require("../models");
const {Op} = require("sequelize");
const userService = require('../service/user-service');

class SmetaController {

    async getAll(req, res, next) {
        try {
            const {page, limit, status} = req.query;
            const offset = page * limit - limit
            const isAdmin = await userService.defineUserRole(req.user?.email)


            if (!isAdmin && (status === 'oncheck' || status === 'realization')) {
                return res.json({count: 0, rows: []});
            }

            const smetasData = await Smeta.findAndCountAll({
                where: {
                    isReadyForCoordinator: true,
                    status: {
                        [Op.or]: status === 'rework' ? ['rework', null] : [status], // Match 'rework' or NULL
                    },

                },
                limit, offset,
                order: [
                    ['createdAt', 'DESC']
                ]
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
                where: {id, isReadyForCoordinator: true}, include: [
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
                    {
                        model: ReworkComment,
                        separate: true,
                        order: [['id', 'ASC']],
                        include: [
                            {
                                model: ReworkCommentFile,
                                required: false,
                            },
                        ],
                    },
                ]
            });
            return res.json(smetaData);
        } catch (e) {
            next(e);
        }
    }

    async getByLetter(req, res, next) {
        try {
            const {
                customer,
                fundRequest,
                patientPromoter,
                patientName,
                patientRequest,
                limit,
                page,
                status
            } = req.query;
            const offset = page * limit - limit
            const whereQuery = {}
            if (fundRequest && fundRequest.trim() !== '') {
                whereQuery['fundRequest'] = {[Op.iLike]: `%${fundRequest}%`};
            }
            if (patientRequest && patientRequest.trim() !== '') {
                whereQuery.patientRequest = {[Op.iLike]: `%${patientRequest}%`};
            }
            if (patientPromoter && patientPromoter.trim() !== '') {
                whereQuery.patientPromoter = {[Op.iLike]: `%${patientPromoter}%`};
            }
            if (customer && customer.trim() !== '') {
                whereQuery.customer = {[Op.iLike]: `%${customer}%`};
            }
            const applicationsData = await Smeta.findAndCountAll({

                where: {
                    patientName: {[Op.iLike]: `%${patientName}%`},
                    isReadyForCoordinator: true,
                    ...whereQuery,
                    status: {
                        [Op.or]: status === 'rework' ? ['rework', null] : [status],
                    },
                },
                limit, offset,
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            return res.json(applicationsData);
        } catch (e) {
            next(e);
        }
    }

    async updateSmeta(req, res, next) {
        try {
            const {id, diff} = req.body
            const foundedSmeta = await Smeta.findOne({
                where: {
                    applId: id.toString()
                }
            })
            if (!foundedSmeta) {
                return res.json({success: false, message: 'Смета не найдена. Сначала сохраните заключение'});
            }
            await Smeta.update({isReadyForCoordinator: true, status: null}, {
                where: {
                    applId: id.toString()
                }
            })
            const foundedAppl = await Application.findOne({
                where: {
                    id: id.toString()
                }
            })
            const total = (foundedAppl.dataValues.duration || 0) + diff
            await Application.update({passToCoordinatorTime: new Date(), duration: total}, {
                where: {
                    id: id.toString(),
                }
            })
            return res.json({success: true});
        } catch (e) {
            next(e);
        }
    }

    async updateSmetaStatus(req, res, next) {
        try {
            const {id, status} = req.body
            const isAdmin = await userService.defineUserRole(req.user?.email)
            if (!isAdmin && (status === 'rework' || status === 'realization')) {
                return res.json({count: 0, rows: []});
            }
            await Smeta.update({status: status}, {
                where: {
                    id: id.toString()
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
                Smetasecdiags,
                totalAllSum
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
            await Smeta.update({
                patientName,
                patientBirthDate,
                diagnosis,
                managerName,
                managerSpeciality,
                totalAllSum
            }, {
                where: {
                    id: id.toString()
                }
            })
            await Smetaroadcost.destroy({where: {smetaId: id}})
            for (const smetaRoadCostItem of Smetaroadcosts) {
                await Smetaroadcost.create({...smetaRoadCostItem, smetaId: id});
            }
            await Smetaroaccomodation.destroy({where: {smetaId: id}})
            for (const smetaAccomodationCostItem of Smetaroaccomodations) {
                await Smetaroaccomodation.create({...smetaAccomodationCostItem, smetaId: id});
            }
            await Smetamealcost.destroy({where: {smetaId: id}})
            for (const smetaMealCostItem of Smetamealcosts) {
                await Smetamealcost.create({...smetaMealCostItem, smetaId: id});
            }
            await Smetatransportcost.destroy({where: {smetaId: id}})
            for (const smetaTransportCostItem of Smetatransportcosts) {
                await Smetatransportcost.create({...smetaTransportCostItem, smetaId: id});
            }
            await Smetacost.destroy({where: {smetaId: id}})
            for (const smetaCostItem of Smetacosts) {
                await Smetacost.create({...smetaCostItem, smetaId: id});
            }
            await Smetaplan.destroy({where: {smetaId: id}})
            for (const smetaPlanItem of Smetaplans) {
                await Smetaplan.create({...smetaPlanItem, smetaId: id});
            }
            await Smetasecdiag.destroy({where: {smetaId: id}})
            for (const smetaSecDiagsItem of Smetasecdiags) {
                await Smetasecdiag.create({...smetaSecDiagsItem, smetaId: id});
            }
            return res.json({success: true});
        } catch
            (e) {
            next(e);
        }
    }

    async deleteSmeta(req, res, next) {
        try {
            const {id} = req.params;
            await Smeta.destroy({where: {id}})
            return res.json({deleted: 'ok'});
        } catch (e) {
            next(e);
        }
    }

    async addReworkComment(req, res, next) {
        try {
            const {comment, smetaId, applId} = req.body
            const result = await ReworkComment.create({comment, ...(applId !== undefined ? {applicationId: applId} : {smetaId})})
            if (applId !== undefined) {
                await Smeta.update({isReadyForCoordinator: false}, {
                    where: {
                        id: smetaId.toString()
                    }
                })
            }
            return res.json({added: result.id});
        } catch (e) {
            next(e);
        }
    }
}

module
    .exports = new SmetaController();