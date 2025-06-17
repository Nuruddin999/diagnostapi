const {User, Application, Rights} = require('../models');
const userService = require("../service/user-service");
const {Op} = require('sequelize');


const now = new Date();
const weekAgo = new Date();
weekAgo.setDate(now.getDate() - 7);

const periodMap = {
    week: weekAgo
}

class AnalyticsController {
    async getUsersRecap(req,res,next){
        const {period} = req.query;
        const users = await User.findAll();
        const applications = await Application.findAll({
           where: {
               managerId:{[Op.in]:users.map(el=>el.id.toString())},
               updatedAt:{[Op.gte]:periodMap[period]}

           }
       });
        const processedUsers = [...users].map(el=>({...el.dataValues, applications: applications.filter(appl=>appl.id.toString() === el.id.toString())}));
        return res.json({users: processedUsers});
    }
}

module.exports = new AnalyticsController()