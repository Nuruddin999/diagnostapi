'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Diagnostic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Diagnostic.belongsTo(models.Application, {
        foreignKey: 'applicationId',
        onDelete: 'CASCADE'
      })
    }
  }
  Diagnostic.init({
    diagnosis: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Diagnostic',
  });
  return Diagnostic;
};