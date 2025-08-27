'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AbroadInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AbroadInfo.init({
    reason: DataTypes.TEXT,
    date: DataTypes.DATEONLY,
    destination: DataTypes.STRING,
    nameHospital: DataTypes.STRING,
    addressHospital: DataTypes.TEXT,
    phoneHospital: DataTypes.STRING,
    requiredServicesType: DataTypes.TEXT,
    requiredMedicines: DataTypes.TEXT,
    vehicle: DataTypes.STRING,
    apartment: DataTypes.TEXT,
    food: DataTypes.STRING,
    transportCosts: DataTypes.DECIMAL,
    peopleQty: DataTypes.INTEGER,
    daysQty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AbroadInfo',
  });
  return AbroadInfo;
};