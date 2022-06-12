'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MostProbDiagnosis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MostProbDiagnosis.init({
    mostprdiagnosis: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'MostProbDiagnosis',
  });
  return MostProbDiagnosis;
};