const userService = require('../service/user-service');
const { Application, ConsiliumDoctor, Diagnostic, CheckupPlan, Comment, User } = require('../models');
const ApiError = require('../exceptions/api-error');
const { Op } = require('sequelize');

class ApplicationController {
  async create(req, res, next) {
    try {
      const { managerId, creator } = req.body
      const manager = await User.findOne({ where: { id: managerId } })
      const applicationData = await Application.create({ ...req.body, managerSignUrlPath: manager.urlSignPath, managerId: manager.id });
      return res.json(applicationData);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const { page, limit } = req.query;
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
      const { id } = req.params;
      const applicationsData = await Application.findOne({
        where: { id }, include: [ConsiliumDoctor, Diagnostic, CheckupPlan, Comment], order: [
          [CheckupPlan, 'id', 'ASC'],
          [Comment, 'id', 'ASC']
        ]
      });
      const manager = await User.findOne({ where: { id: applicationsData.managerId } })
      await applicationsData.update({ managerSignUrlPath: manager ? manager.urlSignPath : null });
      return res.json(applicationsData);
    } catch (e) {
      next(e);
    }
  }
  async getByLetter(req, res, next) {
    try {
      const { fundName, fundRequest, manager, patientName, patientRequest, limit, page, creator } = req.query;
      const offset = page * limit - limit
      const applicationsData = await Application.findAndCountAll({
        where: {
          ...(creator === 'all' ? { manager: { [Op.like]: `%${manager}%` } } :{managerId:creator}),
          fundRequest: { [Op.like]: `%${fundRequest}%` },
          fundName: { [Op.like]: `%${fundName}%` },
          patientName: { [Op.like]: `%${patientName}%` },
          patientRequest: { [Op.like]: `%${patientRequest}%` },
        }, limit, offset,
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
      const { consiliumDoctors, id, diagnostic, mostProblDiagnosis, secondaryDiagnosis, checkupPlans, complaint, anamnesis, diagnosticData, patientName, patientBirthDate, comments, execDate } = req.body
      const applicationsData = await Application.findOne({ where: { id } });
      await applicationsData.update({ mostProblDiagnosis, secondaryDiagnosis, complaint, anamnesis, diagnosticData, patientName, patientBirthDate, execDate })
      await ConsiliumDoctor.destroy({ where: { applicationId: id } });
      consiliumDoctors.forEach(async (cDoctor) => {
        const result = await ConsiliumDoctor.create({ ...cDoctor })
        await result.setApplication(applicationsData)
      })
      await Diagnostic.destroy({ where: { applicationId: id } });
      for (const cDoctor of diagnostic) {
        const result = await Diagnostic.create({ ...cDoctor });
        await result.setApplication(applicationsData);
      }
      await CheckupPlan.destroy({ where: { applicationId: id } });
      for (const cDoctor of checkupPlans) {
        const result = await CheckupPlan.create({ ...cDoctor });
        await result.setApplication(applicationsData);
      }
      await Comment.destroy({ where: { applicationId: id } });
      for (const comment of comments) {
        const result = await Comment.create({ ...comment });
        await result.setApplication(applicationsData);
      }
      return res.json(applicationsData);
    } catch (e) {
      next(e);
    }
  }
  async updateManager(req, res, next) {
    try {
      const { id, managerId } = req.body
      const applicationsData = await Application.findOne({ where: { id } });
      const newManager = await User.findOne({ where: { id: managerId } })
      await applicationsData.update({ managerId, manager:newManager.name })
      return res.json(applicationsData);
    } catch (e) {
      next(e);
    }
  }
  async changeCheckupPlaceDeleteOption(req, res, next) {
    try {
      const { id } = req.body
      const applicationsData = await Application.findOne({ where: { id } });
      await applicationsData.update({ checkUpPlaceIsDeleted: !applicationsData.checkUpPlaceIsDeleted })
      return res.json({ checkUpPlaceIsDeleted: applicationsData.checkUpPlaceIsDeleted });
    } catch (e) {
      next(e);
    }
  }
  async deleteApplication(req, res, next) {
    try {
      const { id } = req.params;
      await Application.destroy({ where: { id } })
      return res.json({ deleted: 'ok' });
    } catch (e) {
      next(e);
    }
  }
}


module.exports = new ApplicationController();
