const {User, Application, Rights} = require('../models');
const userService = require("../service/user-service");
const {Op} = require('sequelize');
const dayjs = require("dayjs");


const now = dayjs().toDate();
const weekAgo =dayjs().subtract(1, 'week').toDate();
const monthAgo = dayjs().subtract(1, 'month').toDate();
const dayAgoStart = dayjs().subtract(1, 'days').startOf('day').toDate()
const dayAgoEnd = dayjs().subtract(1, 'days').endOf('day').toDate()
 console.log('weekAgo',weekAgo);
console.log('monthAgo',monthAgo);
console.log('dayAgoStart',dayAgoStart);
console.log('dayAgoEnd',dayAgoEnd);

const periodMap = {
    week:{[Op.between]:[weekAgo, now]},
    month:{[Op.between]:[monthAgo, now]},
    today:{[Op.between]:[dayjs().startOf('day').toDate(),now]},
    yesterday:{[Op.between]:[dayAgoStart,dayAgoEnd]},
 }

class AnalyticsController {
    async getUsersRecap(req,res,next){
        const {period} = req.query;
        console.log('period',period);
        console.log('map',periodMap[period]);
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
}

module.exports = new AnalyticsController()