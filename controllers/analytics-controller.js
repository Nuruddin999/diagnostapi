const {User, Application} = require('../models');
const {Op} = require('sequelize');
const dayjs = require("dayjs");
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const isoWeek = require('dayjs/plugin/isoWeek');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isoWeek);

const MSK = 'Europe/Moscow';
const now = dayjs().tz(MSK).toDate();
const weekAgo = dayjs().tz(MSK).startOf('isoWeek').toDate();
const monthAgo = dayjs().tz(MSK).startOf('month').toDate();
const dayAgoStart = dayjs().tz(MSK).subtract(1, 'day').startOf('day').toDate();
const dayAgoEnd = dayjs().tz(MSK).subtract(1, 'day').endOf('day').toDate();


const periodMap = {
    week: {[Op.between]: [weekAgo, now]},
    month: {[Op.between]: [monthAgo, now]},
    today: {[Op.between]: [dayjs().tz(MSK).startOf('day').toDate(), now]},
    yesterday: {[Op.between]: [dayAgoStart, dayAgoEnd]},
}


class AnalyticsController {
    async getUsersRecap(req, res, next) {
        try {
            const {period, fromD, toD} = req.query;
            const users = await User.findAll();
            const exactPeriod = period ? [] :  [new Date(fromD), new Date(toD)]
            const applications = await Application.findAll({
                where: {
                    managerId: {[Op.in]: users.map(el => {
                          return  el.dataValues.id.toString()
                        })},
                    createdAt: period ? periodMap[period]: {[Op.between]: exactPeriod},
                }
            });
            const processedUsers = [...users].map(el => ({
                id: el.dataValues.id,
                name: el.dataValues.name,
                speciality: el.dataValues.speciality,
                applications: applications.map(appl => ({
                    name: appl.dataValues.patientName,
                    birth: appl.dataValues.patientBirthDate,
                    createdAt: appl.dataValues.createdAt,
                    passToCoordinatorTime: appl.dataValues.passToCoordinatorTime,
                    duration:  appl.dataValues.duration || 0
                })),
            }));
            return res.json({users: processedUsers, count: applications.length, period: period ? periodMap[period][Op.between]: exactPeriod});
        } catch (err) {
            next(err);
        }

    }

    async getUsersItemRecap(req, res, next) {
        try {
            const {period, fromD, toD, id} = req.query;
            const user = await User.findOne({
                where: {id},
            });

            const exactPeriod = period ? [] :  [new Date(fromD), new Date(toD)]


            const applications = await Application.findAll({
                where: {
                    managerId: user.dataValues.id.toString(),
                    createdAt: period ? periodMap[period]: {[Op.between]: exactPeriod},
                }
            });




            const processedUser = {
                name: user.dataValues.name,
                speciality: user.dataValues.speciality,
                applications: applications.map(appl => ({
                    name: appl.dataValues.patientName,
                    birth: appl.dataValues.patientBirthDate,
                    createdAt: appl.dataValues.createdAt,
                    passToCoordinatorTime: appl.dataValues.passToCoordinatorTime,
                    duration:  appl.dataValues.duration || 0
                })),
                sessions: user.dataValues.UserSessions
            }

            return res.json({users: [processedUser], count: applications.length, period: period ? periodMap[period][Op.between]: exactPeriod});
        } catch (err) {
            console.error(err);
            next(err);
        }

    }

}

module.exports = new AnalyticsController()