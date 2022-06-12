'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConsiliumDoctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ConsiliumDoctor.belongsTo(models.Application, {
        foreignKey: 'applicationId',
        onDelete: 'CASCADE'
      })
    }
  }
  ConsiliumDoctor.init({
    name: DataTypes.STRING,
    speciality: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ConsiliumDoctor',
  });
  return ConsiliumDoctor;
};