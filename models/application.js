'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Application.hasMany(models.ConsiliumDoctor, {
        foreignKey: 'applicationId',
        onDelete: 'cascade'
      })
      Application.hasMany(models.Diagnostic, {
        foreignKey: 'applicationId',
        onDelete: 'cascade'
      })
      Application.hasMany(models.CheckupPlan, {
        foreignKey: 'applicationId',
        onDelete: 'cascade'
      })
      Application.hasMany(models.Comment, {
        foreignKey: 'applicationId',
        onDelete: 'cascade'
      })
    }
  }
  Application.init({
    creator:DataTypes.STRING,
    patientRequest: DataTypes.STRING,
    fundName: DataTypes.STRING,
    fundRequest: DataTypes.STRING,
    manager: DataTypes.STRING,
    managerId: DataTypes.STRING,
    managerSpeciality: DataTypes.STRING,
    managerSignUrlPath: DataTypes.STRING,
    creationDate: DataTypes.STRING,
    mostProblDiagnosis: DataTypes.TEXT,
    secondaryDiagnosis: DataTypes.TEXT,
    complaint: DataTypes.TEXT,
    anamnesis: DataTypes.TEXT,
    diagnosticData: DataTypes.TEXT,
    patientName: DataTypes.STRING,
    patientBirthDate: DataTypes.STRING,
    checkUpPlaceIsDeleted: DataTypes.BOOLEAN,
    execDate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};