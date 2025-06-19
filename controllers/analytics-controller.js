const {User, Application} = require('../models');
const {Op} = require('sequelize');
const dayjs = require("dayjs");
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

const MSK = 'Europe/Moscow';
const now = dayjs().tz(MSK).toDate();
const weekAgo = dayjs().tz(MSK).startOf( 'week').toDate();
const monthAgo = dayjs().tz(MSK).startOf( 'month').toDate();
const dayAgoStart = dayjs().tz(MSK).subtract(1, 'day').startOf('day').toDate();
const dayAgoEnd = dayjs().tz(MSK).subtract(1, 'day').endOf('day').toDate();


const periodMap = {
    week:{[Op.between]:[weekAgo, now]},
    month:{[Op.between]:[monthAgo, now]},
    today:{[Op.between]: [dayjs().tz(MSK).startOf('day').toDate(), now]},
    yesterday:{[Op.between]:[dayAgoStart,dayAgoEnd]},
 }

class AnalyticsController {
    async getUsersRecap(req,res,next){
        try {
            const {period} = req.query;
            const users = await User.findAll();
            const applications = await Application.findAll({
                where: {
                    managerId:{[Op.in]:users.map(el=>el.id.toString())},
                    createdAt:periodMap[period],
                    passToCoordinatorTime:periodMap[period],
                }
            });
            const processedUsers = [...users].map(el=>({name: el.dataValues.name, speciality: el.dataValues.speciality ,applications: applications.filter(appl=>appl.managerId.toString() === el.dataValues.id.toString()).length}));
            return res.json({users: processedUsers});
        }
        catch(err){
            next(err);
        }

    }
}

module.exports = new AnalyticsController()