const {
    Application,
    ConsiliumDoctor,
    Diagnostic,
    CheckupPlan,
    Comment,
    User,
    Smeta,
    Smetaplan
} = require('../models');
const {Op} = require('sequelize');

class ApplicationController {
    async create(req, res, next) {
        try {
            const {managerId} = req.body
            const manager = await User.findOne({where: {id: managerId}})
            const applicationData = await Application.create({
                ...req.body,
                managerSignUrlPath: manager.urlSignPath,
                managerId: manager.id
            });
            return res.json(applicationData);
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
        try {
            const {page, limit} = req.query;
            const offset = page * limit - limit
            const applicationsData = await Application.findAndCountAll({
                limit, offset
            });
            return res.json(applicationsData);
        } catch (e) {
            next(e);
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            const applicationsData = await Application.findOne({
                where: {id}, include: [
                    {
                        model: ConsiliumDoctor,
                        separate: true // Отдельный запрос для связи ConsiliumDoctor
                    },
                    {
                        model: Diagnostic,
                        separate: true // Отдельный запрос для связи Diagnostic
                    },
                    {
                        model: CheckupPlan,
                        separate: true, // Отдельный запрос для связи CheckupPlan
                        order: [['id', 'ASC']] // Сортировка CheckupPlan по возрастанию id
                    },
                    {
                        model: Comment,
                        separate: true, // Отдельный запрос для связи Comment
                        order: [['id', 'ASC']] // Сортировка Comment по возрастанию id
                    }
                ]
            });
            const manager = await User.findOne({where: {id: applicationsData.managerId}})
            /**
             * времменное решение ! вернулись к старым гшаблонам а в базе уже есть новые поэтому их переводим к старому виду
             * после реализации новых шаблонов переписать и учесть
             * */
            const prevCommetnsList = applicationsData.Comments
            const isNewFormat = prevCommetnsList.length > 0 && prevCommetnsList[0].title === 'Подопечный (ая) обратился в'
            const newFormatComments = Array(5).fill(null).map(() => ({}));
            if (isNewFormat) {
                newFormatComments[0].comment = prevCommetnsList[0].comment
                newFormatComments[0].title = 'Куда обратился пациент и с какой помощью',
                newFormatComments[1].comment =  prevCommetnsList[2].comment
                newFormatComments[1].title = 'Что было им предоставлено, или наоборот, ничего не было предоставлено, только жалоюы и просьбы'
                newFormatComments[2].comment = prevCommetnsList[4].comment
                newFormatComments[2].title = 'Какая работа была проделана'
                newFormatComments[3].comment = prevCommetnsList[9].comment
                newFormatComments[3].title = 'Почему быоо рекомендовано то, или иное, на основании чего'
                newFormatComments[4].comment = ''
                newFormatComments[4].title = 'Заключение: "По результатам проделанной работы считаю просьбу подопечного (ой) обоснованной (или нет) и возможной для одобрения (или нет)"'
                await Comment.destroy({where: {applicationId: id}});
                for (const comment of newFormatComments) {
                    const result = await Comment.create({...comment});
                    await result.setApplication(applicationsData);
                }
            }
            await applicationsData.update({managerSignUrlPath: manager ? manager.urlSignPath : null});
            return isNewFormat ? res.json({
                ...applicationsData.toJSON(), Comments: newFormatComments
            }) : res.json(applicationsData);
        } catch (e) {
            next(e);
        }
    }

    async getByLetter(req, res, next) {
        try {
            const {fundName, fundRequest, manager, patientName, patientRequest, limit, page, creator} = req.query;
            const offset = page * limit - limit
            const applicationsData = await Application.findAndCountAll({
                where: {
                    ...(creator === 'all' ? {manager: {[Op.like]: `%${manager}%`}} : {managerId: creator}),
                    fundRequest: {[Op.like]: `%${fundRequest}%`},
                    fundName: {[Op.like]: `%${fundName}%`},
                    patientName: {[Op.like]: `%${patientName}%`},
                    patientRequest: {[Op.like]: `%${patientRequest}%`},
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

    async updateappl(req, res, next) {
        try {
            const {
                consiliumDoctors,
                id,
                diagnostic,
                mostProblDiagnosis,
                secondaryDiagnosis,
                checkupPlans,
                complaint,
                anamnesis,
                diagnosticData,
                patientName,
                patientBirthDate,
                comments,
                execDate,
                patientPromoter,
                manager,
                managerSpeciality,
                fundName,
                fundRequest
            } = req.body
            const applicationsData = await Application.findOne({where: {id}});
            await applicationsData.update({
                mostProblDiagnosis,
                secondaryDiagnosis,
                complaint,
                anamnesis,
                diagnosticData,
                patientName,
                patientBirthDate,
                execDate,
                patientPromoter
            })
            await ConsiliumDoctor.destroy({where: {applicationId: id}});
            consiliumDoctors.forEach(async (cDoctor) => {
                const result = await ConsiliumDoctor.create({...cDoctor})
                await result.setApplication(applicationsData)
            })
            await Diagnostic.destroy({where: {applicationId: id}});
            for (const cDoctor of diagnostic) {
                const result = await Diagnostic.create({...cDoctor});
                await result.setApplication(applicationsData);
            }
            await Comment.destroy({where: {applicationId: id}});
            for (const comment of comments) {
                const result = await Comment.create({...comment});
                await result.setApplication(applicationsData);
            }
            const curator = await User.findOne({where: {role: 'coordinator'}})

            let coordinatorURLSignPath = curator?.urlSignPath || ''
            let coordinatorSignFile = curator?.signFileName || ''
            let coordinatorName = curator?.name || ''
            const columnsForSmeta = {
                diagnosis: mostProblDiagnosis || '',
                patientName,
                patientBirthDate,
                patientPromoter,
                managerName:manager,
                managerSpeciality,
                customer:fundName,
                fundRequest,
                coordinatorName,
                coordinatorSignFile,
                coordinatorURLSignPath,
            }
            const [smetaData, created] = await Smeta.findOrCreate({
                where: {applId: id.toString()}, defaults: columnsForSmeta

            })
            if (!created) {
                 await Smeta.update(columnsForSmeta,{where:{applId:id.toString()}})
                await Smetaplan.destroy({where: {smetaId: smetaData.id}})
            }

            await CheckupPlan.destroy({where: {applicationId: id}});
            for (const cDoctor of checkupPlans) {
                const result = await CheckupPlan.create({...cDoctor});
                await result.setApplication(applicationsData);
                await Smetaplan.create({...cDoctor, smetaId: smetaData.id});
            }
            return res.json(applicationsData);
        } catch (e) {
            next(e);
        }
    }

    async updateManager(req, res, next) {
        try {
            const {id, managerId} = req.body
            const applicationsData = await Application.findOne({where: {id}});
            const newManager = await User.findOne({where: {id: managerId}})
            const {name, speciality, urlSignPath} = newManager
            await applicationsData.update({
                managerId,
                manager: name,
                managerSpeciality: speciality,
                managerSignUrlPath: urlSignPath
            })
            return res.json(applicationsData);
        } catch (e) {
            next(e);
        }
    }

    async changeCheckupPlaceDeleteOption(req, res, next) {
        try {
            const {id} = req.body
            const applicationsData = await Application.findOne({where: {id}});
            await applicationsData.update({checkUpPlaceIsDeleted: !applicationsData.checkUpPlaceIsDeleted})
            return res.json({checkUpPlaceIsDeleted: applicationsData.checkUpPlaceIsDeleted});
        } catch (e) {
            next(e);
        }
    }

    async deleteApplication(req, res, next) {
        try {
            const {id} = req.params;
            await Application.destroy({where: {id}})
            return res.json({deleted: 'ok'});
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new ApplicationController();
